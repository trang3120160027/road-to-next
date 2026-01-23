import { MyBig } from "@/lib/big";

export const toCents = (dollars: number) => {
  return MyBig(dollars).times(100).round(2).toNumber();
};

export const fromCents = (cents: number) => {
  return MyBig(cents).div(100).round(2).toNumber();
};

export const toCurrencyFromCents = (cents: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(fromCents(cents));
};
