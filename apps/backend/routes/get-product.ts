import { Router } from "express";
import type {Response} from "express";
import { prisma } from "../../../packages/common/db";
import type { AuthRequest } from "../types/express";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/all-product",  async (req: AuthRequest, res: Response) => {

  
  try {
    const products = await prisma.product.findMany({
    });

    res.status(200).json({ products });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
router.get("/all-vendor-product", authMiddleware, async (req: AuthRequest, res: Response) => {

  const vendorId = req.userId;

  try {

    const products = await prisma.product.findMany({
      where: {
        vendorId: vendorId
      }
    });

    res.status(200).json({ products });

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Something went wrong" });
  }

});

router.get("/product/:id", async (req: AuthRequest, res: Response) => {
  const idParam = req.params.id;

  if (!idParam || Array.isArray(idParam)) {
    return res.status(400).json({ msg: "Invalid product ID" });
  }

  const productId = parseInt(idParam, 10);

  if (isNaN(productId)) {
    return res.status(400).json({ msg: "Product ID must be a number" });
  }

  try {
    const product = await prisma.product.findFirst({
      where: { id: productId },
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