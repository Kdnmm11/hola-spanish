# Hola Spanish WebView App

웹페이지를 그대로 앱에서 보여주는 WebView 전용 앱입니다.

## 구조
- `app/src/main/assets` : Next.js 정적 빌드(`out/`) 복사본
- `MainActivity` : WebView로 `index.html` 로드

## 웹 빌드 반영 방법
```bash
# 1) 웹 정적 빌드가 out/에 있다고 가정
# 2) assets로 복사
rm -rf app/src/main/assets/*
cp -R ../out/* app/src/main/assets/
```

## 실행
```bash
./gradlew :app:assembleDebug
```

## 주의
- WebView는 로컬 assets 로드만 사용하므로 **오프라인** 동작합니다.
- 웹 쪽 라우팅은 Next.js export 결과 기준으로 동작합니다.
