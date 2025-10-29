# AI 활용 보고서

## 1. 사용한 AI/도구

- **Cursor AI (Claude Sonnet 4.5)**: 주 개발 도구로 활용
- **Gemini CLI**: : 보조 개발 도구로 활용
- **Chat GPT** : 검증용 도구, 문서 작성시 활용

## 2. AI 생성 코드 반영 범위

### AI 코드 그대로 활용(100%)

- vitest 테스트 코드 작성

```
단 프롬프팅 시 테스트 코드 관련 자료에서 공통적으로 이야기하는 좋은 테스트 코드의 기준 전달

1. 빠르고 독립적인 테스트를 지향
2. 비즈니스 로직 중심으로 테스트
3. 테스트는 “무엇을 테스트하는지”, “어떤 결과를 기대하는지”가 명확하게 드러나게 작성
4. 내부 로직이 아닌 외부에 반환하는 결과값을 검증
5. UI 대한 과도한 검증 지양
```

### 대부분 AI 가 작성(90%)

- tailWindCSS 코드를 통한 UI 구성
- 접근성을 위한 aria-label, role 작성

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

### 완전 직접 구현 (0%)

- `App.tsx`: 전체 앱 구조 및 라우팅
- `types/todo.ts`: 타입 정의는 요구사항 기반으로 직접 설계

## 3. AI 코드 검증 사례

### 같은 TodoItem을 Mode에 따라 다른 key로 저장

- 수정 전
  - 같은 할 일이지만 key가 달라 오늘 탭 과 모든 할 일 탭에서 다른 컴포넌트로 처리

```js
<ul>
  {filteredTodos.map((todo) =>
    ( <TodoItem key={${viewMode}-${todo.id}} todo={todo} />
  ))}
</ul>
```

- 수정 후
  - key를 동일하게 만들어 불필요한 컴포넌트 언마운트 방지
  - 수정모드 진입 후 탭 변경해도 해당 TodoITem은 수정모드 작업 유지

```js
<ul>
  {filteredTodos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} />
  ))}
</ul>
```

### 흩어진 로직을 관련 파일로 집중

- 수정 전
  - 탭 변경시 정렬 기준을 변경하는 로직이 ViewTabs가 아닌 상위 컴포넌트인 App.tsx에 위치

```js
// App.tsx
const handleViewModeChange = (mode: "today" | "all") => {
  setViewMode(mode);
  if (mode === "today") {
    setSortBy("dueDate");
  } else {
    setSortBy("priority");
  }
};
```

- 수정 후
  - ViewTabs 컴포넌트에 탭 변경 관련 로직을 모아 관련 로직을 한 곳에 집중

```js
const handleViewModeChange = (mode: "today" | "all") => {
  onViewModeChange(mode);
  if (mode === "today") {
    onSortChange("dueDate");
  } else {
    onSortChange("priority");
  }
};
```

### Store 활용시 리렌더링 방지

- 수정 전
  - 스토어 전체를 구독하여 불필요한 리렌더링 발생 가능

```tsx
// App.tsx
const { todos, createTodo } = useTodoStore();

// TodoItem.tsx
const { deleteTodo } = useTodoStore();

// DisplayTodoItem.tsx
const { updateTodo } = useTodoStore();

// EditTodoItem.tsx
const { updateTodo } = useTodoStore();
```

- 수정 후
  - 스토어의 다른 필드가 변경되어도 해당 컴포넌트는 구독하지 않는 필드 변경으로 인한 리렌더링 방지
  - `useShallow`를 통해 여러 값을 동시에 선택할 때 얕은 비교로 불필요한 리렌더링 방지
  - 액션 함수들은 참조가 변경되지 않으므로 단일 셀렉터로 최적화

```tsx
import { useShallow } from "zustand/react/shallow";

const { todos, createTodo } = useTodoStore(
  useShallow((state) => ({
    todos: state.todos,
    createTodo: state.createTodo,
  }))
);

const deleteTodo = useTodoStore((state) => state.deleteTodo);

const updateTodo = useTodoStore((state) => state.updateTodo);

const updateTodo = useTodoStore((state) => state.updateTodo);
```
