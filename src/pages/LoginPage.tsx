import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import axios from '../http';
import * as Yup from 'yup';
import { CircularProgress, Snackbar, Alert } from '@mui/material';
import logo from '../assets/logo.png'

interface IProps {
  endpoint: string;
  title: string;
  color: string;
  url: string;
}

interface LoginRequest {
  code: string;
  password: string;
}

const LoginSchema = Yup.object({
  code: Yup.string().required("Obrigatório"),
  password: Yup.string().required("Obrigatório")
})

function LoginPage (props: IProps) {
  const { endpoint, title, color, url } = props
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit (values: LoginRequest) {
    setIsLoading(true);
    try {
      const result = await axios.post(endpoint, values);
      sessionStorage.setItem('auth', result.data);
      navigate(url);
    } catch (error) {
      setOpenAlert(true);
    }
    setIsLoading(false);
  }

  return (
    <main className="flex items-center flex-col mt-5">
      <img src={logo} className='mb-5' />
      <h1 className={`font-bold text-${color}`}>{ title }</h1>
      <div className={`p-10 w-96 mt-2 border bg-[${color}]`}>
        <Formik
          initialValues={{
            code: "",
            password: ""
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="code" className="text-amber-600 font-bold">Inscrição</label>
                <br />
                <Field
                  id="code"
                  name="code"
                  className="border w-full p-1"
                />
                {errors.code && touched.code ? (
                  <div className="text-xs text-red-600">{errors.code}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="text-amber-600 font-bold">Senha</label>
                <br />
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="border w-full p-1"
                />
                {errors.password && touched.password ? (
                  <div className="text-xs text-red-600">{errors.password}</div>
                ) : null}
              </div>
              {
              isLoading
                ? <button
                    type='button'
                    className="p-2 bg-amber-600 rounded w-24 flex justify-center"
                  >
                    <CircularProgress
                      color='inherit'
                      size={24}
                    />
                  </button>
                : <button
                    type="submit"
                    className="p-2 bg-amber-600 rounded w-24"
                  >
                    Entrar
                  </button>
              }
            </Form>
          )}
        </Formik>
      </div>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => { setOpenAlert(false) }}>
        <Alert onClose={() => { setOpenAlert(false) }} severity="error" sx={{ width: '100%' }}>
          Verifique seus dados de login!
        </Alert>
      </Snackbar>
    </main>
  )
}

export default LoginPage;