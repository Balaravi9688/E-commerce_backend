import express from "express";
import { orderModel, userModel } from "../db-utils/model.js";

const userRouter = express.Router();

userRouter.get('/:id?', async (req, res) => {
  const { id } = req.params;
  try {
    if (id != undefined) {
      const user = await userModel.findOne({ id }, { __v: 0, _id: 0, password: 0 });
      return res.send({ user, error: false });
    }
    const users = await userModel.find({}, { __v: 0, _id: 0, password: 0 });
    return res.send({ users, error: false });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Something went wrong", error: true });
  }
});

userRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req
  try {
    if (id) {
      const user = await userModel.findOne({ id });
      if (user == null) return res.status(400).send({ msg: "User not found", error: true });
      await userModel.updateOne({ id: user.id }, { $set: { ...user, ...body } });
      return res.send({ msg: "User updated successfully", error: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Something went wrong", error: true });
  }
});

userRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const user = await userModel.findOne({ id });
      if (user == null) return res.status(400).status({ msg: "User not found", error: true })
      await userModel.deleteOne({ id });
      return res.send({ msg: "User deleted successfully", error: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Something went wrong", error: true });
  }
});

userRouter.get('/:id/orders', async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await orderModel.find({ userId: id }, { __v: 0, _id: 0 });
    res.send({ orders, error: false });
  } catch (error) {
    console.log(error);
    res.send({ msg: "Something went wrong", error: true });
  }
})

export default userRouter;
