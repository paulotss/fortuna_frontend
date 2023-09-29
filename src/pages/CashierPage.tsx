import { ChangeEvent, useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import Header from "../components/Header";
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface IProduct {
  id: number;
  title: string;
  price: number;
  amount: number;
  amountCheckout?: number;
  isCheckout?: boolean;
}

const initialProducts: IProduct[] = [
  {
    id: 1,
    title: 'Produto 1',
    price: 21,
    amount: 10
  },
  {
    id: 2,
    title: 'Produto 2',
    price: 22,
    amount: 10
  },
  {
    id: 3,
    title: 'Produto 3',
    price: 23,
    amount: 10
  },
];

function CashierPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  function handleClickProduct(id: number) {
    setProducts(products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          amountCheckout: product.amountCheckout || 1,
          isCheckout: true,
        }
      } else {
        return product;
      }
    }));
    setIsDialogOpen(false);
  }

  function handleChangeAmountCheckout({ target }: ChangeEvent<HTMLInputElement>) {
    const id = Number(target.id);
    setProducts(products.map(product => {
      if (product.id === id) {
        return { ...product, amountCheckout: Number(target.value) }
      } else {
        return product;
      }
    }));
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
    <>
      <Header/>
      <section className='p-5'>
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
            products.map(product => {
              if (product.isCheckout) {
                return (
                  <div
                  key={product.id}
                  className="flex justify-between mt-1 p-2 bg-yellow-200 rounded"
                  >
                    <div>{product.title}</div>
                    <div>{product.amount}</div>
                    <div>{product.price}</div>
                    <div>{product.amountCheckout}</div>
                  </div>
                )
              }
            })
          }
        </div>
        <div className="flex justify-between">
          <div className="text-xl font-bold">Total: { getTotalPrice() }</div>
          <button className='p-2 bg-green-600 rounded'>Finalizar</button>
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
                  className="flex justify-between mt-1 p-2 bg-yellow-200 rounded"
                >
                  <div>{product.title}</div>
                  <div>{product.amount}</div>
                  <div>{product.price}</div>
                  <div>
                    <input
                      id={product.id.toString()}
                      name={`checkout-${product.id}`}
                      type="number"
                      className="w-24"
                      min="1"
                      value={product.amountCheckout || 1}
                      onChange={handleChangeAmountCheckout}
                    />
                  </div>
                  <IconButton
                    onClick={() => {handleClickProduct(product.id)}}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </div>
              ))
            }
          </DialogContent>
        </Dialog>
      </section>
    </>
  )
}

export default CashierPage;
