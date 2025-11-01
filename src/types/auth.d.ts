export interface JwtPayload {
  id: number;
  email: string;
  issuedAt: number;
  expireAt: number;
}
