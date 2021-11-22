import {Request, Response} from "express";
import {validatePassword} from "../service/user.service";
import {createSession, findSessions, updateSession} from "../service/session.service";
import {signJwt} from "../utils/jwt.utils";
import config from "config";
import {tryToCatch} from "../utils/tryToCatch";
import logger from "../utils/logger";

export async function createUserSessionHandler(req: Request, res: Response) {
	// Validate user's password
	const [er, user] = await tryToCatch(validatePassword, [req.body]);

	if (er) return res.status(401).send("Invalid email or password");
	// Create session
	const [err, session] = await tryToCatch(createSession, [
		user._id.toString(),
		req.get("user-agent") || "",
	]);

	if (err) return res.status(500);

	// Create access token
	const accessToken = signJwt(
		{...user, session: session._id},
		{expiresIn: config.get("accessTokenTtl")},
	);

	// Create refresh token
	const refreshToken = signJwt(
		{...user, session: session._id},
		{expiresIn: config.get("refreshTokenTtl")},
	);

	return res.send({accessToken, refreshToken});
}

export async function getUserSessionsHandler(req: Request, res: Response) {
	const userId = res.locals.user._id;

	const [err, sessions] = await tryToCatch(findSessions, [{user: userId, valid: true}]);

	if (err) return res.sendStatus(404);

	return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
	const sessionId = res.locals.user.session;

	const [err] = await tryToCatch(updateSession, [{_id: sessionId}, {valid: false}]);

	if (err) {
		logger.error(err);
		return res.status(409).send(err.message);
	}

	return res.send({
		accessToken: null,
		refreshToken: null,
	});
}
