import { useEffect, useState } from 'react';
import { Formik, FormikHelpers, Field } from 'formik';
import * as Yup from 'yup';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import axios from '../http';
import IMethod from '../interfaces/IMethod';
import IBalanceChangeForm from '../interfaces/IBalanceChangeForm';

interface IProps {
  balance: number
  handleSubmitBalance(values: IBalanceChangeForm, actions: FormikHelpers<IBalanceChangeForm>): Promise<void>
}

function BalanceChange(props: IProps) {
  const { balance, handleSubmitBalance } = props;
  const [methods, setMethods] = useState<IMethod[]>([]);

  useEffect(() => {
    async function getMethods() {
      try {
        const auth = sessionStorage.getItem('auth');
        const { data } = await axios.get('/method', { headers: { 'authorization': auth } });
        setMethods(data);
      } catch (error) {
        console.log(error);
      }
    }
    getMethods()
  }, [])

  return (
    <article className="w-1/2">
      <div className="border rounded p-3 flex items-end m-3">
        <div className="mr-3">
          <p className="font-bold text-xl">Saldo</p>
          <p className="text-2xl mb-3 text-green-600 font-bold">
            {Number(balance).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
          </p>
          <Formik
            initialValues={{ balance: "0", method: 0, action: "0" }}
            validationSchema={Yup.object({
              balance: Yup.string()
                .matches(/^[^0|\D]\d{0,9}(\.\d{1,2})?$/, "Somente números decimais com ponto: 00.00")
                .required("Obrigatório"),
              method: Yup.number().min(1, "Obrigatório").required(),
            })}
            onSubmit={handleSubmitBalance}
            enableReinitialize
          >
            {formik => (
              <div>
                <form
                  onSubmit={formik.handleSubmit}
                  className="border p-3 bg-gray-100"
                >
                  <div className='flex mb-2'>
                    <div className='mr-2'>
                      <Field
                        type="radio"
                        id="add"
                        name="action"
                        value="0"
                      />
                      {' '}
                      <label htmlFor="add" className="text-green-600 font-bold">Adicionar</label>
                    </div>
                    <div>
                      <Field
                        type="radio"
                        id="rm"
                        name="action"
                        value="1"
                      />
                      {' '}
                      <label htmlFor="rm" className="text-red-600 font-bold">Retirar</label>
                    </div>
                  </div>
                  <input
                    id="balance"
                    type="text"
                    className="border rounded mr-2 w-24 p-2"
                    {...formik.getFieldProps('balance')}
                  />
                  {formik.values.action === "0"
                    ? <button
                        type="submit"
                        className="p-2 bg-green-600 rounded text-white"
                      >
                        Adicionar <span><CheckCircleIcon/></span>
                      </button>
                    : <button
                        type="submit"
                        className="p-2 bg-red-600 rounded text-white"
                      >
                        Remover <span><RemoveCircleIcon/></span>
                      </button>
                  }
                  {formik.touched.balance && formik.errors.balance ? (
                    <div className="text-xs text-red-600">{formik.errors.balance}</div>
                  ) : null}
                  <div className='mt-2'>
                    <label htmlFor='method' className='text-sm italic w-36'>Forma de pagamento</label>
                    <br/>
                    <select
                      id='method'
                      className='p-2 w-36 border'
                      {...formik.getFieldProps('method')}
                    >
                      <option value={0} className='italic'>Selecione</option>
                      {
                        methods.map((method) => (
                          <option key={method.id} value={method.id}>{method.title}</option>
                        ))
                      }
                    </select>
                    {formik.touched.method && formik.errors.method ? (
                      <div className="text-xs text-red-600">{formik.errors.method}</div>
                    ) : null}
                  </div>
                </form>
                <p className="mt-3">Total:
                  {` `}
                  <span className="font-bold">
                    { formik.values.action === "0"
                        ? (Number(formik.values.balance) + Number(balance))
                            .toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                        : (Number(balance) - Number(formik.values.balance))
                            .toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                    }
                    
                    
                  </span>
                </p>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </article>
  )
}

export default BalanceChange;
