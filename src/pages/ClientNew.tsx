import { Formik } from "formik";
import Header from "../components/Header";

function ClientNew () {
  return (
    <>
      <Header/>
      <section className="p-5">
        <h1 className="font-bold text-lg mb-5">Novo cliente</h1>
        <Formik
          initialValues={{
            name: ""
          }}
          onSubmit={() =>console.log('teste') }
        >
          {formik => (
            <div>
              <label htmlFor="name">Nome</label>
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
          )}
        </Formik>
      </section>
    </>
  )
}

export default ClientNew;