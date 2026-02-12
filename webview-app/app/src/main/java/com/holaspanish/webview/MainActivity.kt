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
import android.os.Handler
import android.os.Looper

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
            override fun shouldInterceptRequest(
                view: WebView,
                request: WebResourceRequest
            ): WebResourceResponse? {
                val path = request.url.path ?: ""
                if (path.startsWith("/_next/") || path.startsWith("/static/")) {
                    return openAssetResponse(path.trim('/')) ?: super.shouldInterceptRequest(view, request)
                }
                val res = assetLoader.shouldInterceptRequest(request.url)
                if (res == null && request.isForMainFrame) {
                    return SpaAssetsPathHandler().fallbackIndex()
                }
                return res
            }

            override fun onPageFinished(view: WebView, url: String) {
                super.onPageFinished(view, url)

                view.evaluateJavascript(
                    """
                    (function() {
                      if (!document.getElementById('__hola_table_split_transpose')) {
                        var style = document.createElement('style');
                        style.id = '__hola_table_split_transpose';
                        style.innerHTML = `
                          .hola-split-wrap {
                            border: 1px solid #e2e8f0 !important;
                            border-radius: 16px !important;
                            box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08) !important;
                            overflow: hidden !important;
                            background: #ffffff !important;
                            margin: 12px 0 !important;
                          }

                          table.hola-split-table {
                            border-collapse: collapse !important;
                            border-spacing: 0 !important;
                            width: 100% !important;
                            min-width: 0 !important;
                            background: #ffffff !important;
                            border: 0 !important;
                          }

                          table.hola-split-flat {
                            margin: 8px 0 !important;
                            border: 1px solid #e2e8f0 !important;
                            border-radius: 0 !important;
                            box-shadow: none !important;
                          }
                          table.hola-split-table th,
                          table.hola-split-table td {
                            border: 1px solid #e2e8f0 !important;
                            padding: 16px 16px !important;
                            text-align: center !important;
                            vertical-align: middle !important;
                            white-space: normal !important;
                            word-break: break-word !important;
                            font-size: 16px !important;
                            line-height: 1.5 !important;
                          }
                          table.hola-split-table th {
                            background: #f8fafc !important;
                            font-weight: 700 !important;
                            color: #64748b !important;
                            white-space: nowrap !important;
                            padding-left: 16px !important;
                            padding-right: 16px !important;
                            width: 1% !important;
                            font-size: 14px !important;
                          }

                          .hola-split-label {
                            margin: 0 0 6px 0 !important;
                            font-size: 15px !important;
                            font-weight: 800 !important;
                            color: #94a3b8 !important;
                            letter-spacing: .12em !important;
                            padding-left: 8px !important;
                            border-left: 2px solid #e2e8f0 !important;
                          }
                        `;
                        document.head.appendChild(style);
                      }

                      function bumpRuleHeadings() {
                        var heads = document.querySelectorAll('h3');
                        heads.forEach(function(h) {
                          var t = (h.innerText || '').trim();
                          if (t === 'c 발음 규칙' || t === 'g 발음 규칙' || t.indexOf('gu / qu 규칙') !== -1) {
                            h.style.fontSize = '15px';
                          }
                        });
                      }

                      function splitAndTranspose() {
                        var tables = document.querySelectorAll('table.table-transpose');
                        tables.forEach(function(table) {
                          if (table.getAttribute('data-split-transposed') === '1') return;
                          var thead = table.querySelector('thead');
                          var headers = thead ? Array.from(thead.querySelectorAll('th')).map(function(th) {
                            return th.innerText.trim();
                          }) : [];
                          if (headers.length === 0) return;

                          var tbody = table.querySelector('tbody');
                          if (!tbody) return;
                          var rows = Array.from(tbody.querySelectorAll('tr'));
                          if (rows.length === 0) return;

                          var parent = table.parentNode;
                          if (!parent) return;

                          var inAccent = false;
                          var section = table.closest('section');
                          if (section) {
                            var h2 = section.querySelector('h2');
                            var title = h2 ? h2.innerText.trim() : '';
                            inAccent = title.indexOf('강세 규칙') !== -1;
                          }

                          rows.forEach(function(row, rowIdx) {
                            var cells = Array.from(row.querySelectorAll('td'));
                            if (cells.length === 0) return;

                            var block = document.createElement('div');

                            var newTable = document.createElement('table');
                            newTable.className = 'hola-split-table';
                            newTable.setAttribute('data-split-transposed', '1');

                            var newBody = document.createElement('tbody');
                            for (var i = 0; i < headers.length; i++) {
                              var tr = document.createElement('tr');

                              var th = document.createElement('th');
                              th.textContent = headers[i] || '';
                              tr.appendChild(th);

                              var td = document.createElement('td');
                              if (cells[i]) {
                                td.innerHTML = cells[i].innerHTML;
                              } else {
                                td.textContent = '';
                              }
                              tr.appendChild(td);

                              newBody.appendChild(tr);
                            }

                            newTable.appendChild(newBody);

                            if (inAccent) {
                              var label = document.createElement('div');
                              label.className = 'hola-split-label';
                              label.textContent = (rowIdx + 1) + '.';
                              block.appendChild(label);
                            }

                            var wrap = document.createElement('div');
                            wrap.className = 'hola-split-wrap';
                            wrap.appendChild(newTable);
                            block.appendChild(wrap);

                            parent.insertBefore(block, table);
                          });

                          table.setAttribute('data-split-transposed', '1');
                          table.style.display = 'none';
                        });
                      }

                      function splitAndTransposeChapter2() {
                        var sections = document.querySelectorAll('section');
                        sections.forEach(function(section) {
                          var h2 = section.querySelector('h2');
                          var title = h2 ? h2.innerText.trim() : '';
                          if (title.indexOf('문장의 기본 구조') === -1 && title.indexOf('어순과 강조') === -1) return;

                          var tables = section.querySelectorAll('table');
                          tables.forEach(function(table) {
                            if (table.getAttribute('data-split-transposed') === '1') return;
                            var thead = table.querySelector('thead');
                            var headers = thead ? Array.from(thead.querySelectorAll('th')).map(function(th) {
                              return th.innerText.trim();
                            }) : [];
                            if (headers.length === 0) return;

                            var tbody = table.querySelector('tbody');
                            if (!tbody) return;
                            var rows = Array.from(tbody.querySelectorAll('tr'));
                            if (rows.length === 0) return;

                            var parent = table.parentNode;
                            if (!parent) return;

                            rows.forEach(function(row, rowIdx) {
                              var cells = Array.from(row.querySelectorAll('td'));
                              if (cells.length === 0) return;

                              var block = document.createElement('div');

                              var newTable = document.createElement('table');
                              newTable.className = 'hola-split-table hola-split-flat';
                              newTable.setAttribute('data-split-transposed', '1');

                              var newBody = document.createElement('tbody');
                              for (var i = 0; i < headers.length; i++) {
                                var tr = document.createElement('tr');

                                var th = document.createElement('th');
                                th.textContent = headers[i] || '';
                                tr.appendChild(th);

                                var td = document.createElement('td');
                                if (cells[i]) {
                                  td.innerHTML = cells[i].innerHTML;
                                } else {
                                  td.textContent = '';
                                }
                                tr.appendChild(td);

                                newBody.appendChild(tr);
                              }

                              newTable.appendChild(newBody);

                              var wrap = document.createElement('div');
                              wrap.className = 'hola-split-wrap';
                              wrap.appendChild(newTable);
                              block.appendChild(wrap);

                              parent.insertBefore(block, table);
                            });

                            table.setAttribute('data-split-transposed', '1');
                            table.style.display = 'none';
                          });
                        });
                      }

                      function stripChapter2OuterCards() {
                        var sections = document.querySelectorAll('section');
                        sections.forEach(function(section) {
                          var h2 = section.querySelector('h2');
                          var title = h2 ? h2.innerText.trim() : '';
                          if (title.indexOf('문장의 기본 구조') === -1 && title.indexOf('어순과 강조') === -1) return;

                          var tables = section.querySelectorAll('table.hola-split-flat');
                          tables.forEach(function(table) {
                            var card = table.closest('div');
                            while (card && card !== section && card.nodeType === 1) {
                              var cls = card.className || '';
                              if (cls.indexOf('rounded') !== -1 || cls.indexOf('shadow') !== -1 || cls.indexOf('border') !== -1) {
                                card.style.background = 'transparent';
                                card.style.border = 'none';
                                card.style.boxShadow = 'none';
                                card.style.borderRadius = '0';
                                card.style.padding = '0';
                                card.style.margin = '0';
                                break;
                              }
                              card = card.parentElement;
                            }
                          });
                        });
                      }

                      function normalizeChapter2Splits() {
                        var sections = document.querySelectorAll('section');
                        sections.forEach(function(section) {
                          var h2 = section.querySelector('h2');
                          var title = h2 ? h2.innerText.trim() : '';
                          if (title.indexOf('문장의 기본 구조') === -1 && title.indexOf('어순과 강조') === -1) return;

                          var tables = section.querySelectorAll('table.hola-split-flat');
                          tables.forEach(function(table) {
                            var parent = table.parentElement;
                            if (parent && parent.classList && parent.classList.contains('hola-split-wrap')) return;

                            var wrap = document.createElement('div');
                            wrap.className = 'hola-split-wrap';
                            table.parentNode.insertBefore(wrap, table);
                            wrap.appendChild(table);
                          });
                        });
                      }

                      function applyNoticeFix() {
                        var titleEl = Array.from(document.querySelectorAll('*'))
                          .find(function(el) {
                            return (el.textContent || '').trim().includes('문장 부호 주의사항');
                          });
                        if (!titleEl) return;

                        var card = titleEl.closest('div');
                        if (!card) return;

                        var icon = card.querySelector('svg');

                        card.style.display = 'block';

                        var header = document.createElement('div');
                        header.style.display = 'flex';
                        header.style.alignItems = 'center';
                        header.style.gap = '8px';
                        header.style.marginBottom = '8px';
                        if (icon) header.appendChild(icon);
                        header.appendChild(titleEl);

                        var body = document.createElement('div');

                        var children = Array.from(card.childNodes);
                        children.forEach(function(node) {
                          if (node === titleEl || node === icon || node === header) return;
                          if (node.nodeType === 1 && node.contains(titleEl)) return;
                          body.appendChild(node);
                        });

                        while (card.firstChild) card.removeChild(card.firstChild);
                        card.appendChild(header);
                        card.appendChild(body);

                        body.querySelectorAll('*').forEach(function(el) {
                          el.style.marginLeft = '0';
                          el.style.paddingLeft = '0';
                        });
                      }

                      function tweakNoticeAndQuiz() {
                        applyNoticeFix();

                        // Practice quiz: pin Q badge to top-left, don't push text
                        var practiceSection = Array.from(document.querySelectorAll('section'))
                          .find(function(sec) {
                            var h2 = sec.querySelector('h2');
                            return h2 && (h2.innerText || '').indexOf('기초 다지기') !== -1;
                          });
                        if (practiceSection) {
                          var cards = practiceSection.querySelectorAll('div');
                          cards.forEach(function(card) {
                            var badge = Array.from(card.querySelectorAll('span'))
                              .find(function(s) {
                                var t = (s.innerText || '').trim();
                                return /^Q\\d+/.test(t);
                              });
                            if (badge) {
                              var parent = badge.parentElement;
                              if (parent) {
                                parent.style.position = 'relative';
                              }
                              badge.style.position = 'absolute';
                              badge.style.top = '12px';
                              badge.style.left = '12px';
                              badge.style.margin = '0';
                            }
                          });
                        }
                      }

                      function debugChapter2Dom() {
                        // Log key DOM blocks once for inspection.
                        if (window.__hola_debug_logged) return;
                        var targets = [];
                        var notice = Array.from(document.querySelectorAll('*'))
                          .find(function(el) {
                            return (el.innerText || '').trim().indexOf('문장 부호 주의사항') !== -1;
                          });
                        if (notice) targets.push(notice.closest('div'));

                        var sec = Array.from(document.querySelectorAll('section'))
                          .find(function(sec) {
                            var h2 = sec.querySelector('h2');
                            return h2 && (h2.innerText || '').indexOf('어순과 강조') !== -1;
                          });
                        if (sec) {
                          var tbl = sec.querySelector('table');
                          if (tbl) targets.push(tbl);
                        }

                        targets.forEach(function(t, i) {
                          if (!t) return;
                          console.log('HOLA_DEBUG[' + i + '] ' + t.outerHTML);
                        });
                        window.__hola_debug_logged = true;
                      }

                      setInterval(function() {
                        bumpRuleHeadings();
                        splitAndTranspose();
                        splitAndTransposeChapter2();
                        normalizeChapter2Splits();
                        stripChapter2OuterCards();
                        tweakNoticeAndQuiz();
                        debugChapter2Dom();
                      }, 1000);

                      var obs = new MutationObserver(function() {
                        splitAndTranspose();
                        splitAndTransposeChapter2();
                        normalizeChapter2Splits();
                        stripChapter2OuterCards();
                        applyNoticeFix();
                      });
                      if (document.body) {
                        obs.observe(document.body, {childList: true, subtree: true});
                      }
                    })();
                    """.trimIndent(),
                    null
                )

                // Debug: capture DOM snippets for Chapter 2 layout issues
                view.evaluateJavascript(
                    """
                    (function() {
                      try {
                        var notice = Array.from(document.querySelectorAll('*'))
                          .find(el => (el.innerText || '').trim().includes('문장 부호 주의사항'));
                        var noticeHtml = notice ? notice.closest('div').outerHTML : '';

                        var sec = Array.from(document.querySelectorAll('section'))
                          .find(sec => {
                            var h2 = sec.querySelector('h2');
                            return h2 && (h2.innerText || '').includes('어순과 강조');
                          });
                        var tbl = sec ? sec.querySelector('table') : null;
                        var tableHtml = tbl ? tbl.outerHTML : '';

                        var payload = {
                          notice: noticeHtml.slice(0, 4000),
                          table: tableHtml.slice(0, 4000)
                        };
                        return JSON.stringify(payload);
                      } catch (e) {
                        return JSON.stringify({error: String(e)});
                      }
                    })();
                    """.trimIndent()
                ) { result ->
                    Log.w("HOLA_DEBUG", "DOM: $result")
                }

                // Try again after content hydration
                val handler = Handler(Looper.getMainLooper())
                var attempts = 0
                val debugEval = object : Runnable {
                    override fun run() {
                        view.evaluateJavascript(
                            """
                            (function() {
                              try {
                                var bodyText = (document.body && document.body.innerText) ? document.body.innerText : '';
                                var notice = Array.from(document.querySelectorAll('*'))
                                  .find(el => (el.innerText || '').trim().includes('문장 부호 주의사항'));
                                var noticeBox = notice ? notice.closest('div') : null;
                                var noticeHtml = noticeBox ? noticeBox.outerHTML : '';

                                var sec = Array.from(document.querySelectorAll('section'))
                                  .find(sec => {
                                    var h2 = sec.querySelector('h2');
                                    return h2 && (h2.innerText || '').includes('어순과 강조');
                                  });
                                var tbl = sec ? sec.querySelector('table') : null;
                                var tableHtml = tbl ? tbl.outerHTML : '';

                                var payload = {
                                  url: location.href,
                                  title: document.title,
                                  hasNotice: !!notice,
                                  hasSection: !!sec,
                                  hasTable: !!tbl,
                                  bodyHasChapter2: bodyText.includes('문장의 기본 구조') || bodyText.includes('어순과 강조'),
                                  notice: noticeHtml.slice(0, 4000),
                                  table: tableHtml.slice(0, 4000)
                                };
                                return JSON.stringify(payload);
                              } catch (e) {
                                return JSON.stringify({error: String(e)});
                              }
                            })();
                            """.trimIndent()
                        ) { result ->
                            Log.w("HOLA_DEBUG", "DOM(loop): $result")
                        }
                        attempts += 1
                        if (attempts < 8) {
                            handler.postDelayed(this, 1000)
                        }
                    }
                }
                handler.postDelayed(debugEval, 1000)
            }
        }
        webView.loadUrl("https://appassets.androidplatform.net/index.html")
    }

    private inner class NextAssetsPathHandler : WebViewAssetLoader.PathHandler {
        override fun handle(path: String): WebResourceResponse? {
            return openAssetResponse("_next/${path.trim('/')}")
        }
    }
    private inner class SpaAssetsPathHandler : WebViewAssetLoader.PathHandler {
        override fun handle(path: String): WebResourceResponse? {
            val clean = path.trim('/')
            if (clean.isBlank()) return fallbackIndex()
            if (clean.startsWith("static/")) return openAssetResponse("_next/$clean")
            return openAssetResponse(clean) ?: openAssetResponse("$clean.html") ?: openAssetResponse("$clean/index.html") ?: fallbackIndex()
        }
        fun fallbackIndex() = openAssetResponse("index.html", "text/html")
    }
    private fun openAssetResponse(path: String, mime: String? = null): WebResourceResponse? {
        val normalized = path.trimStart('/')
        val stream = openAssetStream(normalized)
        if (stream == null) {
            Log.w("WebViewAssets", "Missing asset: $normalized")
            return null
        }
        val type = mime ?: guessMimeType(normalized)
        val encoding = if (type.startsWith("text/") || type == "application/javascript" || type == "application/json") "utf-8" else null
        return WebResourceResponse(type, encoding, stream)
    }

    private fun openAssetStream(path: String) = try {
        assets.open(path)
    } catch (_: Exception) {
        // Some builds copy /_next/static/* into /static/* only.
        if (path.startsWith("_next/static/")) {
            val fallback = "static/" + path.removePrefix("_next/static/")
            try {
                assets.open(fallback)
            } catch (_: Exception) {
                null
            }
        } else {
            null
        }
    }

    private fun guessMimeType(path: String): String {
        val ext = path.substringAfterLast('.', "").lowercase()
        return when (ext) {
            "html", "htm" -> "text/html"
            "css" -> "text/css"
            "js" -> "application/javascript"
            "json" -> "application/json"
            "svg" -> "image/svg+xml"
            "png" -> "image/png"
            "jpg", "jpeg" -> "image/jpeg"
            "webp" -> "image/webp"
            "gif" -> "image/gif"
            "ico" -> "image/x-icon"
            "woff" -> "font/woff"
            "woff2" -> "font/woff2"
            "ttf" -> "font/ttf"
            "otf" -> "font/otf"
            "map" -> "application/json"
            else -> URLConnection.guessContentTypeFromName(path) ?: "application/octet-stream"
        }
    }
}
