import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../http";
import IInvoice from "../../interfaces/IInvoice";
import dayjs from "dayjs";
import ClientHeader from "../../components/ClientArea/ClientHeader";

function ClientInvoice() {
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
      <ClientHeader />
      <section className="p-5">
        <h1
          className="mb-5 font-bold text-xl"
        >
          Venda | { dayjs(invoice?.saleDate).format('DD/MM/YYYY H:mm') }
        </h1>
        <p>Caixa: <span className="font-bold">{ invoice?.cashier.title }</span></p>
        <article className="p-3 border mt-5">
          <p>Valor: <span className="font-bold text-green-700">{ Number(invoice?.value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }</span></p>
          <p>Data da venda: <span className="font-bold">{ dayjs(invoice?.saleDate).format('DD/MM/YYYY H:mm') }</span></p>
        </article>
        <article className="p-3 border mt-5">
          <p>Cliente: <span className="font-bold">{ invoice?.client.name }</span></p>
          <p>CPF: <span className="font-bold">{ invoice?.client.cpf }</span></p>
          <p>Telefone: <span className="font-bold">{ invoice?.client.cellPhone }</span></p>
          <p>Email: <span className="font-bold">{ invoice?.client.email }</span></p>
          <p>Filial: <span className="font-bold">{ invoice?.client.branch.title }</span></p>
          <p>Condição: <span className="font-bold">{ invoice?.client.level.title }</span></p>
        </article>
        <article className="p-3 border mt-5">
          <p>Vendedor: <span className="font-bold">{ invoice?.seller.name }</span></p>
          <p>Telefone: <span className="font-bold">{ invoice?.seller.cellPhone }</span></p>
          <p>Email: <span className="font-bold">{ invoice?.seller.email }</span></p>
          <p>Filial: <span className="font-bold">{ invoice?.seller.branch.title }</span></p>
          <p>Condição: <span className="font-bold">{ invoice?.seller.level.title }</span></p>
        </article>
      </section>
    </>
  )
}

export default ClientInvoice;
