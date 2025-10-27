/**
 * YYYY-MM-DD 형식의 날짜 문자열 -> Date 객체
 */
export const convertStringToDate = (dateString: string): Date => {
  return new Date(dateString);
};
