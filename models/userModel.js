const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");


//create user schema
let schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date_created: {
    type: Date, default: Date.now
  },
  role: {
    type: String, default: "user"

  }
})
exports.UserModel = mongoose.model("users", schema);

//create user token for 60 mins
exports.createToken = (user_id, role) => {
  let token = jwt.sign({ _id: user_id, role }, process.env.TOKENSECRET, { expiresIn: "60mins" });
  return token;
}

//create user joi
exports.validateJoi = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(1).max(100).email().required(),
    password: Joi.string().min(1).max(50).required(),
  })
  return joiSchema.validate(_reqBody)
}

//create user login joi
exports.validateLogin = (_reqBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(1).max(100).email().required(),
    password: Joi.string().min(1).max(50).required(),
  })
  return joiSchema.validate(_reqBody)
}