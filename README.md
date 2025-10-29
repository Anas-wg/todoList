# TodoList 📝

React + TypeScript + Vite 기반의 할일 관리 애플리케이션입니다.

## 목차

- [실행 가이드](#실행-가이드)
- [주소](#주소)
- [기술 스택](#기술-스택)
- [주요 기능](#주요-기능)
- [폴더 구조](#폴더-구조)
- [폴더 설명](#폴더-설명)
- [컴포넌트 구조](#컴포넌트-구조)
- [개발 환경](#개발-환경)

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

## 주요 기능

- ✅ 할일 추가, 수정, 삭제
- 📅 날짜별 할일 관리
- 🎯 우선순위 설정 (높음, 보통, 낮음)
- 🔍 오늘/전체 보기 모드
- 📊 정렬 기능 (날짜, 우선순위, 생성순)
- 🎨 반응형 디자인

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
