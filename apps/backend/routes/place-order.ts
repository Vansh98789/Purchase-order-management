import { Router } from "express";
import type {Response} from "express";
import { prisma } from "../../../packages/common/db";
import type { AuthRequest } from "../types/express";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, async (req: AuthRequest, res: Response) => {

  const { productId, units } = req.body;
    if (!req.userId) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  const vendorId = req.userId;

  if (!productId || !units || units <= 0) {
    return res.status(400).json({ msg: "Invalid productId or units" });
  }

  try {

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        vendorId: vendorId
      }
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found for this vendor" });
    }

    const price = Number(product.price);
    const subtotal = price * units;
    const tax = subtotal * 0.05;
    const totalPrice = subtotal + tax;

    const order = await prisma.order.create({
      data: {
        vendorId,
        productId,
        units,
        totalPrice
      }
    });

    res.status(201).json({
      msg: "Order created successfully",
      order
    });

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


router.patch("/fulfill/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  const vendorId = req.userId;
  const orderId = Number(req.params.id);

  if (!vendorId) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        vendorId
      }
    });

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { fulfilled: true }
    });

    res.json({ msg: "Order fulfilled" });

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

export default router;