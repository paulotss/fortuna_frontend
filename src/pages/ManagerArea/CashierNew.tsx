import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from '../../http';
import ManagerHeader from '../../components/ManagerArea/ManagerHeader';
import ICashier from '../../interfaces/ICashier';
import { Dialog } from '@mui/material';
import ReceiptReport from '../../components/ReceiptsReport';

interface IFormCashier {
  title: string
}

const initialValues: IFormCashier = {
  title: ""
}

function CashierNew() {
  const [cashiers, setCashiers] = useState<ICashier[]>([]);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [cashierId, setCashierId] = useState<number | null>(null);

  async function handleSubmit(values: IFormCashier) {
    try {
      const {data} = await axios.post('/cashier', values);
      setCashiers([...cashiers, data]);
      setOpenAlert(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getCashiers() {
      try {
        const { data } = await axios.get('/cashier');
        setCashiers(data);
      } catch (error) {
        console.log(error);
      }
    }
    getCashiers();
  }, [])

  return (
    <>
      <ManagerHeader/>
      <section className='p-5'>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            title: Yup.string().required('Obrigatório')
          })}
          onSubmit={handleSubmit}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor='title' className='text-sm'>Título</label>
                <br/>
                <input
                  id='title'
                  type='text'
                  className="border p-1 w-96"
                  {...formik.getFieldProps('title')}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-xs text-red-600">{formik.errors.title}</div>
                ) : null}
              </div>
              <button
                type="button"
                className="p-2 bg-green-600 rounded text-white mt-2"
                onClick={() => { setOpenAlert(true) }}
              >
                Cadastrar
              </button>
              <Dialog open={openAlert} onClose={() => { setOpenAlert(false) }}>
                <div className='p-5'>
                  <p className='mb-5'>
                    Tem certeza que deseja criar o caixa
                    {' '}
                    <span className='font-bold'>{formik.values.title}</span>
                  </p>
                  <button
                    type="button"
                    className="p-2 bg-green-600 rounded text-white mr-2 w-24"
                    onClick={() => formik.handleSubmit()}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    className="p-2 bg-red-600 rounded text-white w-24"
                    onClick={() => { setOpenAlert(false) }}
                  >
                    Não
                  </button>
                </div>
              </Dialog>
            </form>
          )}
        </Formik>
        <h1 className='mt-5 font-bold text-lg'>Caixas</h1>
        <article className='mt-2 p-5 border flex flex-wrap'>
          {
            cashiers.map((cashier) => (
              <button
                type='button'
                key={cashier.id}
                className={cashier.id === cashierId ? `menuCashierActive` : `menuCashierInactive`}
                onClick={() => { setCashierId(cashier.id) }}
              >
                {cashier.title}
              </button>
            ))
          }
        </article>
        {cashierId && <ReceiptReport cashierId={cashierId} />}
      </section>
    </>
  )
}

export default CashierNew;
