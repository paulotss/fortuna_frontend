import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../http";
import Header from "../components/Header";
import IInvoice from "../interfaces/IInvoice";

function InvoicePage () {
  const [invoice, setInvoice] = useState<IInvoice>()
  const { id } = useParams()

  useEffect(() => {
    async function getInvoice() {
      const { data } = await axios.get(`/invoice/${id}`);
      setInvoice(data)
    }
    getInvoice()
  }, [id])
  return (
    <>
      <Header/>
      <section className="p-5">
        <h1
          className="mb-5 font-bold text-xl"
        >
          Venda | { invoice?.saleDate }
        </h1>
        <p>Caixa: <span className="font-bold">{ invoice?.cashier.title }</span></p>
        <article className="p-3 border mt-5">
          <p>Valor: <span className="font-bold">{ invoice?.value }</span></p>
          <p>Data da venda: <span className="font-bold">{ invoice?.saleDate }</span></p>
        </article>
        <article className="p-3 border mt-5">
          <p>Cliente: <span className="font-bold">{ invoice?.client.name }</span></p>
          <p>CPF: <span className="font-bold">{ invoice?.client.cpf }</span></p>
          <p>Telefone: <span className="font-bold">{ invoice?.client.cellPhone }</span></p>
          <p>Email: <span className="font-bold">{ invoice?.client.email }</span></p>
          <p>Filial: <span className="font-bold">{ invoice?.client.branch }</span></p>
          <p>Condição: <span className="font-bold">{ invoice?.client.type }</span></p>
        </article>
        <article className="p-3 border mt-5">
          <p>Vendedor: <span className="font-bold">{ invoice?.seller.name }</span></p>
          <p>Telefone: <span className="font-bold">{ invoice?.seller.cellPhone }</span></p>
          <p>Email: <span className="font-bold">{ invoice?.seller.email }</span></p>
          <p>Filial: <span className="font-bold">{ invoice?.seller.branch }</span></p>
          <p>Condição: <span className="font-bold">{ invoice?.seller.type }</span></p>
        </article>
      </section>
    </>
  )
}

export default InvoicePage;