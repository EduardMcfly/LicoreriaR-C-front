const min = 0;
export const getValidAmount = (amount: number) =>
  amount < min ? min : amount;
