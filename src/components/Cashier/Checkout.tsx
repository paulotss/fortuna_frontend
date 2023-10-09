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
import { CheckCircle, RemoveCircle } from "@mui/icons-material";
import IInvoiceRequest from "../../interfaces/IInvoiceRequest";
import ICashier from "../../interfaces/ICashier";

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
        clientId: props.client.id,
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
                    className="flex justify-between mt-1 p-2 bg-yellow-200 rounded items-center"
                    >
                      <div>{product.title}</div>
                      <div>{product.price}</div>
                      <div>{product.amountCheckout}</div>
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
          <div className="text-xl font-bold">Total: { getTotalPrice() }</div>
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
              className='border p-1 w-96 mb-2'
              placeholder='Buscar produto'
            />
            <h1 className='font-bold mb-2'>Recentes</h1>
            {
              products.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between mt-1 p-2 bg-yellow-200 rounded items-center"
                >
                  <div>{product.title}</div>
                  <div>{product.amount}</div>
                  <div>{product.price}</div>
                  <div>
                    <span>
                      { product.amountInput }
                    </span>
                  </div>
                  <div>
                    <IconButton onClick={() => handleClickRemoveAmountInput(product.id)}>
                      <RemoveCircle />
                    </IconButton>
                    <IconButton onClick={() => handleClickAddAmountInput(product.id)}>
                      <AddCircleIcon />
                    </IconButton>
                  </div>
                  <div>
                    <IconButton onClick={() => {handleClickProduct(product.id)}}>
                      <CheckCircle />
                    </IconButton>
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
