import {Request, Response} from "express";
import {CreateProductInput, UpdateProductInput, ReadProductInput, DeleteProductInput} from "../schema/product.schema";
import {createProduct, deleteProduct, findAndUpdateProduct, findProduct} from "../service/product.service";
import logger from "../utils/logger";

export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res: Response) {
    const userId = res.locals.user._id;
    const body = req.body;

    try {
        const product = await createProduct({...body, user: userId});
        return res.send(product);
    } catch (e:any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
}

export async function updateProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;

    const product = await findProduct({productId});

    if (!product) return res.sendStatus(404);
    if (String(product.user) !== userId) return res.sendStatus(403);

    try {
        const updatedProduct = await findAndUpdateProduct({productId}, update, {new: true});
        return res.send(updatedProduct);
    } catch (e:any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
}

export async function getProductHandler(req: Request<ReadProductInput["params"]>, res: Response) {
    const productId = req.params.productId;
    const product = await findProduct({productId});

    if (!product) return res.sendStatus(404);

    return res.send(product);
}

export async function deleteProductHandler(req: Request<DeleteProductInput["params"]>, res: Response) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({productId});

    if (!product) return res.sendStatus(404);
    if (String(product.user) !== userId) return res.sendStatus(403);

    try {
        await deleteProduct({productId});
        return res.sendStatus(200);
    } catch (e:any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
}