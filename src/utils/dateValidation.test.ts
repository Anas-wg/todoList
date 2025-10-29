import { describe, it, expect } from "vitest";
import { isValidDate } from "./dateValidation";

describe("날짜 검증 로직", () => {
  describe("빈 문자열과 유효한 날짜를 허용한다", () => {
    it("마감일이 없는 경우 빈 문자열을 허용한다", () => {
      expect(isValidDate("")).toBe(true);
    });

    it("표준 날짜 형식(YYYY-MM-DD)을 허용한다", () => {
      expect(isValidDate("2025-10-29")).toBe(true);
      expect(isValidDate("2024-01-01")).toBe(true);
      expect(isValidDate("2024-12-31")).toBe(true);
    });

    it("윤년의 2월 29일을 허용한다", () => {
      expect(isValidDate("2024-02-29")).toBe(true);
    });
  });

  describe("잘못된 형식을 거부한다", () => {
    it("슬래시나 점 구분자를 거부한다", () => {
      expect(isValidDate("2025/10/29")).toBe(false);
      expect(isValidDate("2025.10.29")).toBe(false);
    });

    it("월-일-년 순서를 거부한다", () => {
      expect(isValidDate("10-29-2025")).toBe(false);
    });

    it("2자리 연도를 거부한다", () => {
      expect(isValidDate("25-10-29")).toBe(false);
    });

    it("불완전한 날짜를 거부한다", () => {
      expect(isValidDate("2025-10")).toBe(false);
      expect(isValidDate("2025")).toBe(false);
    });

    it("숫자가 아닌 문자를 거부한다", () => {
      expect(isValidDate("abc")).toBe(false);
      expect(isValidDate("20XX-10-29")).toBe(false);
    });
  });

  describe("존재하지 않는 날짜를 거부한다", () => {
    it("유효하지 않은 월(13월 이상, 0월)을 거부한다", () => {
      expect(isValidDate("2025-13-01")).toBe(false);
      expect(isValidDate("2025-00-15")).toBe(false);
    });

    it("유효하지 않은 일(32일 이상, 0일)을 거부한다", () => {
      expect(isValidDate("2025-01-32")).toBe(false);
      expect(isValidDate("2025-01-00")).toBe(false);
    });

    it("2월 30일을 거부한다", () => {
      expect(isValidDate("2025-02-30")).toBe(false);
    });

    it("평년의 2월 29일을 거부한다", () => {
      expect(isValidDate("2025-02-29")).toBe(false);
      expect(isValidDate("2023-02-29")).toBe(false);
    });

    it("30일까지만 있는 달의 31일을 거부한다", () => {
      expect(isValidDate("2025-04-31")).toBe(false);
      expect(isValidDate("2025-06-31")).toBe(false);
      expect(isValidDate("2025-09-31")).toBe(false);
      expect(isValidDate("2025-11-31")).toBe(false);
    });
  });
});
