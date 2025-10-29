# AI 활용 보고서

## 1. 사용한 AI/도구

- **Cursor AI (Claude Sonnet 4.5)**: 주 개발 도구로 활용
- **GitHub Copilot**: 반복적인 코드 작성 보조

## 2. 주요 프롬프트 및 활용 방식

### 프롬프트 1: 프로젝트 초기 설계

```
React + TypeScript + Vite 환경에서 Todo List 애플리케이션을 만들고 싶어요.
- 우선순위, 마감일, 서브태스크 기능이 필요합니다
- Zustand로 상태관리, Tailwind CSS로 스타일링
- 컴포넌트는 atomic design 패턴을 참고하여 구조화
- 폴더 구조 제안해주세요
```

**활용 결과**:

- `components/common`, `components/layout`, `components/todo`로 구분된 폴더 구조 제안받음
- 초기 타입 정의(`types/todo.ts`) 구조 설계
- 이를 기반으로 직접 폴더 생성 및 파일 배치 수정

### 프롬프트 2: Zustand 스토어 구조 설계

```
Zustand로 Todo 상태관리를 구현하려고 합니다.
- Todo CRUD 기능
- localStorage persist 기능
- TypeScript 타입 안정성 확보
스토어 구조를 작성해주세요
```

**활용 결과**:

- `todoStore.ts`의 기본 구조 생성
- persist middleware 적용 방법 확인
- 생성된 코드의 타입 정의를 검토하고 `UpdateTodoData` 타입을 추가로 정의

### 프롬프트 3: 날짜 입력 컴포넌트 구현

```
사용자가 키보드로 날짜를 직접 입력할 수 있고, 유연한 포맷을 허용하는 DateInput 컴포넌트가 필요합니다.
- "2025-01-01" 형태 지원
- 유효성 검사 및 에러 메시지 표시
- 달력 아이콘 클릭 시 Calendar 모달 오픈
구현 방법을 제안해주세요
```

**활용 결과**:

- `DateInput.tsx` 컴포넌트의 초안 생성
- 정규식 기반 날짜 파싱 로직 제안받음
- 실제로는 더 복잡한 엣지 케이스(2월 29일, 13월 등)를 직접 추가 검증

### 프롬프트 4: 커스텀 훅 리팩토링

```
TodoList 컴포넌트가 너무 복잡합니다.
- 날짜 파싱 로직을 useDateParsing 훅으로 분리
- 정렬 로직을 useSortedTodos 훅으로 분리
각 훅의 구조를 제안해주세요
```

**활용 결과**:

- `useDateParsing.ts`, `useSortedTodos.ts` 훅 구조 생성
- 의존성 배열 최적화 제안 받음
- useMemo 활용 방법 학습 후 직접 성능 최적화 적용

### 프롬프트 5: 공통 컴포넌트 재사용성 개선

```
BaseButton, InputField 등 공통 컴포넌트의 재사용성을 높이고 싶습니다.
- Props 인터페이스 설계
- variant, size 등 옵션 추가
- Tailwind CSS 동적 클래스 적용
코드 개선 방향을 제안해주세요
```

**활용 결과**:

- Props 타입 정의 개선
- `clsx` 라이브러리 대신 템플릿 리터럴로 동적 클래스 생성 방식 제안받음
- 제안받은 코드의 접근성(a11y) 속성을 직접 추가 보완

## 3. AI 생성 코드 반영 범위

### 전체 생성 후 수정 (70%)

- `store/todoStore.ts`: AI 생성 기본 구조 + 타입 보강
- `hooks/useDateParsing.ts`: AI 생성 로직 + 엣지 케이스 추가
- `hooks/useSortedTodos.ts`: AI 생성 정렬 로직 + 필터링 조건 수정
- `components/common/icons/*`: AI로 SVG 아이콘 생성 + viewBox 조정

### 부분 생성 후 대폭 수정 (50%)

- `components/common/input/DateInput.tsx`: AI 초안 + 유효성 검사 로직 전면 수정
- `components/todo/AddTodoForm.tsx`: AI 폼 구조 생성 + 실제 상태 관리 로직 직접 구현
- `components/modal/ConfirmationModal.tsx`: AI 기본 구조 + 접근성 개선

### 참고용으로만 활용 (30%)

- `components/common/Calendar.tsx`: 달력 로직은 AI 제안을 참고만 하고 직접 구현
- `components/todo/TodoItem.tsx`: 편집/표시 모드 전환 로직 직접 설계
- Tailwind CSS 테마 설정: AI 제안 컬러 팔레트 참고 후 독자적으로 선정

### 완전 직접 구현 (0%)

- `App.tsx`: 전체 앱 구조 및 라우팅
- `types/todo.ts`: 타입 정의는 요구사항 기반으로 직접 설계
- 모든 테스트 및 디버깅

## 4. 직접 수정·검증한 내용 요약

### 타입 안정성 강화

- AI가 생성한 코드에서 `any` 타입이나 타입 단언 제거
- Optional chaining (`?.`) 및 nullish coalescing (`??`) 적극 활용
- 모든 컴포넌트 Props에 명시적 타입 정의 추가

### 성능 최적화

- AI가 제안한 useMemo/useCallback 사용처를 검토하고 불필요한 곳 제거
- React DevTools Profiler로 리렌더링 측정 후 최적화
- Zustand selector 활용하여 불필요한 구독 방지

### 접근성 개선

- AI 생성 버튼/입력 컴포넌트에 `aria-label`, `aria-describedby` 추가
- 키보드 네비게이션 지원 (Tab, Enter, Escape)
- 모달 포커스 트랩 직접 구현

### 에러 처리

- AI 생성 코드의 낙관적인 경로만 존재하던 부분에 에러 핸들링 추가
- 날짜 파싱 실패 시 사용자 피드백 메시지 구현
- localStorage 접근 실패 시 fallback 로직 추가

### 코드 품질

- ESLint 규칙 준수 (AI 생성 코드에서 unused variable 제거)
- 일관된 네이밍 컨벤션 적용
- 주석 추가로 복잡한 로직 설명

### 엣지 케이스 처리

- 2월 29일, 윤년 검증 로직 추가
- 타임존 이슈 대응 (ISO 8601 포맷 통일)
- 빈 배열/null 값 처리 방어 코드 추가

## 5. 학습 및 이해도

### 깊이 있게 학습한 부분

- Zustand의 middleware 시스템 (persist, devtools)
- TypeScript의 Utility Types (`Partial`, `Omit`) 활용
- React의 상태 관리 패턴 및 최적화 기법
- Tailwind CSS의 동적 클래스 적용 방법

### 추가 학습 계획

- React Testing Library를 활용한 컴포넌트 테스트 작성
- Storybook 도입하여 컴포넌트 문서화
- 드래그 앤 드롭 기능 추가 (react-beautiful-dnd)
- PWA 기능 추가 (오프라인 지원)

## 6. 결론

AI를 단순 코드 생성 도구가 아닌 **페어 프로그래밍 파트너**로 활용했습니다.
AI가 제안한 구조와 코드를 비판적으로 검토하고, 프로젝트 요구사항에 맞게 수정하는 과정을 통해
더 나은 코드 품질과 개발 생산성을 동시에 달성할 수 있었습니다.

특히 반복적인 컴포넌트 구조 작성, 타입 정의, 보일러플레이트 코드에서 AI의 도움을 받아
시간을 절약하고, 절약된 시간을 비즈니스 로직 구현과 사용자 경험 개선에 집중할 수 있었습니다.
