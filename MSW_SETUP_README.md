# MSW 환경 구축 완료 🎉

## 📋 변경 사항 요약

### 1. **설치된 패키지**

- `msw`: Mock Service Worker 라이브러리

### 2. **추가된 파일들**

#### Mock 설정

- `/src/mocks/handlers.ts`: API 엔드포인트 핸들러
- `/src/mocks/browser.ts`: MSW 브라우저 워커 설정
- `/public/mockServiceWorker.js`: MSW 서비스 워커 (자동 생성)

#### API 클라이언트

- `/src/api/todoApi.ts`: 모든 API 호출 함수

### 3. **변경된 파일들**

#### 핵심 변경

- `src/main.tsx`: MSW 초기화 로직 추가
- `src/store/todoStore.ts`:
  - localStorage persist 제거
  - 비동기 API 호출로 변경
  - `isLoading`, `error`, `clearError` 상태 추가
  - `fetchTodos()` 메서드 추가

#### 컴포넌트 변경

- `src/App.tsx`:
  - 초기 데이터 로드 (`useEffect` + `fetchTodos`)
  - 로딩 스피너 UI 추가
  - 에러 메시지 UI 추가
- `src/components/todo/DisplayTodoItem.tsx`: 비동기 처리
- `src/components/todo/EditTodoItem.tsx`: 비동기 처리
- `src/components/todo/TodoItem.tsx`: 비동기 처리
- `src/components/modal/AddTodoModal.tsx`: 비동기 처리
- `src/components/todo/AddTodoForm.tsx`: 비동기 처리

## 🚀 작동 방식

### 현재 플로우

```
1. 앱 시작 → MSW 워커 활성화
2. App.tsx의 useEffect → fetchTodos() 호출
3. fetchTodos() → fetch('/api/todos')
4. MSW가 요청을 가로채서 Mock 데이터 반환
5. Zustand 스토어 업데이트 → UI 렌더링
```

### API 엔드포인트

- `GET /api/todos` - 모든 할 일 조회
- `GET /api/todos/:id` - 특정 할 일 조회
- `POST /api/todos` - 할 일 생성
- `PUT /api/todos/:id` - 할 일 수정 (실무에서 더 많이 사용)
- `DELETE /api/todos/:id` - 할 일 삭제

> **참고**: PUT vs PATCH vs POST
>
> - **PUT**: 전체/부분 업데이트 (실무에서 가장 많이 사용)
> - **PATCH**: 부분 업데이트만 (REST 표준)
> - **POST**: 생성용이 원칙이지만 업데이트에도 사용 가능

### Mock 데이터 저장소 (localStorage 영구 저장!)

- ✅ **MSW 핸들러가 localStorage에 자동 저장**
- ✅ **페이지 새로고침해도 데이터 유지됨**
- localStorage key: `msw-todo-storage`
- 실제 네트워크 요청처럼 300-400ms 지연 시뮬레이션

## 🔍 브라우저에서 확인하기

### DevTools Network 탭

1. 브라우저 DevTools 열기 (F12)
2. Network 탭 선택
3. 할 일 추가/수정/삭제 시 API 요청 확인 가능

### Console 확인

- `[MSW]` 로그로 어떤 요청이 intercept 되는지 확인 가능
- 예: `[MSW] GET /api/todos (200 OK)`

## 💡 다음 단계

### 실제 백엔드로 전환하려면?

1. `src/main.tsx`의 MSW 초기화 코드 제거 또는 조건부 처리
2. `src/api/todoApi.ts`의 `API_BASE_URL`을 실제 서버 주소로 변경
3. 끝! 나머지 코드는 그대로 사용 가능

### 테스트 추가

```typescript
// tests/setup.ts
import { setupServer } from "msw/node";
import { handlers } from "../src/mocks/handlers";

export const server = setupServer(...handlers);
```

## 🎯 장점

1. **실제 API 구조 시뮬레이션**: 나중에 백엔드 연동 시 코드 변경 최소화
2. **비동기 처리 학습**: loading, error 상태 관리 경험
3. **개발 효율**: 백엔드 없이도 풀스택 개발 가능
4. **테스트 용이**: MSW를 테스트에서도 재사용 가능

## 📝 주의사항

- ✅ **localStorage에 자동 저장되어 새로고침해도 데이터 유지됨**
- 네트워크 지연(300-400ms)으로 로딩 상태 체험 가능
- 에러 시뮬레이션을 위해 핸들러를 수정할 수 있음
- localStorage를 비우려면: `localStorage.removeItem('msw-todo-storage')`
