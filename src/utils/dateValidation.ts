export const isValidDate = (dateString: string): boolean => {
  if (!dateString) return true;

  // YYYY-MM-DD 형식 검증
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;

  // 실제 유효한 날짜인지 검증
  const date = new Date(dateString);
  const timestamp = date.getTime();

  if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
    return false;
  }

  // Date 객체가 입력된 날짜와 일치하는지 확인
  // (예: 2025-13-01 같은 잘못된 날짜 걸러내기)
  return date.toISOString().startsWith(dateString);
};
