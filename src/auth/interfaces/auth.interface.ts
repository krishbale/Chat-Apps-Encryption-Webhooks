export enum TokenType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
}

export interface IJWTPayload {
  sub: string;
  type: TokenType;
}
