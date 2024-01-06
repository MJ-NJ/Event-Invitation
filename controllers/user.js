import User from "../models/User.js";
import qrCode from "qrcode";
import "dotenv/config";
import csv from "csv-parser";
import nodemailer from "nodemailer";
import fs from "fs";
import { create_user } from "../middlewares/mail.js";

//@route   POST /users/
//@desc    Register user
//@access  Public

async function registerUser(req, res) {
  try {
    let arr = [];
    fs.createReadStream(req.file.path)
      .pipe(csv({}))
      .on("data", (data) => {
        arr.push(data);
      })
      .on("end", () => {
        var i = 0;

        (function loop() {
          console.log(i + 1, arr[i].email, arr[i].name);
          create_user(arr[i]);
          if (++i < arr.length) {
            setTimeout(loop, 3000); // call myself in 3 seconds time if required
          }
        })();

        res.json({
          msg: "email sent",
          data: arr.length,
        });
      });
  } catch (error) {
    res.json(error.message);
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json(error.message);
  }
}
async function deleteUser(req, res) {
  try {
    const user = await User.deleteMany();
    res.json(user);
  } catch (error) {
    res.json(error.message);
  }
}
async function getUserBYId(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (user.verified === true) {
      return res.json(false);
    }
    user.verified = true;
    await user.save();
    res.json(true);
  } catch (error) {
    res.json(error.message);
  }
}

export { registerUser, getUsers, deleteUser, getUserBYId };
