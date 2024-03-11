// 一時的な型です。後で消します。 by hirokiwa =============================
type monthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 12 | 12;
type mockTerm = {
  start: {
    year: number;
    month: monthNumber;
  };
  end: {
    year: number;
    month: monthNumber;
  };
}
type mockEvent = {
  id: string;
  term: mockTerm;
}
// =================================================================
