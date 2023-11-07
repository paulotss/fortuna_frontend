import { ChangeEvent, useEffect, useState } from "react";
import axios from "../../http"
import IClient from "../../interfaces/IClient";

interface IProps {
  handleClickSelectClient(client: IClient): void;
}

function ClientSelect(props: IProps) {
  const { handleClickSelectClient } = props;
  const [clients, setClients] = useState<IClient[]>([]);

  async function handleChangeSearch(event: ChangeEvent<HTMLInputElement>) {
    try {
      const { target } = event;
      const { data } = await axios.get(`/clients/search/?name=${target.value}`);
      setClients(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getClients() {
      try {
        const { data } = await axios.get('/clients')
        setClients(data)
      } catch (error) {
        console.log(error)
      }
    }
    getClients()
  }, [])

  return (
    <section className="p-5">
      <div className="p-1 flex flex-col justify-center items-center">
        <h1 className="font-bold text-lg">Selecione um cliente</h1>
        <input type="text" className="p-1 border rounded w-96" onChange={handleChangeSearch} />
      </div>
      <div>
        <div className="grid grid-cols-4 gap-4 mt-1 p-2">
          <div className="text-sm">Código</div>
          <div className="text-sm">Nome</div>
          <div className="text-sm">CPF</div>
          <div className="text-sm">Crédito</div>
        </div>
        {
          clients.map((client) => (
            <div
              key={client.id}
              className="grid grid-cols-4 gap-4 mb-1 p-2 bg-amber-200 cursor-pointer"
              onClick={() => {handleClickSelectClient(client)}}
            >
              <div>{client.code}</div>
              <div>{client.name}</div>
              <div>{client.cpf}</div>
              <div className="font-bold">
                {
                  Number(client.balance)
                    .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                }
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default ClientSelect;
