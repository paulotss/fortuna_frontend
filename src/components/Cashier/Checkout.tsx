import { useEffect, useState } from "react";
import IProductCheckout from "../../interfaces/IProductCheckout";
import { Dialog, DialogContent } from "@mui/material";
import { IconButton } from '@mui/material';
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
      const { data } = await axios.get('/products');
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
      await axios.post('/invoice', invoiceRequest)
      props.removeClient();
    } catch (error) {
      console.log(error)
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
        <div className='flex justify-between border-b pb-3'>
          <h1 className='w-fit text-lg'>Items</h1>
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
                    className="flex justify-between mt-1 p-2 bg-amber-200 items-center"
                    >
                      <div>{product.title}</div>
                      <div className="font-bold">
                        {
                          Number(product.price)
                            .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                        }
                      </div>
                      <div>{product.amountCheckout}<span className="text-sm italic">und.</span></div>
                      <IconButton onClick={() => {handleClickRemoveProduct(product.id)}}>
                        <DoDisturbOnIcon fontSize="small" />
                      </IconButton>
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
              disabled={getTotalPrice() > props.client.balance}
              onClick={handleSubmit}
            >
              Finalizar
            </button>
          </div>
        </div>

        <Dialog
          open={isDialogOpen}
          onClose={() => {setIsDialogOpen(false)}}
        >
          <DialogContent>
            <input
              type='text'
              className='border p-1 w-full mb-2'
              placeholder='Buscar produto'
            />
            <h1 className='font-bold mb-2'>Recentes</h1>
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
