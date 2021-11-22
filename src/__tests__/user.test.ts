import * as UserService from "../service/user.service";
import * as SessionService from "../service/session.service";
import createServer from "../utils/server";
import {sessionPayload, userInput, userPayload} from "./helper";
import supertest from "supertest";
import {createUserSessionHandler} from "../controller/session.controller";

const app = createServer();

describe("user", () => {
	describe("user registration", () => {
		describe("given the valid username & password", () => {
			it("should return 200 & user payload", async () => {
				const createUserServiceMock = jest
					.spyOn(UserService, "createUser")
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					.mockReturnValueOnce(userPayload);

				const {statusCode, body} = await supertest(app).post("/api/users").send(userInput);

				expect(statusCode).toBe(200);
				expect(body).toEqual(userPayload);
				expect(createUserServiceMock).toHaveBeenCalled();
				expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
			});
		});
		describe("given the passwords do not match", () => {
			it("should return 400", async () => {
				const createUserServiceMock = jest
					.spyOn(UserService, "createUser")
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					.mockReturnValueOnce(userPayload);

				const {statusCode} = await supertest(app)
					.post("/api/users")
					.send({
						...userInput,
						passwordConfirmation: "654321A",
					});

				expect(statusCode).toBe(400);
				expect(createUserServiceMock).not.toHaveBeenCalled();
			});
		});
		describe("given the user service throws", () => {
			it("should return 409", async () => {
				const createUserServiceMock = jest
					.spyOn(UserService, "createUser")
					.mockRejectedValue("Err");

				const {statusCode} = await supertest(app).post("/api/users").send(userInput);

				expect(statusCode).toBe(409);
				expect(createUserServiceMock).toHaveBeenCalled();
				expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
			});
		});
	});

	describe("create user session", () => {
		describe("given the valid username & password", () => {
			it("should  return a signed accessToken & refreshToken", async () => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				jest.spyOn(UserService, "validatePassword").mockReturnValue(userPayload);
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				jest.spyOn(SessionService, "createSession").mockReturnValue(sessionPayload);

				const req = {
					get: () => {
						return "user agent";
					},
					body: {
						email: userInput.email,
						password: userInput.password,
					},
				};

				const send = jest.fn();

				const res = {
					send,
				};

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				await createUserSessionHandler(req, res);

				expect(send).toHaveBeenCalledWith({
					accessToken: expect.any(String),
					refreshToken: expect.any(String),
				});
			});
		});
	});
});
