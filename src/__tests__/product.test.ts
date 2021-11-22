import * as ProductService from "../service/product.service";
import supertest from "supertest";
import createServer from "../utils/server";
import {signJwt} from "../utils/jwt.utils";
import {productId, productPayload, userPayload} from "./helper";

const app = createServer();

describe("product", () => {
	describe("GET route", () => {
		describe("given the product does not exist", () => {
			it("should return 404", async () => {
				const findProductServiceMock = jest
					.spyOn(ProductService, "findProduct")
					.mockRejectedValue("Err");
				const productId = "1";

				const x = await supertest(app).get(`/api/products/${productId}`);

				expect(x.statusCode).toBe(404);
				expect(findProductServiceMock).toHaveBeenCalled();
			});
		});
		describe("given the product does exist", () => {
			it("should return 202 status and the product", async () => {
				const findProductServiceMock = jest
					.spyOn(ProductService, "findProduct")
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					.mockReturnValue(productPayload);

				const {body, statusCode} = await supertest(app).get(`/api/products/${productId}`);

				expect(statusCode).toBe(200);
				expect(body).toEqual(productPayload);
				expect(findProductServiceMock).toHaveBeenCalled();
				expect(findProductServiceMock).toHaveBeenCalledWith({productId});
			});
		});
	});
	describe("POST route", () => {
		describe("given the user is not logged in", () => {
			it("should return 403 status", async () => {
				const {statusCode} = await supertest(app).post("/api/products");

				expect(statusCode).toBe(403);
			});
		});
		describe("given the user is logged in", () => {
			it("should return 200 status & create the product", async () => {
				const createProductServiceMock = jest
					.spyOn(ProductService, "createProduct")
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					.mockReturnValue(productPayload);

				const jwt = signJwt(userPayload);

				const {statusCode, body} = await supertest(app)
					.post("/api/products")
					.set("Authorization", `Bearer ${jwt}`)
					.send(productPayload);

				expect(statusCode).toBe(200);
				expect(body).toEqual(productPayload);
				expect(createProductServiceMock).toHaveBeenCalled();
				expect(createProductServiceMock).toHaveBeenCalledWith(productPayload);
			});
		});
	});
});
