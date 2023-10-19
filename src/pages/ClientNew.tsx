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
            name: "",
            email: ""
          }}
          onSubmit={() =>console.log('teste') }
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
                <label htmlFor="name" className="text-sm">Email</label>
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
            </form>
          )}
        </Formik>
      </section>
    </>
  )
}

export default ClientNew;