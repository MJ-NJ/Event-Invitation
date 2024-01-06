import nodemailer from "nodemailer";
import User from "../models/User.js";
import qrCode from "qrcode";
import "dotenv/config";
async function create_user(data) {
  try {
    const userExists = await User.findOne({ email: data.email });
    if (userExists) {
      return;
    }
    const user = new User({
      name: data.name,
      email: data.email,
      rollNo: data.rollNo,
      // slot: data.slot,
      slot: "",
    });
    await user.save();
    //qrcode

    const qr = await qrCode.toDataURL(user._id.toString());

    //nodemailer
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "",
        pass: process.env.gmailPass,
      },
    });
    let info = await transporter.sendMail({
      from: '',
      to: user.email,
      subject: "OWASP: Invite for Orientation!",
      text: "Invite for Owasp Orientation !",
      html: `
        
            `,
      attachments: [
        // File Stream attachment
        {
          filename: "invite.png",
          path: qr,
          cid: `${qr}`,
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }
}

export { create_user };
