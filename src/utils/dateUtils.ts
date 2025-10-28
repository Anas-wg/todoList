/**
 * 날짜 관련 유틸리티 함수들
 */

/**
 * 날짜를 YYYY-MM-DD 형식으로 포맷팅
 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

/**
 * 날짜를 한국어 형식으로 포맷팅 (예: 2024년 1월 15일)
 */
export const formatDateKorean = (date: Date | string): string => {
  const d = new Date(date);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

/**
 * 날짜가 오늘인지 확인
 */
export const isToday = (date: Date | string): boolean => {
  const today = new Date();
  const targetDate = new Date(date);
  return today.toDateString() === targetDate.toDateString();
};

/**
 * 날짜가 과거인지 확인
 */
export const isPast = (date: Date | string): boolean => {
  const today = new Date();
  const targetDate = new Date(date);
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  return targetDate < today;
};

/**
 * 날짜가 미래인지 확인
 */
export const isFuture = (date: Date | string): boolean => {
  const today = new Date();
  const targetDate = new Date(date);
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  return targetDate > today;
};
