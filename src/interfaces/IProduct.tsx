export default interface IProduct {
  id: number;
  title: string;
  price: number;
  amount: number;
  amountInput: number;
  amountCheckout?: number;
}