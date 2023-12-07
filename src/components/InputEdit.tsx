import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from '../http';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface IProps {
  title: string;
  entity: string;
  valueInput: string | number;
  endPoint: string;
  tstyle?: string;
  itemId?: number
  validation: Yup.ObjectSchema<Yup.AnyObject>
}

interface IFormValues {
  generic: string | number;
}

const InputEdit = (props: IProps) => {
  const { title, entity, valueInput, endPoint, itemId, tstyle, validation } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(valueInput);

  const handleSubmit = async (values: IFormValues) => {
    try {
      const auth = sessionStorage.getItem('auth');
      await axios.put(endPoint, {
        itemId,
        input: entity,
        value: values.generic
      }, { headers: { 'authorization': auth } });
      setEditValue(values.generic);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-w-[256px] p-2 rounded-lg border mr-2 mb-2">
      <p className="text-sm font-bold">{ title }</p>
      { isEditing
        ? <Formik
            initialValues={{ generic: editValue }}
            validationSchema={validation}
            onSubmit={handleSubmit}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit}>
                <input
                  id='generic'
                  type="text"
                  className={`p-2 mr-2 border ${ tstyle }`}
                  {...formik.getFieldProps('generic')}
                />
                <button type="submit">
                  <CheckCircleIcon fontSize="small" />
                </button>
                {formik.touched.generic && formik.errors.generic ? (
                  <div className="text-xs text-red-600">{formik.errors.generic}</div>
                ) : null}
              </form>
            )}
          </Formik>
        : <div>
            <span>
              {
                entity !== 'price'
                  ? editValue
                  : Number(editValue)
                      .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) 
              }
            </span>
            <button
              className="ml-2 cursor-pointer"
              onClick={() => { setIsEditing(true) }}
            >
              <EditIcon fontSize="small" />
            </button>
          </div>
      }
    </div>
  )
}

export default InputEdit;