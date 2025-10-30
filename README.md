# TodoList 📝

React + TypeScript + Vite 기반의 할일 관리 애플리케이션입니다.

## 목차

- [실행 가이드](#실행-가이드)
- [주소](#주소)
- [기술 스택](#기술-스택)
- [폴더 구조](#폴더-구조)
- [폴더 설명](#폴더-설명)
- [컴포넌트 구조](#컴포넌트-구조)
- [개발 환경](#개발-환경)
- [주요 기능](#주요-기능)
  - [TODO 등록](#todo-등록)
  - [TODO 목록조회](#todo-목록조회)
  - [TOOD 삭제](#todo-삭제)
  - [마감 기한 설정](#마감기한-설정)
  - [우선 순위 수정](#우선-순위-수정)
  - [완료 처리](#완료-처리)
- [컴포넌트 구조도 및 상태 관리 흐름도](#컴포넌트-구조도-및-상태-관리-흐름도)

## 실행 가이드

### 개발 서버 실행

```bash
npm install
npm run dev
```

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## 주소

- 개발 서버: `http://localhost:5173`
- 프리뷰 서버: `http://localhost:4173`

## 기술 스택

- **React** 19.0.0
- **TypeScript** 5.7.2
- **Vite** 6.2.0
- **Zustand** 5.0.8 (상태 관리)
- **Tailwind CSS** 4.1.16 (스타일링)

## 폴더 구조

```
src/
├── components/
│   ├── common/          # 공통 컴포넌트
│   │   ├── icons/       # 아이콘 컴포넌트
│   │   ├── input/       # 입력 컴포넌트
│   │   └── ...
│   ├── layout/          # 레이아웃 컴포넌트
│   ├── modal/           # 모달 컴포넌트
│   └── todo/            # 투두 관련 컴포넌트
├── hooks/               # 커스텀 훅
├── store/               # Zustand 스토어
├── types/               # TypeScript 타입 정의
└── utils/               # 유틸리티 함수
```

## 폴더 설명

| 폴더명                | 설명                                              |
| --------------------- | ------------------------------------------------- |
| **components/common** | 재사용 가능한 공통 컴포넌트 (버튼, 입력, 뱃지 등) |
| **components/layout** | 레이아웃 관련 컴포넌트 (헤더, 네비게이터, 탭 등)  |
| **components/modal**  | 모달 컴포넌트 (할일 추가, 확인 모달)              |
| **components/todo**   | 할일 관련 컴포넌트 (목록, 아이템, 폼 등)          |
| **hooks**             | 커스텀 훅 (날짜 파싱, 정렬 등)                    |
| **store**             | Zustand를 이용한 전역 상태 관리                   |
| **types**             | TypeScript 타입 및 인터페이스 정의                |
| **utils**             | 상수 및 유틸리티 함수                             |

## 컴포넌트 구조

### Layout

- `AppHeader`: 애플리케이션 헤더
- `DayNavigator`: 날짜 선택 네비게이터
- `DayHeader`: 날짜 헤더 표시
- `ViewTabs`: 보기 모드 탭 (오늘/전체)

### Todo

- `TodoList`: 할일 목록 컨테이너
- `TodoItem`: 개별 할일 아이템
- `DisplayTodoItem`: 읽기 모드 할일 표시
- `EditTodoItem`: 수정 모드 할일 표시
- `AddTodoForm`: 할일 추가 폼

### Common

- `BaseButton`: 기본 버튼 컴포넌트
- `Calendar`: 달력 컴포넌트
- `PriorityBadge`: 우선순위 뱃지
- `PrioritySelector`: 우선순위 선택기
- `SortBar`: 정렬 바

## 개발 환경

- Node.js 18+ 권장
- npm 또는 yarn

## 주요 기능

### TODO 등록

![Image](https://github.com/user-attachments/assets/3a6bee38-61dd-4b9c-82b9-2de5c1aabc88)

<div style="display: flex; gap: 8px;">
  <img alt="TODO 등록 1" src="https://github.com/user-attachments/assets/ec212cc2-95f4-461c-92d3-73dd3c1723af" style="width: 33%; height: auto;" />
  <img alt="TODO 등록 2" src="https://github.com/user-attachments/assets/c40f9bed-d008-41cb-b027-41a4e08d73da" style="width: 33%; height: auto;" />
  <img alt="TODO 등록 3" src="https://github.com/user-attachments/assets/cfefd415-d1dc-403b-b3cd-d53f6ce733bc" style="width: 33%; height: auto;" />
</div>

### TODO 목록조회

<div style="display: flex; gap: 8px;">
  <img alt="TODO 목록 조회 움짤" src="https://github.com/user-attachments/assets/2d368c1f-57aa-42cb-b56c-14242c6b94e9" style="width: 50%; height: auto;" />
  <img alt="TODO 목록 조회 이미지" src="https://github.com/user-attachments/assets/27d96ef5-4612-4286-bd1e-3075f9ca1873" style="width: 50%; height: auto;" />
</div>

### TODO 수정

<div style="display: flex; gap: 8px;">
  <img alt="TODO 수정 움짤" src="https://github.com/user-attachments/assets/f6282faf-6b07-44b3-82ee-01fdcabf7170" style="width: 50%; height: auto;" />
  <img alt="TODO 수정 이미지" src="https://github.com/user-attachments/assets/b1c4f705-878f-4ed4-9d68-c1820102c55b" style="width: 50%; height: auto;" />
</div>

### TODO 삭제

![Image](https://github.com/user-attachments/assets/337ba783-dc50-4443-818b-565d794d9df6)

### 마감기한 설정

![Image](https://github.com/user-attachments/assets/a94500d2-d9bb-4f6c-aba0-d549dc20e9a5)

### 우선 순위 수정

![Image](https://github.com/user-attachments/assets/b6da0468-96b5-41e1-9b42-59e5a8676df4)

### 완료 처리

![Image](https://github.com/user-attachments/assets/ce9e84a7-e25c-450d-b918-a7ef4f382a5e)

## 컴포넌트 구조도 및 상태 관리 흐름도

- 컴포넌트 구조도

<img width="940" height="766" alt="Image" src="https://github.com/user-attachments/assets/2f61318b-4e7b-469b-aa18-c6123238f4e8" />

- 상태 관리 흐름도

<img width="940" height="418" alt="Image" src="https://github.com/user-attachments/assets/783b29ba-2500-4529-8658-0e98795c3d2f" />

## 과제 진행하면서 아쉬웠던 점

### 1. MSW 환경 구성 실패

MSW 를 활용하고자 하였으나,
Service Worker에 대한 개념이 부족한 상황이었음.

또한 요청 실패시 재요청 로직과, 사용자에게 피드백을 제공하는 로직 등
추가적인 기능 구현이 요구되어, 72시간 내 구현하기에는 무리라고 판단하고,

기존에 개발된 부분들을 더 점검하는 것이 좋다고 판단하였음.

AI도구를 통해 기능은 돌아가게끔 하였으나,
다른 브랜치에 커밋하고, 추후 개인적으로 학습할 때 참고할 예정.

### 2. subTask 기능 구현 실패

description 이외에 subTask를 두어 각 Item의 진행률을 계산한다면
사용자 입장에서 더 편리한 todoList 가 될 것이라고 생각하였으나,

타입 정의는 완료하였으나 실제 UI 구현과 상태 관리 로직을 완성하지 못함.
복잡한 중첩 구조의 상태 관리와 UI 렌더링 로직이 예상보다 까다로웠고,
시간 제약으로 인해 핵심 기능에 집중하기로 결정함.

추후 단계적으로 구현해볼 예정.
