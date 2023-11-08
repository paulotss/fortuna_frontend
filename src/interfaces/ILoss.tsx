import IProduct from "./IProduct";

export default interface ILoss {
  id: number;
  amount: number;
  description: string;
  createAt: string;
  product: IProduct;
}