import { Router } from "express";
import { prisma } from "../../../packages/common/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

router.post("/signup", async (req, res) => {

  const { email, password, name, phone } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      msg: "credentials missing"
    });
  }

  try {

    const hashed_password = await bcrypt.hash(password, 10);

    await prisma.vendor.create({
      data: {
        email,
        password: hashed_password,
        name,
        phone
      }
    });

    res.status(201).json({
      msg: "vendor registered successfully"
    });

  } catch (e) {
    console.log(e);
  }
});


router.post("/signin", async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      msg: "credentials missing"
    });
  }

  try {

    const user = await prisma.vendor.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        msg: "Vendor not found"
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        msg: "Password incorrect"
      });
    }

    const token = jwt.sign(
      { id: user.id },
      "abcdefgh",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true
    });

    res.status(200).json({
      msg: "signin successful"
    });

  } catch (e) {
    console.log(e);
  }

});

export default router;