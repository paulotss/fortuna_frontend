import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../http"
import Header from "../components/Header";
import IClient from "../interfaces/IClient";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InputEdit from "../components/InputEdit";
import SelectBranchLevelEdit from "../components/SelectBranchLevelEdit";
import { Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { Dialog } from "@mui/material";

interface IAccess {
  isSeller?: boolean;
  isManager?: boolean;
  message?: string;
}

function ClientPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [access, setAccess] = useState<IAccess>({ isManager: false, isSeller: true })
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
    })
    setOpenAlertAccess(true)
  }

  async function handleSubmitBalance(values: {balance: string}, actions: FormikHelpers<{balance: string}>) {
    try {
      const newBalance = Number(client.balance) + Number(values.balance)
      await axios.put('/client', {
        itemId: Number(id),
        input: 'balance',
        value: newBalance
      })
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
                            onClick={() => { handleOpenAlert('Vendedor') }}
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
              <article className="w-1/2">
                <div className="border rounded p-3 flex items-end m-3">
                  <div className="mr-3">
                    <p className="font-bold text-xl">Saldo</p>
                    <p className="text-2xl mb-3 text-green-600 font-bold">
                      {Number(client?.balance).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </p>
                    <Formik
                      initialValues={{ balance: "0" }}
                      validationSchema={Yup.object({
                        balance: Yup.string()
                          .matches(/^[^0|\D]\d{0,9}(\.\d{1,2})?$/, "Somente números decimais com ponto: 00.00")
                          .required("Obrigatório")
                      })}
                      onSubmit={handleSubmitBalance}
                      enableReinitialize
                    >
                      {formik => (
                        <>
                          <form
                            onSubmit={formik.handleSubmit}
                            className="border p-3 bg-gray-100"
                          >
                            <input
                              id="balance"
                              type="text"
                              className="border rounded mr-2 w-24 p-2"
                              {...formik.getFieldProps('balance')}
                            />
                            <button
                              type="submit"
                              className="p-2 bg-green-600 rounded text-white"
                            >
                              Adicionar <span><CheckCircleIcon/></span>
                            </button>
                            {formik.touched.balance && formik.errors.balance ? (
                              <div className="text-xs text-red-600">{formik.errors.balance}</div>
                            ) : null}
                          </form>
                          <p className="mt-3">Total:
                            {` `}
                            <span className="font-bold">
                              { (Number(formik.values.balance) + Number(client.balance))
                                  .toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                            </span>
                          </p>
                        </>
                      )}
                    </Formik>
                  </div>
                </div>
              </article>
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
                      onClick={() => setOpenAlertAccess(false)}
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
      }
    </>
  )
}

export default ClientPage;