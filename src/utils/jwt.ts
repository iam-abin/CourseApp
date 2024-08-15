import jwt from "jsonwebtoken";

interface IJwtPayload {
    userId: number;
    name: string;
    email: string;
}

export const createJwtAccessToken = (payload: IJwtPayload): string => {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
    });
    return accessToken;
};
