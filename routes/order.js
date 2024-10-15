import express from "express";
import { orderModel, productModel, userModel } from "../db-utils/model.js";
import { decreaseSequenceValue, getNextSequenceValue } from "../utils/counter.js";

const orderRouter = express.Router();

orderRouter.post('/', async (req, res) => {
    const { body } = req;
    try {
        const product = await productModel.findOne({ id: body.productId });
        const user = await userModel.findOne({ id: body.userId });
        if (product == null || user == null) return res.status(400).send({ msg: "Invalid Product or User IDs", error: true });
        await orderModel.create({ ...body, id: await getNextSequenceValue("orderId") });
        res.send({ msg: "Ordered successfully", error: false });
    } catch (err) {
        await decreaseSequenceValue("orderId");
        res.status(err?._message ? 400 : 500).send({ msg: err?._message ? err?._message : "Something went wrong", error: true })
        console.log(err);
    }
});

orderRouter.get('/:id?', async (req, res) => {
    const { id } = req.params;
    try {
        if (id != undefined) {
            const order = await orderModel.findOne({ id }, { __v: 0, _id: 0 });
            return res.send({ order, error: false });
        }
        const orders = await orderModel.find({}, { __v: 0, _id: 0 });
        res.send({ orders, error: false });
    } catch (err) {
        res.status(500).send({ msg: "Something went wrong", error: true })
        console.log(err);
    }
});

export default orderRouter;