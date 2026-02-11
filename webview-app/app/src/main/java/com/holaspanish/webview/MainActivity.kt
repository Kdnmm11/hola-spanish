package com.holaspanish.webview

import android.annotation.SuppressLint
import android.graphics.Color
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.WindowManager
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebViewClient
import android.webkit.WebChromeClient
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.appcompat.app.AppCompatActivity
import androidx.webkit.WebViewAssetLoader
import java.net.URLConnection

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        WindowCompat.setDecorFitsSystemWindows(window, false)
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
        val headerColor = Color.parseColor("#DCEFFF")
        window.statusBarColor = Color.TRANSPARENT
        WindowInsetsControllerCompat(window, window.decorView).isAppearanceLightStatusBars = true
        Log.d("StatusBar", "set statusBarColor=#${Integer.toHexString(headerColor)} actual=#${Integer.toHexString(window.statusBarColor)}")

        val root = findViewById<View>(R.id.root)
        val statusBarScrim = findViewById<View>(R.id.statusBarScrim)
        val web = findViewById<WebView>(R.id.webView)
        var baseTop = 0
        val extraTop = 0

        fun applyPadding(top: Int, extra: Int) {
            val appliedTop = top + extra
            statusBarScrim.layoutParams = statusBarScrim.layoutParams.apply {
                height = appliedTop
            }
            val lp = web.layoutParams as android.widget.FrameLayout.LayoutParams
            lp.topMargin = appliedTop
            lp.height = android.widget.FrameLayout.LayoutParams.MATCH_PARENT
            web.layoutParams = lp
        }
        statusBarScrim.setBackgroundColor(headerColor)
        ViewCompat.setOnApplyWindowInsetsListener(root) { _, insets ->
            val top = insets.getInsets(WindowInsetsCompat.Type.statusBars()).top
            baseTop = top
            applyPadding(baseTop, extraTop)
            insets
        }
        ViewCompat.requestApplyInsets(root)


        WebView.setWebContentsDebuggingEnabled(true)

        webView = findViewById(R.id.webView)

        val assetLoader = WebViewAssetLoader.Builder()
            .addPathHandler("/static/", SpaAssetsPathHandler())
            .addPathHandler("/next/", NextAssetsPathHandler())
            .addPathHandler("/_next/", NextAssetsPathHandler())
            .addPathHandler("/", SpaAssetsPathHandler())
            .build()

        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.allowFileAccess = true
        webView.settings.allowContentAccess = true
        webView.settings.cacheMode = WebSettings.LOAD_NO_CACHE
        webView.settings.useWideViewPort = true
        webView.settings.loadWithOverviewMode = true
        webView.settings.setSupportZoom(true)
        webView.settings.builtInZoomControls = true
        webView.settings.displayZoomControls = false
        webView.settings.textZoom = 100

        webView.webChromeClient = object : WebChromeClient() {
            override fun onConsoleMessage(message: android.webkit.ConsoleMessage): Boolean {
                Log.w("WebViewConsole", "${message.message()} @${message.sourceId()}:${message.lineNumber()}")
                return super.onConsoleMessage(message)
            }
        }

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(
                view: WebView,
                request: WebResourceRequest
            ): Boolean {
                Log.w("WebViewAsset", "NAV: ${request.url}")
                return false
            }

            override fun shouldInterceptRequest(
                view: WebView,
                request: WebResourceRequest
            ): WebResourceResponse? {
                if (request.isForMainFrame) {
                    Log.w("WebViewAsset", "MAIN: ${request.url}")
                }
                val path = request.url.path ?: ""
                if (path.startsWith("/static/")) {
                    val res1 = openAssetResponse("_next$path")
                    if (res1 != null) {
                        Log.w("WebViewAsset", "ASSET HIT: _next$path")
                        return res1
                    }
                    val res2 = openAssetResponse(path.removePrefix("/"))
                    if (res2 != null) {
                        Log.w("WebViewAsset", "ASSET HIT: ${path.removePrefix("/")}")
                        return res2
                    }
                    Log.w("WebViewAsset", "ASSET MISS: $path")
                }
                if (path.startsWith("/_next/static/")) {
                    val res = openAssetResponse(path.removePrefix("/_next/"))
                    if (res != null) {
                        Log.w("WebViewAsset", "ASSET HIT: ${path.removePrefix("/_next/")}")
                        return res
                    }
                    Log.w("WebViewAsset", "ASSET MISS: $path")
                }
                if (path.startsWith("/_next/") || path.startsWith("/next/")) {
                    val res = openAssetResponse(path.removePrefix("/"))
                    if (res != null) {
                        Log.w("WebViewAsset", "ASSET HIT: ${path.removePrefix("/")}")
                        return res
                    }
                    Log.w("WebViewAsset", "ASSET MISS: $path")
                }
                val res = assetLoader.shouldInterceptRequest(request.url)
                if (res == null) {
                    Log.w("WebViewAsset", "MISS: ${request.url}")
                    if (request.isForMainFrame) {
                        return SpaAssetsPathHandler().fallbackIndex()
                    }
                }
                return res
            }

            override fun onPageFinished(view: WebView, url: String) {
                super.onPageFinished(view, url)
            }
        }

        // Load the exported Next.js site from assets
        webView.loadUrl("https://appassets.androidplatform.net/index.html")

        webView.evaluateJavascript(
            """
            (function() {
              function postNav(type) {
                try {
                  console.log('[NAV]', type, location.href);
                } catch (e) {}
              }
              window.addEventListener('popstate', function(){ postNav('popstate'); });
              window.addEventListener('hashchange', function(){ postNav('hashchange'); });
              var push = history.pushState;
              var replace = history.replaceState;
              history.pushState = function() {
                push.apply(this, arguments);
                postNav('pushState');
              };
              history.replaceState = function() {
                replace.apply(this, arguments);
                postNav('replaceState');
              };
              document.addEventListener('click', function(e){
                var a = e.target && e.target.closest ? e.target.closest('a') : null;
                if (a && a.href) {
                  console.log('[CLICK]', a.href);
                }
              }, true);
              postNav('load');
            })();
            """.trimIndent(),
            null
        )
    }

    private inner class NextAssetsPathHandler : WebViewAssetLoader.PathHandler {
        override fun handle(path: String): WebResourceResponse? {
            val clean = path.trim('/')
            if (clean.isBlank()) {
                return null
            }
            // Serve only exact assets under _next; no SPA fallback for JS/CSS
            return openAssetResponse("_next/$clean")
        }
    }

    private inner class SpaAssetsPathHandler : WebViewAssetLoader.PathHandler {
        override fun handle(path: String): WebResourceResponse? {
            val clean = path.trim('/')
            if (clean.isBlank()) {
                return fallbackIndex()
            }
            if (clean.startsWith("static/")) {
                openAsset("_next/$clean")?.let { return it }
            }
            // Try exact asset, then directory index.html, then SPA fallback
            openAsset(clean)?.let { return it }
            openAsset("$clean.html")?.let { return it }
            openAsset("$clean/index.html")?.let { return it }
            return fallbackIndex()
        }

        fun fallbackIndex(): WebResourceResponse? {
            return openAsset("index.html", forceMime = "text/html")
        }

        private fun openAsset(assetPath: String, forceMime: String? = null): WebResourceResponse? {
            return try {
                val mime = forceMime ?: URLConnection.guessContentTypeFromName(assetPath) ?: "text/plain"
                WebResourceResponse(mime, "utf-8", assets.open(assetPath))
            } catch (e: Exception) {
                null
            }
        }
    }

    private fun openAssetResponse(assetPath: String, forceMime: String? = null): WebResourceResponse? {
        return try {
            val mime = forceMime ?: URLConnection.guessContentTypeFromName(assetPath) ?: "text/plain"
            WebResourceResponse(mime, "utf-8", assets.open(assetPath))
        } catch (e: Exception) {
            null
        }
    }
}
