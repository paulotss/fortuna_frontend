import IClient from "./IClient";

interface IInvoiceToProductResponse {
  invoiceId: number;
  amount: number;
	value: number;
	saleDate: Date;
  client: IClient
}

export default IInvoiceToProductResponse;
