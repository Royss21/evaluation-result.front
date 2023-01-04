export interface IToken {
  token: string;
  refreshToken: string;
  expiredIn: string;
}

export interface IRefreshToken {
  token: string;
  refreshToken: string;
}
