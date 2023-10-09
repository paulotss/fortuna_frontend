export default interface IProductCheckout {
  id: number;
  title: string;
  price: number;
  amount: number;
  amountInput: number;
  amountCheckout?: number;
}