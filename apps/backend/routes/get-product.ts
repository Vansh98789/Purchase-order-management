import { Router } from "express";
import type {Response} from "express";
import { prisma } from "../../../packages/common/db";
import type { AuthRequest } from "../types/express";

const router = Router();

router.get("/all-product",  async (req: AuthRequest, res: Response) => {
  const vendorId = req.userId;

  if (!vendorId) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const products = await prisma.product.findMany({
      where: { vendorId }
    });

    res.status(200).json({ products });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.get("/product/:id", async (req: AuthRequest, res: Response) => {
  const productId = req.params.id;


  try {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      }
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

export default router;