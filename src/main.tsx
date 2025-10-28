import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

async function enableMocking() {
  // 개발 환경에서만 MSW 활성화
  if (import.meta.env.MODE !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // 워커 시작
  return worker.start({
    onUnhandledRequest: "bypass", // MSW에 등록되지 않은 요청은 그대로 통과
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
