import {Request, Response} from "express";
import logger from "../utils/logger";
import {createUser} from "../service/user.service";
import {CreateUserInput} from "../schema/user.schema";
import {omit} from "lodash";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body);

        // Don't send the password back to frontend
        return res.send(omit(user.toJSON(), "password"));
    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
}