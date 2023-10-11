import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../http"
import Header from "../components/Header";
import IClient from "../interfaces/IClient";
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ClientPage() {
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

  // function handleChange(event: ChangeEvent<HTMLInputElement>) {
  //   const { target } = event
  //   setClient({
  //     ...client,
  //     [target.name]: target.value 
  //   })
  // }

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
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function getClient() {
      try {
        const { data } = await axios.get(`/client/${id}`)
        setClient(data)
      } catch (error) {
        console.log(error)
      }
    }
    getClient()
  }, [id])

  return (
    <>
      <Header/>
      <section className="p-5 flex flex-wrap justify-between">
        <article className="flex flex-wrap w-1/2">
          <div className="w-full p-3">
            <div className="text-md">Inscrição</div>
            <div className="font-bold ml-1 text-2xl">{client?.code}</div>
          </div>
          <div className="border rounded p-3 w-fit flex items-end m-3">
            <div className="mr-3">
              <p className="font-bold">Nome</p>
              <p>{client?.name}</p>
            </div>
            <EditIcon/>
          </div>
          <div className="border rounded p-3 w-fit flex items-end m-3">
            <div className="mr-3">
              <p className="font-bold">Email</p>
              <p>{client?.email}</p>
            </div>
            <EditIcon/>
          </div>
          <div className="border rounded p-3 w-fit flex items-end m-3">
            <div className="mr-3">
              <p className="font-bold">Telefone</p>
              <p>{client?.cellPhone}</p>
            </div>
            <EditIcon/>
          </div>
          <div className="border rounded p-3 w-fit flex items-end m-3">
            <div className="mr-3">
              <p className="font-bold">Filial</p>
              <p>{client?.branch}</p>
            </div>
            <EditIcon/>
          </div>
          <div className="border rounded p-3 w-fit flex items-end m-3">
            <div className="mr-3">
              <p className="font-bold">Condição</p>
              <p>{client?.type}</p>
            </div>
            <EditIcon/>
          </div>
          <div className="border rounded p-3 w-fit flex items-end m-3">
            <div className="mr-3">
              <p className="font-bold">CPF</p>
              <p>{client?.cpf}</p>
            </div>
            <EditIcon/>
          </div>
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
            </div>
          </div>
        </article>
      </section>
    </>
  )
}

export default ClientPage;