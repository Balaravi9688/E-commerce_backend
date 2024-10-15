import express from "express";
import { userModel } from "../db-utils/model.js";
import bcrypt, { hash } from "bcrypt";
import { generateJWT } from "../utils/jwtToken.js";
import { decreaseSequenceValue, getNextSequenceValue } from "../utils/counter.js";

const authRouter = express.Router();
authRouter.post("/", async (req, res) => {
    const { body } = req;
    try {
        const user = await userModel.findOne({ email: body.email });
        if (!user) {
            res.status(400).send({ msg: "Invalid email or password", error: true });
            return;
        }
        bcrypt.compare(body.password, user.password, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({ msg: "Something went wrong", error: true });
            } else {
                if (result) {
                    const user = await userModel.findOne(
                        { email: body.email },
                        { __v: 0, password: 0, _id: 0 }
                    );
                    let token = generateJWT({ user });
                    res.send({
                        error: false,
                        token,
                    });
                } else {
                    res.status(400).send({ msg: "Invalid email or password", error: true });
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.send({ msg: "Something went wrong", error: true });
    }
});

authRouter.post("/create-user", async (req, res) => {
    const { body } = req;
    try {
        let user = await userModel.findOne({ email: body.email });
        if (user) {
            return res.status(400).send({ msg: "Email alredy exists" });
        }
        bcrypt.hash(body.password, 10, async (error, hash) => {
            if (error) {
                console.log(error);
                res.status(500).send({ msg: "Something went wrong" });
            } else {
                await userModel.create({ ...body, password: hash, id: await getNextSequenceValue('userId') });
                res.send({ msg: "User created successfully", error: false });
            }
        });
    } catch (error) {
        await decreaseSequenceValue('userId');
        console.log(error);
        res.status(500).send({ msg: "Something went wrong" });
    }
});

export default authRouter;