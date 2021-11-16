import {NextFunction, Request, Response} from "express";
import {get} from "lodash";
import {verifyJwt} from "../utils/jwt.utils";
import {reIssueAccessToken} from "../service/session.service";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    // Get the access token and remove Bearer from the beginning
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

    const refreshToken = get(req, "headers.x-refresh");

    if (!accessToken) return next();

    const {decoded, expired} = verifyJwt(accessToken);

    if (decoded) {
        res.locals.user = decoded;
        return next();
    }

    // if access token expired create new access token
    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({refreshToken});

        if (newAccessToken) {
            res.setHeader('x-access-token', newAccessToken);

            const result = verifyJwt(newAccessToken);
            res.locals.user = result.decoded;
        }

        return next();
    }
    return next();
}

export default deserializeUser;