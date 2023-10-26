import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Header from "../components/Header";
import axios from "../http";
import IBranch from "../interfaces/IBranch";
import ILevel from "../interfaces/ILevel";

interface IClientCreateRequest {
  name: string;
  email: string;
  cellPhone: string;
  cpf: string;
  branchId: string | number;
  levelId: string | number;
}

const initialValues: IClientCreateRequest = {
  name: "",
  email: "",
  cellPhone: "",
  cpf: "",
  branchId: "1",
  levelId: "1"
}

function ClientNew () {
  const [branchs, setBranchs] = useState<IBranch[]>([]);
  const [levels, setLevels] = useState<ILevel[]>([]);
  const navigate = useNavigate();

  async function handleSubmit(values: IClientCreateRequest) {
    values.branchId = Number(values.branchId);
    values.levelId = Number(values.levelId);
    try {
      await axios.post('/client', values);
      navigate('/clients')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function getBranchsAndLevels() {
      try {
        const branchsResult = await axios.get('/branch')
        setBranchs(branchsResult.data);
        const levelsResult = await axios.get('/level')
        setLevels(levelsResult.data);
      } catch (error) {
        console.log(error);
      }
    }
    getBranchsAndLevels()
  })

  return (
    <>
      <Header/>
      <section className="p-5">
        <h1 className="font-bold text-lg mb-5">Novo cliente</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-2">
                <label htmlFor="name" className="text-sm">Nome</label>
                <br/>
                <input
                  id="name"
                  type="text"
                  className="border p-1 w-96"
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="text-sm">Email</label>
                <br/>
                <input
                  id="email"
                  type="text"
                  className="border p-1 w-96"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="mb-2">
                <label htmlFor="cellPhone" className="text-sm">Celular</label>
                <br/>
                <input
                  id="cellPhone"
                  type="text"
                  className="border p-1 w-96"
                  {...formik.getFieldProps('cellPhone')}
                />
                {formik.touched.cellPhone && formik.errors.cellPhone ? (
                  <div>{formik.errors.cellPhone}</div>
                ) : null}
              </div>
              <div className="mb-2">
                <label htmlFor="cpf" className="text-sm">CPF</label>
                <br/>
                <input
                  id="cpf"
                  type="text"
                  className="border p-1 w-96"
                  {...formik.getFieldProps('cpf')}
                />
                {formik.touched.cpf && formik.errors.cpf ? (
                  <div>{formik.errors.cpf}</div>
                ) : null}
              </div>
              <div className="mb-2">
                <label htmlFor="branchId" className="text-sm">Filial</label>
                <br/>
                <select
                  id="branchId"
                  className="p-2"
                  {...formik.getFieldProps('branchId')}
                >
                  {
                    branchs.map((branch) => (
                      <option
                        key={branch.id}
                        value={branch.id}
                      >
                        { branch.title }
                      </option>
                    ))
                  }
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="levelId" className="text-sm">Nível</label>
                <br/>
                <select
                  id="levelId"
                  className="p-2"
                  {...formik.getFieldProps('levelId')}
                >
                  {
                    levels.map((level) => (
                      <option
                        key={level.id}
                        value={level.id}
                      >
                        { level.title }
                      </option>
                    ))
                  }
                </select>
              </div>
              <button
                type="submit"
                className="p-2 bg-green-600 rounded text-white mt-2"
              >
                Cadastrar
              </button>
            </form>
          )}
        </Formik>
      </section>
    </>
  )
}

export default ClientNew;