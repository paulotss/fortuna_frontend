import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../http"
import IClient from "../../interfaces/IClient";
import InputEdit from "../../components/InputEdit";
import SelectBranchLevelEdit from "../../components/SelectBranchLevelEdit";
import { FormikHelpers } from "formik";
import * as Yup from 'yup';
import { Dialog } from "@mui/material";
import ManagerHeader from "../../components/ManagerArea/ManagerHeader";
import BalanceChange from "../../components/BalanceChange";
import IBalanceChangeForm from "../../interfaces/IBalanceChangeForm";
import ClientExtract from "../../components/ClientExtract";

interface IAccess {
  isSeller?: boolean;
  isManager?: boolean;
  message?: string;
}

function ClientPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [access, setAccess] = useState<IAccess>({ isManager: false, isSeller: false })
  const [openAlertAccess, setOpenAlertAccess] = useState(false)
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

  function handleOpenAlert(message: string) {
    setAccess({
      ...access,
      message
    });
    setOpenAlertAccess(true);
  }

  async function handleSubmitAccess() {
    try {
      const auth = sessionStorage.getItem('auth');
      if(access.message === 'Vendedor') {
        await axios.post('/seller', {userId: client.userId}, { headers: { 'authorization': auth } });
        setAccess((prevState) => ({...prevState, isSeller: true}));
      } else {
        await axios.post('/manager', {userId: client.userId}, { headers: { 'authorization': auth } });
        setAccess((prevState) => ({...prevState, isManager: true}));
      }
      setOpenAlertAccess(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmitBalance(values: IBalanceChangeForm, actions: FormikHelpers<IBalanceChangeForm>) {
    try {
      const auth = sessionStorage.getItem('auth');
      let newBalance: number = 0;
      if (values.action === "1") {
        newBalance = Number(client.balance) - Number(values.balance);
      } else {
        newBalance = Number(client.balance) + Number(values.balance);
      }
      await axios.put('/client', {
        itemId: Number(id),
        input: 'balance',
        value: newBalance
      }, { headers: { 'authorization': auth } });
      await axios.post('receipt', {
        amount: values.action === "1" ? -Number(values.balance) : Number(values.balance),
        clientId: Number(id),
        methodId: Number(values.method)
      }, { headers: { 'authorization': auth } })
      setClient({
        ...client,
        balance: newBalance
      })
      actions.resetForm();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function getClient() {
      setIsLoading(true);
      try {
        const auth = sessionStorage.getItem('auth');
        const client = await axios.get(`/client/${id}`, { headers: { 'authorization': auth } });
        const seller = await axios.get(`/seller/${client.data.userId}`, { headers: { 'authorization': auth } });
        const manager = await axios.get(`/manager/${client.data.userId}`, { headers: { 'authorization': auth } });
        if (seller.data !== null) setAccess((prevState) => ({...prevState, isSeller: true}));
        if (manager.data !== null) setAccess((prevState) => ({...prevState, isManager: true}));
        setClient(client.data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    }
    getClient()
  }, [id])

  return (
    <>
      <ManagerHeader/>
      {
        isLoading
          ? <p>Loading...</p>
          : <>
              <section className="p-5 flex flex-wrap justify-between">
                <article className="flex flex-wrap w-1/2">
                  <div className="w-full p-3 flex">
                    <div>
                      <div className="text-md">Inscrição</div>
                      <div className="font-bold ml-1 text-2xl">{client?.code}</div>
                    </div>
                    <div className="ml-5 flex h-fit">
                      {
                        access.isSeller
                          ? <div
                              className="mr-1 p-1 bg-green-600 text-xs text-white rounded-full"
                            >
                              Vendedor
                            </div>
                          : <button
                              type="button"
                              onClick={() => { handleOpenAlert('Vendedor') }}
                              className="mr-1 p-1 bg-gray-500 text-xs text-white rounded-full"
                            >
                              Vendedor
                            </button>
                      }
                      {
                        access.isManager
                          ? <div
                              className="mr-1 p-1 bg-green-600 text-xs text-white rounded-full"
                            >
                              Gerente
                            </div>
                          : <button
                              type="button"
                              onClick={() => { handleOpenAlert('Gerente') }}
                              className="mr-1 p-1 bg-gray-500 text-xs text-white rounded-full"
                            >
                              Gerente
                            </button>
                      }
                    </div>
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
                <BalanceChange balance={client.balance} handleSubmitBalance={handleSubmitBalance} />
                <Dialog
                  open={openAlertAccess}
                  onClose={() => {setOpenAlertAccess}}
                >
                  <div className='p-5'>
                    <p className='mb-5'>
                      Tem certeza que quer dar acesso de
                      <span className='font-bold'> {access.message}</span> para
                      <span className='font-bold'> {client.name}</span>?
                    </p>
                    <div>
                      <button
                        type='button'
                        onClick={handleSubmitAccess}
                        className='p-2 bg-green-600 mr-2'
                      >
                        Confirmar
                      </button>
                      <button
                        type='button'
                        onClick={() => setOpenAlertAccess(false)}
                        className='p-2 bg-red-600'
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </Dialog>
              </section>
              <ClientExtract clientId={client.id} clientName={client.name} route='/manager/invoice/' />
            </>
      }
    </>
  )
}

export default ClientPage;