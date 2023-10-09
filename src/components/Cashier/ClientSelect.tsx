import { useEffect, useState } from "react";
import axios from "../../http"
import IClient from "../../interfaces/IClient";

interface IProps {
  handleClickSelectClient(client: IClient): void;
}

function ClientSelect(props: IProps) {
  const { handleClickSelectClient } = props;
  const [clients, setClients] = useState<IClient[]>([])

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
        <input type="text" className="p-1 border rounded w-96" />
      </div>
      <div>
        {
          clients.map((client) => (
            <div
              key={client.id}
              className="flex justify-between mt-1 p-2 bg-yellow-200 rounded items-center cursor-pointer"
              onClick={() => {handleClickSelectClient(client)}}
            >
              <div>{client.name}</div>
              <div>{client.cpf}</div>
              <div>{client.balance}</div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default ClientSelect;
