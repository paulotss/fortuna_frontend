import IProduct from "./IProduct";

export default interface IExpense {
  id: number;
  amount: number;
  value: string;
  launchDate: string;
  product: IProduct;
}