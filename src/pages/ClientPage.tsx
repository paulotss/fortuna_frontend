import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../http"
import Header from "../components/Header";
import IClient from "../interfaces/IClient";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InputEdit from "../components/InputEdit";
import SelectBranchLevelEdit from "../components/SelectBranchLevelEdit";
import * as Yup from 'yup';

function ClientPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [inputBalance, setInputBalance] = useState<number>(0)
  const [client, setClient] = useState<IClient>({
    name: "",
    code: "",
    cellPhone: "",
    email: "",
    cpf: "",
    balance: 0,
    branch: { id: 1, title: "" },
    level: { id: 1, title: "", acronym: "" }
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
        itemId: Number(id),
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
                  endPoint="/client"
                  itemId={client.id}
                  validation={Yup.object({ generic: Yup.string().required("Obrigatório") })}
                />
                <InputEdit
                  title="Email"
                  valueInput={client.email}
                  entity="email"
                  endPoint="/client"
                  itemId={client.id}
                  validation={Yup.object({
                    generic: Yup.string().email("Email inválido").required("Obrigatório")
                  })}
                />
                <InputEdit
                  title="Telefone"
                  valueInput={client.cellPhone}
                  entity="cellPhone"
                  endPoint="/client"
                  itemId={client.id}
                  validation={Yup.object({
                    generic: Yup.string().min(10, "Número com DDD").max(13, "Número com DDD").matches(/^[0-9]+$/, "Somente números").required("Obrigatório")
                  })}
                />
                <SelectBranchLevelEdit
                  title="Filial"
                  payload={client.branch}
                  entity="branchId"
                  itemId={client.id}
                  endPoint="/branch"
                />
                <SelectBranchLevelEdit
                  title="Nível"
                  payload={client.level}
                  entity="levelId"
                  itemId={client.id}
                  endPoint="/level"
                />
                <InputEdit
                  title="CPF"
                  valueInput={client.cpf}
                  entity="cpf"
                  endPoint="/client"
                  itemId={client.id}
                  validation={Yup.object({
                    generic: Yup.string().max(11, "CPF inválido").matches(/(\d{3})(\d{3})(\d{3})(\d{2})/, "CPF inválido").required("Obrigatório")
                  })}
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