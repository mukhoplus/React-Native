# [Mukho I/O] React Native

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

## 2024-11-19

### snack.expo.dev

브라우저에서 React Native 코드를 작성할 수 있는 온라인 코드 에디터

### The Rules of Native

1. React Native는 웹 사이트가 아니다.

- HTML이 아니므로 div를 쓸 수 없다.
- `View`: Container

2. React Native에 있는 모든 text는 `Text` component에 들어가야 한다.

3. Style

- style: React와 유사하지만, 일부 style property은 사용할 수 없다.
- `StyleSheet.create`: Object를 생성하는 데에 사용

### Reack Native Packages

- reactnative.dev: Documentation
  - Core Components는 굉장히 적으니까, 한 번 정독하도록.
    - 현재 남아있는 Core Components들은 필수적인 요소.
  - AsyncStorage: 브라우저의 Local Storage
    - 과거에는 직접 지원했지만, 현재는 Third Party Package

### Third Party Packages

- React Native를 경량화하기 위해 Core Components and APIs를 제외한 나머지는 다른 방식으로 제공

- Component: 화면에 렌더링할 항목
- API: JavaScript Code - OS와 통신
  - Vibration: 스마트폰 진동
  - 사용자들이 만든 수 많은 API들이 존재(커뮤니티에 의존해야 함)
    - https://reactnative.directory/?search=storage
- Expo SDK: Expo팀에서 만든 API/Component 집합체

## 2024-11-20

### Layout System

- `Flexbox`
  - 웹과 거의 같은 방식.
  - Container View가 이미 Flex Container이므로, 명시하지 않아도 된다.
  - 웹에서는 flex direction의 기본 값이 row지만, Native에서는 column이다.
  - Overflow가 있어도 스크롤 할 수 없다.
- 대부분의 경우에서, 너비와 높이에 기반해서 레이아웃을 만들지 않을 것이다 -> 반응형 디자인
  - 아이콘이나 아바타가 있다면 사용하겠지만, 레이아웃에서는 사용하지 않을 것이다.
  - 숫자를 통한 flex size
    - 자식 Flex의 비율은 윗 레벨 요소의 Flex에 대한 비율

### Styles / Weater App

- 위치: Location Expo Package
- 개발 시, View에 backgroundColor 속성을 주고 하면 편하다.

### Styles part Two

- 위에 적혀있지만, 웹과 달리 모바일에서는 오버플로우 된 요소들에 대해 자동 스크롤이 안된다.
- Native의 `ScrollView` 사용
  - 기존의 style이 아닌, Container Style 사용
  - pagingEnabled: 스크롤 시 자동 페이지네이션
  - showsHorizontalScrollIndicator: 화면 하단에 표시되는 스크롤바 없애기
- 1개의 day 요소만 보고 싶다.
  - 1개의 day가 화면 너비의 크기를 가져야 한다.
    - Native의 `Dimensions` 사용
      `Dimensions.get("window").width`
- Android / iOS 모두에 호환되지 않는 기능들이 있다.

### Location

`expo install expo-location`

- 유저 권한 요청: ``
- 유저의 현재 위치: ``

### Weather

- https://openweathermap.org/api

### Icons

- `expo install vector-icons`

## 2024-11-21

### Introduction

- React Native에서 버튼 클릭을 다루는 법
- Text Input에서 키보드 다루는 법
- 웹과의 Input 차이

### Touchables

- `TouchableOpacity`: 터치 시, 깜빡이는 애니메이션
- `TouchableHighlight`: 터치 시, 요소의 배경색을 바꾸도록 함
- `TouchableWithoutFeedback`: 화면의 가장 위에서 일어나는 탭 이벤트를 listen하지만, 어떤 그래픽이나 UI 반응을 보여주지 않음 -> 나꼬가 자주 씀
- `Presable`: TouchableWithoutFeedback와 비슷하지만, 더 많은 속성을 줄 수 있음(OnLongPress, delayLongPress, hitSlope 등)
- OnPress, OnPressIn, OnPressOut, ...

### TextInput

- React Native에는 textarea가 없고 오직 text input만 있다.
- `TextInput`: 아주 많은 props가 존재
- onChangeText, keyboardType, multiline

- state, component, props를 쓰는 아이디어는 VR을 만드는 데에 사용되었으며, 이는 React의 아이디어에서 가져온 것이다.

#### Props Drilling

- 자체적으로 컴포넌트를 나누어 구현하다 props drilling 발생
- 이를 해결하기 위해 상태 관리 라이브러리 도입 대신 Context API 사용
  - 소규모 어플리케이션이기도 하고, 구현이 우선인 프로젝트

### To Dos

- 객체를 합치는 방법에는 `Object.assign()`과 `Spread 연산자`가 있다.

## 2024-11-22

### Paint To Dos

- 우선 띄워.

### Persist

- `AsyncStorage`: 모바일 디바이스의 localStorage
  `expo install @react-native-async-storage/async-storage`

### Delete

- 이것도 일단 나눠.

### Publishing Out Apps
