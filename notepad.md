## 2024-11-18

### React Native App's Structure

- App
  - React Native
    - JavaScript Interpreter
    - React Native JS Modules
      - JavaScript
      - Markup/Styling
  - React Native: native modules
  - Platform APIs

-> JavaScript Code + Communication Infrastructure
-> Compile: Java(Android), xCode(iOS)-> apk, ipa

- 위 모든 구조가 하나의 App

### Expo

- 모든 structure가 있는 Expo 앱을 통해 개발을 진행(Not Complie)
- 코드를 작성 후, 앱으로 전송하여 스마트폰에서 서비스 실행
  `npm install --global expo-cli`

- Mac 사용자(본인)는 Watchman 설치 필요
  `brew update`
  `brew install watchman`

- 이후 Android Play Store/iOS App Store로 가서 Expo Go 앱 설치

### How Does React Native Work

- JavaScript Code -> React Native -> (bridge) -> Native Code(Android/iOS)
- 왜 시뮬레이터와 모든 소프트웨어를 설치해야 하는가?

  - React를 통헤 웹 사이트를 만들 때는 Browser DOM을 통해 바로 실행할 수 있지만, Native는 웹 브라우저가 없다.
  - React Native는 번역기: JavaScript -> Java Android 코드 / Objective-C/Swift 코드
    - 따라서, 개발자는 그저 JavaScript 코드만 작성하면 된다.

- 과정

  1. [Native] Event
  2. [Native] Collect data and notify
  3. [Bridge] Serialized payload
  4. [JavaScript] Process event
  5. [JavaScript] Call native methods or update UI
  6. [Bridge] Serialized batched response
  7. [Native] Process commands
  8. [Native] Update UI

  - 이 강좌에서 우리는 [JavaScript] 레벨에서의 코드만 작성할 것이다.
  - JavaScript는 개발자들이 메시지를 주고 받기 위해 쓰는 레이어일 뿐

### Creating The App

1. `expo init [App Name]`
2. Enter(Blank Template)

- 흔한 node.js 프로젝트, create react app 프로젝트처럼 생성됨
- 아, 묵호씨는 이미 11개월 전 `Underworld LINE+ Mobile` 프로젝트를 수행해서 mac 환경에 Android와 iOS 시뮬레이터가 다 설치되어 있답니다~

  - `npm start` -> `a` / `i` / QR 코드 인식 후 자동 실행

- 강의 스타일의 실행 방법
  1. `expo login`
  2. `npm run start`
