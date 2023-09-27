import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import axios from '../http';
import * as Yup from 'yup';

interface LoginRequest {
  code: string;
  password: string;
}

const LoginSchema = Yup.object({
  code: Yup.string().required("Obrigatório"),
  password: Yup.string().required("Obrigatório")
})

function LoginPage () {
  const navigate = useNavigate();

  async function handleSubmit (values: LoginRequest) {
    try {
      const result = await axios.post('/seller/login', values);
      sessionStorage.setItem('auth', result.data);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="flex items-center flex-col mt-5">
      <h1 className="text-xl font-bold text-yellow-600">Login</h1>
      <div className="p-5 w-96 mt-2 rounded bg-slate-100">
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
                <label htmlFor="code">Inscrição</label>
                <br />
                <Field
                  id="code"
                  name="code"
                  className="border w-full p-1"
                />
                {errors.code && touched.code ? (
                  <div className="text-xs">{errors.code}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="password">Senha</label>
                <br />
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="border w-full p-1"
                />
                {errors.password && touched.password ? (
                  <div className="text-xs">{errors.password}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="p-2 bg-yellow-600 rounded w-24"
              >
                Entrar
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  )
}

export default LoginPage;