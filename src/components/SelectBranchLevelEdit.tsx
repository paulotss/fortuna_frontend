import React, { useState, ChangeEvent } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from '../http';
import IBranch from '../interfaces/IBranch';
import ILevel from '../interfaces/ILevel';

interface IProps {
  title: string;
  entity: string;
  payload?: { id: number; title: string };
  itemId?: number;
  endPoint: string;
}

function SelectBranchLevelEdit(props: IProps) {
  const { title, entity, payload, itemId, endPoint } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(payload || {id: 0, title: ""})
  const [items, setItems] = useState<IBranch[] | ILevel[]>([])

  function handleChange({ target }: ChangeEvent<HTMLSelectElement>) {
    setEditValue({
      id: Number(target.value),
      title: items.find((b) => b.id === Number(target.value))?.title || "???"
    });
  }

  async function handleClickEditButton() {
    setIsEditing(true);
    try {
      const {data}  = await axios.get(endPoint)
      setItems(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      await axios.put('/client', {
        itemId,
        input: entity,
        value: editValue.id
      });
      setIsEditing(false)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-w-[256px] p-2 rounded-lg border mr-2 mb-2">
      <p className="text-sm font-bold">{ title }</p>
      { isEditing
        ? <form>
            <select onChange={handleChange} className="p-2" defaultValue={editValue.id}>
              {
                items.map((v) => (
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

export default SelectBranchLevelEdit;