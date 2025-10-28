/**
 * 유효성 검사 관련 유틸리티 함수들
 */

/**
 * 문자열이 비어있지 않은지 확인
 */
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * 이메일 형식이 유효한지 확인
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 할 일 제목이 유효한지 확인 (1-100자)
 */
export const isValidTodoTitle = (title: string): boolean => {
  return title.trim().length >= 1 && title.trim().length <= 100;
};

/**
 * 할 일 설명이 유효한지 확인 (0-500자)
 */
export const isValidTodoDescription = (description: string): boolean => {
  return description.length <= 500;
};
