export default interface IProductResponse {
  id: number
  title: string
  price: number
  amount: number
  barCode: string
  invoices?: {
    id: number;
    value: number;
    saleDate: string;
    client: {
      id: number;
      name: string;
      cellPhone: string;
      email: string;
      cpf: string;
      balance: number;
    }
  }[]
}