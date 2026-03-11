import { Router } from "express";
import { prisma } from "../../../packages/common/db";
import type { AuthRequest } from "../types/express";
const router=Router();



router.post("/create", async (req: AuthRequest, res) => {
  const { name, description, price, stock } = req.body;

  if (!name || !price) {
    return res.status(400).json({ msg: "Fill in the details" });
  }

  const vendor_id = req.userId;

  if (!vendor_id) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        vendorId: vendor_id
      }
    });

    res.status(201).json({
      msg: "Product created successfully",
      product
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Something went wrong" });
  }
});



export default router;