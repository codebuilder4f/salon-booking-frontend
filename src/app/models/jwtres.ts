export interface JWTRes{
    token: string;
    refreshToken: string;
    type: string;
    id: string;
    username: string;
    roles: string[];
}
