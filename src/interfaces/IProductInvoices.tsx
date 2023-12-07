import IProduct from "./IProduct";

interface IProductInvoices {
  amount: number;
  value: string;
  product: IProduct;
}

export default IProductInvoices;
