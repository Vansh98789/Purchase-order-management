import { Router } from "express";
import type {Response} from "express";
import { prisma } from "../../../packages/common/db";
import type { AuthRequest } from "../types/express";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/create", async (req: AuthRequest, res: Response) => {
  const { productId, units , vendorId } = req.body;

  if (!productId || !units || units <= 0)
    return res.status(400).json({ msg: "Invalid productId or units" });

  try {
    const product = await prisma.product.findFirst({
      where: { id: productId, vendorId }
    });

    if (!product) return res.status(404).json({ msg: "Product not found for this vendor" });

    const totalPrice = product.price * units +(0.05 * product.price * units);

    const order = await prisma.order.create({
      data: { vendorId, productId, units, totalPrice }
    });

    res.status(201).json({ msg: "Order created successfully", order });

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.get("/all", authMiddleware, async (req: AuthRequest, res: Response) => {
  const vendorId = req.userId;
  if (!vendorId) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const orders = await prisma.order.findMany({
      where: { vendorId },
      include: { product: true } 
    });

    res.status(200).json({ orders });

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

export default router;