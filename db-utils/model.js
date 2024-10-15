import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
});

const productSchema = new mongoose.Schema({
  id: Number,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  },
  images: [String],

});

const orderSchema = new mongoose.Schema({
  id: Number,
  productId: {
    type: [Number],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  },
  userId: {
    type: Number,
    required: true
  }
});

const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  sequence_value: {
    type: Number,
    required: true,
  },
});

const userModel = new mongoose.model("user", userSchema, "users");
const productModel = new mongoose.model("product", productSchema, "products");
const counterModel = new mongoose.model("counter", counterSchema, "counter");
const orderModel = new mongoose.model("order", orderSchema, "orders");

export { userModel, productModel, counterModel, orderModel };
