const min = 1;
export const getValidAmount = (amount: number) =>
  amount < min ? min : amount;
