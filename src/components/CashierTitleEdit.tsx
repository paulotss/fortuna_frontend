import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from '../http';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
  cashierId: number;
  payload: string;
}

interface IFormCashier {
  title: string;
}

const cashierSchema = Yup.object({
  title: Yup.string().required('Obrigatório')
})

function CashierTitleEdit(props: IProps) {
  const { payload, cashierId } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(payload);

  async function handleSubmit(values: IFormCashier) {
    try {
      await axios.put('/cashier', {
        id: cashierId,
        title: values.title
      });
      setEditValue(values.title);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setEditValue(payload);
  }, [payload])

  return (
    <div className='mt-4 p-2'>
      {
        isEditing
        ? <Formik
            initialValues={{ title: payload }}
            validationSchema={cashierSchema}
            onSubmit={handleSubmit}
          >
            {formik => (
              <form
                onSubmit={formik.handleSubmit}
                className='flex justify-center'
              >
                <input
                  id='title'
                  type='text'
                  className='p-1 border font-bold text-amber-600 text-2xl w-48'
                  { ...formik.getFieldProps('title') }
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-xs text-red-600">{formik.errors.title}</div>
                ) : null}
                <button
                  type='submit'
                  className='p-2 bg-amber-600 text-white rounded'
                >
                  <CheckCircleIcon/>
                </button>
              </form>
            )}
          </Formik>
        : <div className='flex justify-center items-center'>
            <h1
              className='text-center text-2xl font-bold text-amber-600 w-fit'
            >
              { editValue }
            </h1>
            <button
              type='button'
              className='text-white p-1 bg-amber-600 ml-2 rounded'
              onClick={() => { setIsEditing(true) }}
            >
              <EditIcon />
            </button>
          </div>
      }
    </div>
  )
}

export default CashierTitleEdit;
