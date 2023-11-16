import Header from '../components/Header';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from '../http';
import { useNavigate } from 'react-router-dom';

interface IFormCashier {
  title: string
}

const initialValues: IFormCashier = {
  title: ""
}

function CashierNew() {
  const navigate = useNavigate();

  async function handleSubmit(values: IFormCashier) {
    try {
      await axios.post('/cashier', values);
      navigate('/cashier');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header/>
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
                type="submit"
                className="p-2 bg-green-600 rounded text-white mt-2"
              >
                Cadastrar
              </button>
            </form>
          )}
        </Formik>
      </section>
    </>
  )
}

export default CashierNew;
