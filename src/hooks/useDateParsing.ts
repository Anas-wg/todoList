import { useMemo } from "react";

/**
 * 날짜 문자열을 파싱하는 커스텀 훅
 * YYYY-MM-DD 형식의 문자열을 Date 객체로 변환
 */
export const useDateParsing = (value: string): Date | null => {
  return useMemo(() => {
    if (!value) return null;

    // YYYY-MM-DD 형식 검증
    const matchExec = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!matchExec) return null;

    const year = Number(matchExec[1]);
    const monthNumber = Number(matchExec[2]);
    const dayNumber = Number(matchExec[3]);

    // 유효한 날짜인지 검증
    const dateCandidate = new Date(year, monthNumber - 1, dayNumber);
    return dateCandidate.getFullYear() === year &&
      dateCandidate.getMonth() === monthNumber - 1 &&
      dateCandidate.getDate() === dayNumber
      ? dateCandidate
      : null;
  }, [value]);
};
