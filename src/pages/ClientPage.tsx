import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../http"
import Header from "../components/Header";
import IClient from "../interfaces/IClient";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InputEdit from "../components/InputEdit";

function ClientPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [inputBalance, setInputBalance] = useState<number>(0)
  const [client, setClient] = useState<IClient>({
    name: "",
    code: "",
    cellPhone: "",
    email: "",
    branch: "",
    type: "",
    cpf: "",
    balance: 0
  })
  const { id } = useParams()

  function handleChangeBalanceInput(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event
    const newInputBalance = Number(target.value)
    setInputBalance(newInputBalance)
  }

  async function handleClickSubmitBalance() {
    try {
      await axios.put('/client', {
        clientId: Number(id),
        input: 'balance',
        value: Number(client.balance) + inputBalance
      })
      setClient({
        ...client,
        balance: Number(client.balance) + inputBalance
      })
      setInputBalance(0)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function getClient() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/client/${id}`)
        setClient(data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    }
    getClient()
  }, [id])

  return (
    <>
      <Header/>
      {
        isLoading
          ? <p>Loading...</p>
          : <section className="p-5 flex flex-wrap justify-between">
              <article className="flex flex-wrap w-1/2">
                <div className="w-full p-3">
                  <div className="text-md">Inscrição</div>
                  <div className="font-bold ml-1 text-2xl">{client?.code}</div>
                </div>
                <InputEdit
                  title="Nome"
                  valueInput={client.name}
                  entity="name"
                  clientId={client.id}
                />
                <InputEdit
                  title="Email"
                  valueInput={client.email}
                  entity="email"
                  clientId={client.id}
                />
                <InputEdit
                  title="Telefone"
                  valueInput={client.cellPhone}
                  entity="cellPhone"
                  clientId={client.id}
                />
                <InputEdit
                  title="Filial"
                  valueInput={client.branch}
                  entity="branch"
                  clientId={client.id}
                />
                <InputEdit
                  title="Condição"
                  valueInput={client.type}
                  entity="type"
                  clientId={client.id}
                />
                <InputEdit
                  title="CPF"
                  valueInput={client.cpf}
                  entity="cpf"
                  clientId={client.id}
                />
              </article>
              <article className="w-1/2">
                <div className="border rounded p-3 flex items-end m-3">
                  <div className="mr-3">
                    <p className="font-bold text-xl">Saldo</p>
                    <p className="text-2xl mb-3 text-green-600 font-bold">
                      {Number(client?.balance).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </p>
                    <div className="border p-3 bg-gray-100">
                      <input
                        type="text"
                        className="border rounded mr-2 w-24 p-2"
                        value={inputBalance}
                        onChange={handleChangeBalanceInput}
                      />
                      <button
                        type="button"
                        className="p-2 bg-green-600 rounded text-white"
                        onClick={handleClickSubmitBalance}
                      >
                        Adicionar <span><CheckCircleIcon/></span>
                      </button>
                    </div>
                    <p className="mt-3">Total:
                      {` `}
                      <span className="font-bold">
                        { inputBalance.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            </section>
      }
    </>
  )
}

export default ClientPage;