import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import axios from '../../http';
import * as Yup from 'yup';
import ManagerHeader from "../../components/ManagerArea/ManagerHeader";

interface IProductCreateRequest {
  title: string;
  price: number;
  amount: number;
  barCode: string
}

const initialValues: IProductCreateRequest = {
  title: "",
  price: 0,
  amount: 0,
  barCode: "123456789"
}

const ProductSchema = Yup.object({
  title: Yup.string().required("Obrigatório"),
  price: Yup.string().matches(/^[^0|\D]\d{0,9}(\.\d{1,2})?$/, "Somente números decimais com ponto: 00.00").required("Obrigatório"),
})

function ProductNew() {
  const navigate = useNavigate()

  async function handleSubmit(values: IProductCreateRequest) {
    try {
      const { data } = await axios.post('/product', values);
      console.log(data);
      navigate('/products');
    } catch (error) {
      console.log(error);
    }
    console.log(values)
  }

  return (
    <>
      <ManagerHeader/>
      <section className="p-5">
        <h1 className="font-bold text-lg mb-5">Novo produto</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={ProductSchema}
          onSubmit={handleSubmit}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-2">
                <label htmlFor="title" className="text-sm">Nome</label>
                <br/>
                <input
                  id="title"
                  type="text"
                  className="border p-1 w-96"
                  {...formik.getFieldProps('title')}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-xs text-red-600">{formik.errors.title}</div>
                ) : null}
              </div>
              <div className="mb-2">
                <label htmlFor="price" className="text-sm">Preço</label>
                <br/>
                <input
                  id="price"
                  type="text"
                  className="border p-1 w-20"
                  {...formik.getFieldProps('price')}
                />
                {formik.touched.price && formik.errors.price ? (
                  <div className="text-xs text-red-600">{formik.errors.price}</div>
                ) : null}
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

export default ProductNew;
