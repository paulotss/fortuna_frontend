export default interface IInvoiceRequest {
  value: number
  saleDate: Date
  cashierId: number
  sellerId: number
  clientId: number
  products: Array<{
    id: number,
    value: number
    amount: number
  }>
}
