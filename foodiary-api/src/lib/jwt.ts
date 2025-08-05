import { sign } from "jsonwebtoken";

export function signAccessToken(userId: string) {
    const accessToken = sign(
        {sub: userId}, process.env.JWT_SECRET!, {expiresIn: '2d'}
    )

    return accessToken
}