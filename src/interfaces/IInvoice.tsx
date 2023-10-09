import ICashier from "./ICashier";
import IClient from "./IClient"
import ISeller from "./ISeller"

export default interface IInvoice {
  id: number;
  value: number;
  saleDate: string;
  client: IClient;
  seller: ISeller;
  cashier: ICashier;
}