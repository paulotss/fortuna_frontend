import React, { useState, ChangeEvent } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from '../http';

interface IProps {
  title: string;
  entity: string;
  valueInput: string | number;
  clientId?: number
}

const InputEdit = (props: IProps) => {
  const { title, entity, valueInput, clientId } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(valueInput)

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setEditValue(target.value);
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axios.put('/client', {
      clientId,
      input: entity,
      value: editValue
    });
    setIsEditing(false)
  }

  return (
    <div className="min-w-[256px] p-2 rounded-lg border mr-2 mb-2">
      <p className="text-sm font-bold">{ title }</p>
      { isEditing
        ? <form>
            <input
              type="text"
              value={editValue}
              onChange={handleChange}
              className="p-2 mr-2"
            />
            <button type="submit" onClick={handleSubmit}>
              <CheckCircleIcon fontSize="small" />
            </button>
          </form>
        : <div>
            <span>{ editValue }</span>
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