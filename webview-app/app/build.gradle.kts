plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.holaspanish.webview"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.holaspanish.webview"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }

    kotlinOptions {
        jvmTarget = "1.8"
    }
}

val webOutDir = File(rootProject.projectDir, "../out")
val webAssetsDir = File(projectDir, "src/main/assets")

val buildWeb by tasks.registering(Exec::class) {
    workingDir = rootProject.projectDir.parentFile
    commandLine("/usr/bin/env", "npm", "run", "build")
    environment("PATH", System.getenv("PATH") ?: "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin")
}

val syncWebAssets by tasks.registering(Copy::class) {
    dependsOn(buildWeb)
    from(webOutDir)
    into(webAssetsDir)
    doFirst {
        if (webAssetsDir.exists()) {
            webAssetsDir.deleteRecursively()
        }
        webAssetsDir.mkdirs()
    }
    doLast {
        val nextStatic = File(webAssetsDir, "_next/static")
        val staticDir = File(webAssetsDir, "static")
        if (nextStatic.exists()) {
            nextStatic.copyRecursively(staticDir, overwrite = true)
        }
        
        // Apply specific table styles (Red Borders)
        exec {
            workingDir = rootProject.projectDir
            val pythonCmd = if (System.getProperty("os.name").lowercase().contains("windows")) "python" else "python3"
            commandLine(pythonCmd, "style_tables.py")
        }
    }
}

tasks.named("preBuild") {
    dependsOn(syncWebAssets)
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.material)
    implementation(libs.androidx.webkit)
}
