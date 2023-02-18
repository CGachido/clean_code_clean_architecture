import express, { Request, Response } from "express";
import pgp from "pg-promise";
import { validate } from "./cpfValidator";

const app = express();
app.use(express.json());

app.post('/checkout', async function (req: Request, res: Response) {
  const output: Output = {
    total: 0
  };
  const isValidCPF = validate(req.body.cpf);
  if (!isValidCPF) output.message = "Invalid cpf";
  const connection = pgp()("postgres://root:mysecretpassword@localhost:5432/cccat10");
  if (req.body.items) {
    for (const item of req.body.items) {
      const [productData] = await connection.query("select * from product where id_product = $1", item.idProduct);
      const total = productData.price * item.quantity;
      output.total += total;
    }
  }
  if (req.body.coupon) {
    const [couponData] = await connection.query("select * from coupon where code = $1", req.body.coupon);
    output.total -= (output.total * couponData.percentage / 100);
  }
  await connection.$pool.end();
  res.json(output);
})

const port = 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}`)
})

type Output = {
  total: number,
  message?: string
}