import { useState } from 'react';
import axios from '../http';
import { Formik } from 'formik';
import { Dialog, DialogContent } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

interface IProps {
  amount: number
  productId: number
  handleUpdateAmount(amount: number): void
}

interface IExpensesForm {
  amount: number;
  value: number;
}

const expensesForm: IExpensesForm = {
  amount: 0,
  value: 0
}

function EditProductAmount(props: IProps) {
  const {amount, productId, handleUpdateAmount} = props;
  const [open, setOpen] = useState(false);

  async function handleSubmitExpenses(values: IExpensesForm) {
    const newAmount = Number(amount) + Number(values.amount);
    await axios.post('/expense', {
      amount: Number(values.amount),
      value: values.value,
      launchDate: new Date(),
      productId
    });
    await axios.put('/product', {
      itemId: productId,
      input: "amount",
      value: newAmount
    });
    handleUpdateAmount(newAmount);
    setOpen(false);
  }

  return (
    <>
      <div className="min-w-[256px] p-2 rounded-lg border mr-2 mb-2">
        <p className="text-sm font-bold">Quantidade</p>
        <div className='flex items-center'>
          <div className='text-2xl font-bold mr-2'>{ amount }</div>
          <button
            type='button'
            className='text-green-600'
            onClick={() => { setOpen(true) }}
          >
            <AddBoxIcon/>
          </button>
          <button
            type='button'
            className='text-red-500'
          >
            <IndeterminateCheckBoxIcon/>
          </button>
        </div>
      </div>
      <Dialog open={open} onClose={() => { setOpen(false) }}>
        <DialogContent>
          <h1 className='font-bold text-lg'>Adicionar</h1>
          <Formik
            initialValues={expensesForm}
            onSubmit={handleSubmitExpenses}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit} className="w-96 flex">
                <div className="mr-5">
                  <label htmlFor="amount" className="text-sm">Quantidade</label>
                  <br/>
                  <input
                    id="amount"
                    type="text"
                    className="border p-1 w-20"
                    {...formik.getFieldProps('amount')}
                  />
                  {formik.touched.amount && formik.errors.amount ? (
                    <div>{formik.errors.amount}</div>
                  ) : null}
                </div>
                <div className="mr-5">
                  <label htmlFor="value" className="text-sm">Valor total</label>
                  <br/>
                  <input
                    id="amount"
                    type="value"
                    className="border p-1 w-20"
                    {...formik.getFieldProps('value')}
                  />
                  {formik.touched.value && formik.errors.value ? (
                    <div>{formik.errors.value}</div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="p-2 bg-green-600 rounded text-white mt-2"
                >
                  Adicionar
                </button>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditProductAmount
