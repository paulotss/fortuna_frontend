import React, { useState, ChangeEvent } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from '../http';
import IBranch from '../interfaces/IBranch';

interface IProps {
  title: string;
  entity: string;
  payload: { id: number; title: string };
  clientId?: number;
}

function SelectBranchEdit(props: IProps) {
  const { title, entity, payload, clientId } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(payload)
  const [branch, setBranch] = useState<IBranch[]>([])

  function handleChange({ target }: ChangeEvent<HTMLSelectElement>) {
    setEditValue({
      id: Number(target.value),
      title: branch.find((b) => b.id === Number(target.value))?.title || "???"
    });
  }

  async function handleClickEditButton() {
    setIsEditing(true);
    try {
      const {data}  = await axios.get('/branch')
      setBranch(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await axios.put('/client', {
      clientId,
      input: entity,
      value: editValue.id
    });
    setIsEditing(false)
  }

  return (
    <div className="min-w-[256px] p-2 rounded-lg border mr-2 mb-2">
      <p className="text-sm font-bold">{ title }</p>
      { isEditing
        ? <form>
            <select onChange={handleChange} className="p-2" defaultValue={editValue.id}>
              {
                branch.map((v) => (
                  <option
                    key={v.id}
                    value={v.id}
                  >
                    {v.title}
                  </option>
                ))
              }
            </select>
            <button type="submit" onClick={handleSubmit}>
              <CheckCircleIcon fontSize="small" />
            </button>
          </form>
        : <div>
            <span>{ editValue.title }</span>
            <button
              className="ml-2 cursor-pointer"
              onClick={handleClickEditButton}
            >
              <EditIcon fontSize="small" />
            </button>
          </div>
      }
    </div>
  )
}

export default SelectBranchEdit;