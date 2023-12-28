import { ChangeEvent, useEffect, useState } from "react";
import IProductCheckout from "../../interfaces/IProductCheckout";
import { Dialog, DialogContent } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import ClientInfo from "./ClientInfo";
import IClient from "../../interfaces/IClient";
import axios from "../../http";
import IProductResponse from "../../interfaces/IProductResponse";
import { RemoveCircle } from "@mui/icons-material";
import IInvoiceRequest from "../../interfaces/IInvoiceRequest";
import ICashier from "../../interfaces/ICashier";
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import BarCodeInput from "./BarCodeInput";

interface IProps {
  client: IClient;
  cashier: ICashier;
  removeClient(): void;
}

function Checkout(props: IProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductCheckout[]>([]);

  useEffect(() => {
    async function getAllProducts () {
      try {
        const auth = sessionStorage.getItem('auth');
        const { data } = await axios.get('/product/recent/5', { headers: { 'authorization': auth } });
        const products: IProductCheckout[] = data.map((v: IProductResponse) => {
          return {
            id: v.id,
            title: v.title,
            price: v.price,
            amount: v.amount,
            amountInput: 0
          }
        })
        setProducts(products)
      } catch (error) {
        console.log(error)
      }
    }
    getAllProducts()
  }, [])

  function handleClickProduct(id: number) {
    setProducts(products.map(product => {
      if (product.id === id) {
        const newAmountCheckout = product.amountCheckout
          ? product.amountInput + product.amountCheckout
          : product.amountInput
        return {
          ...product,
          amount: product.amount - product.amountInput,
          amountCheckout: newAmountCheckout,
          amountInput: 0
        }
      } else {
        return {
          ...product,
          amountInput: 0,
        };
      }
    }));
    setIsDialogOpen(false);
  }

  function handleClickRemoveProduct(id: number) {
    setProducts(products.map((product) => {
      if (product.id === id && product.amountCheckout) {
        return {
          ...product,
          amount: product.amount + 1,
          amountCheckout: product.amountCheckout - 1,
        }
      } else {
        return product;
      }
    }))
  }

  function handleClickAddAmountInput(id: number) {
    setProducts(products.map(product => {
      if (product.id === id && ((product.amountInput + 1) <= product.amount)) {
        return { 
          ...product,
          amountInput: product.amountInput + 1
          }
      } else {
        return product;
      }
    }));
  }

  function handleClickRemoveAmountInput(id: number) {
    setProducts(products.map(product => {
      if (product.id === id && (product.amountInput - 1) >= 0) {
        return { 
          ...product,
          amountInput: product.amountInput - 1
          }
      } else {
        return product;
      }
    }));
  }

  async function handleSubmit() {
    try {
      const auth = sessionStorage.getItem('auth');
      const token = sessionStorage.getItem('auth')
      const { data: { payload } } = await axios.post('/seller/verify', { token })
      const productsInCheckout = products.filter((product) => product.amountCheckout)
      const invoiceRequest: IInvoiceRequest = {
        value: getTotalPrice(),
        saleDate: new Date(),
        cashierId: props.cashier.id,
        sellerId: payload.id,
        clientId: props.client.id || 0,
        products: productsInCheckout.map((product) => {
            return {
              id: product.id,
              value: product.price * (product.amountCheckout || 1),
              amount: product.amountCheckout || 1
            }
        })
      }
      await axios.post('/invoice', invoiceRequest, { headers: { 'authorization': auth } })
      props.removeClient();
    } catch (error) {
      console.log(error)
    }
  }

  async function handleChangeSearch(event: ChangeEvent<HTMLInputElement>) {
    try {
      const { target } = event;
      const auth = sessionStorage.getItem('auth');
      const { data } = await axios.get(`/products/search?title=${target.value}`, { headers: { 'authorization': auth } });
      const allProducts: IProductCheckout[] = data.map((v: IProductResponse) => {
        return {
          id: v.id,
          title: v.title,
          price: v.price,
          amount: v.amount,
          amountInput: 0,
        }
      });
      const olderProducts = products.filter((p) => p.amountCheckout !== undefined)
      const finalProducts = allProducts.filter((p) => !olderProducts.some((o) => o.id === p.id))
      setProducts([...olderProducts, ...finalProducts])
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmitBarcodeSearch(value: string) {
    try {
      const auth = sessionStorage.getItem('auth');
      const { data } = await axios.get(`/product/barcode/${value}`, { headers: { 'authorization': auth } });
      const resultProduct: IProductCheckout = {
        id: data.id,
        title: data.title,
        price: data.price,
        amount: data.amount,
        amountInput: 0,
      }
      const verify = products.find((p) => p.id === data.id)
      if (verify) {
        verify.amountCheckout = verify.amountCheckout ? verify.amountCheckout + 1 : 1
        setProducts([...products.filter((p) => p.id !== verify.id), verify])
      } else {
        setProducts([...products, resultProduct]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getTotalPrice() {
    const total = products.reduce((acc, product) => {
      if (product.amountCheckout) {
        return acc + (product.amountCheckout * product.price)
      }
      return acc;
    }, 0);
    return total;
  }

  return (
      <section className='p-5'>
        <ClientInfo client={props.client} totalCheckout={getTotalPrice()} />
        <BarCodeInput sendResult={handleSubmitBarcodeSearch} />
        <div className='flex justify-between border-b pb-3 mt-3'>
          <h1 className='w-fit text-lg'>Itens</h1>
          <button
            type='button'
            className='p-2 bg-green-600 rounded'
            onClick={() => {setIsDialogOpen(true)}}
          >
            Adicionar
          </button>
        </div>
        <div className="p-5 mb-5 border-b">
          {
            products.some((product) => product.amountCheckout)
            ?  products.map(product => {
                if (product.amountCheckout) {
                  return (
                    <div
                    key={product.id}
                    className="grid grid-cols-4 gap-4 mt-1 p-2 bg-amber-200"
                    >
                      <div>{product.title}</div>
                      <div className="font-bold text-center">
                        {
                          Number(product.price)
                            .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                        }
                      </div>
                      <div className="text-center">{product.amountCheckout}<span className="text-sm italic">und.</span></div>
                      <button
                        type="button"
                        className="text-right"
                        onClick={() => {handleClickRemoveProduct(product.id)}}
                      >
                        <DoDisturbOnIcon fontSize="small" />
                      </button>
                    </div>
                  )
                }
              })
            : <p className="italic">Vazio</p>
          }
        </div>
        <div className="flex justify-between">
          <div className="text-xl font-bold">
            Total:
            {' '}
            { getTotalPrice().toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }
          </div>
          <div>
            <button
              type="button"
              className='p-2 bg-red-600 rounded mr-2'
              onClick={() => { props.removeClient(); }}
            >
              Cancelar
            </button>
            <button
              type="button"
              className='p-2 bg-green-600 rounded disabled:bg-gray-400'
              disabled={getTotalPrice() > props.client.balance || getTotalPrice() === 0}
              onClick={handleSubmit}
            >
              Finalizar
            </button>
          </div>
        </div>

        <Dialog
          fullWidth={true}
          open={isDialogOpen}
          onClose={() => {setIsDialogOpen(false)}}
        >
          <DialogContent>
            <input
              type='text'
              className='border p-1 w-full mb-2'
              placeholder='Buscar produto'
              onChange={handleChangeSearch}
            />
            {
              products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-7 gap-4 mt-1 p-2 bg-amber-200 min-w-96"
                >
                  <div className="col-span-2">{product.title}</div>
                  <div>{product.amount}<span className="text-sm italic">und.</span></div>
                  <div>{Number(product.price).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
                  <div className="text-center font-bold">
                    <span>
                      { product.amountInput }
                    </span>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => handleClickRemoveAmountInput(product.id)}
                      className="text-gray-600"
                    >
                      <RemoveCircle fontSize="small" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClickAddAmountInput(product.id)}
                      className="text-blue-600"
                    >
                      <AddCircleIcon fontSize="small" />
                    </button>
                  </div>
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => {handleClickProduct(product.id)}}
                      className="text-green-700"
                    >
                      <LibraryAddCheckIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              ))
            }
          </DialogContent>
        </Dialog>
      </section>
  )
}

export default Checkout;
