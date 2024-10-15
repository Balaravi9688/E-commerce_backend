import express from "express";
import { productModel } from "../db-utils/model.js";
import { decreaseSequenceValue, getNextSequenceValue } from "../utils/counter.js";

const productRouter = express.Router();

productRouter.post('/', async (req, res) => {
    const { body } = req;
    try {
        await productModel.create({ ...body, id: await getNextSequenceValue("productId") });
        res.send({ msg: "Product created successfully", error: false });
    } catch (err) {
        await decreaseSequenceValue("productId");
        console.log(err);
        res.status(err?._message ? 400 : 500).send({ msg: err?._message ? err?._message : "Something went wrong", error: true })
    }
});

productRouter.put('/:id', async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const product = await productModel.findOne({ id });
        if (product == null) return res.status(400).send({ msg: "Product not found", error: true });
        await productModel.updateOne({ id: product.id }, { $set: { ...body, updatedAt: new Date() } });
        res.send({ msg: "Product updated successfully", error: false })
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Something went wrong", error: true })
    }
});

productRouter.get('/:id?', async (req, res) => {
    const { id } = req.params;
    try {
        if (id != undefined) {
            const product = await productModel.findOne({ id }, { __v: 0, _id: 0 });
            return res.send({ product, error: false });
        }
        const products = await productModel.find({}, { __v: 0, _id: 0 });
        res.send({ products, error: false });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Something went wrong", error: true })
    }
});

productRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let product = await productModel.findOne({ id });
        if (product == null) return res.status(400).send({ msg: "Product not found", error: false });
        await productModel.deleteOne({ id });
        res.send({ msg: "Product deleted successfully", error: false })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Something went wrong", error: true })
    }
});

export default productRouter;