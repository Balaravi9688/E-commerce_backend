import express from "express";
import cors from 'cors';
import mongooseConnect from "./db-utils/mongoose.js";
import userRouter from "./routes/user.js";
import { giveDate } from "./utils/giveDate.js";
import productRouter from "./routes/products.js";
import orderRouter from "./routes/order.js";
import { authenticateToken } from "./middleware/authentication.js";
import authRouter from "./routes/auth.js";

const app = express();
mongooseConnect();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(`${giveDate()} ${req.method} ${req.url}`);
    next();
});
app.use('/auth', authRouter);

app.use(authenticateToken);
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));