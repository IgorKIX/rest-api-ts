import {Request, Response} from "express";
import {CreateProductInput, DeleteProductInput, ReadProductInput, UpdateProductInput} from "../schema/product.schema";
import {createProduct, deleteProduct, findAndUpdateProduct, findProduct} from "../service/product.service";
import logger from "../utils/logger";
import {tryToCatch} from "../utils/tryToCatch";

export async function createProductHandler(
	req: Request<{}, {}, CreateProductInput["body"]>,
	res: Response,
) {
	const userId = res.locals.user._id;

	const body = req.body;

	const [er, product] = await tryToCatch(createProduct, [{
		...body,
		user: userId,
	}]);

	if (er) {
		logger.error(er);
		return res.status(409).send(er.message);
	}

	return res.send(product);
}

export async function updateProductHandler(
	req: Request<UpdateProductInput["params"]>,
	res: Response,
) {
	const userId = res.locals.user._id;
	const productId = req.params.productId;
	const update = req.body;

	const [er, product] = await tryToCatch(findProduct, [{productId}]);

	if (er) return res.sendStatus(404);

	if (String(product.user) !== userId) return res.sendStatus(403);

	const [err, updatedProduct] = await tryToCatch(findAndUpdateProduct, [
		{productId},
		update,
		{new: true},
	]);

	if (err) {
		logger.error(err);
		return res.status(409).send(err.message);
	}

	return res.send(updatedProduct);
}

export async function getProductHandler(req: Request<ReadProductInput["params"]>, res: Response) {
	const productId = req.params.productId;

	const [er, product] = await tryToCatch(findProduct, [{productId}]);

	if (er) return res.sendStatus(404);

	return res.send(product);
}

export async function deleteProductHandler(
	req: Request<DeleteProductInput["params"]>,
	res: Response,
) {
	const userId = res.locals.user._id;
	const productId = req.params.productId;

	const [er, product] = await tryToCatch(findProduct, [{productId}]);

	if (er) return res.sendStatus(404);

	if (String(product.user) !== userId) return res.sendStatus(403);

	const [err] = await tryToCatch(deleteProduct, [{productId}]);

	if (err) {
		logger.error(err);
		return res.status(409).send(err.message);
	}

	return res.sendStatus(200);
}
