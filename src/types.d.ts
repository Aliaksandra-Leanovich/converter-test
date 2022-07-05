/** All currencies model */
export interface ICurrency {
  [label: string]: string | undefined;
}

/** Back-end response model */
export interface Response {
  data: { rates: ICurrency };
}
