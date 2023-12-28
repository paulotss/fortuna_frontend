import { useState, useEffect } from "react";
// import ClientHeader from "../../components/ClientArea/ClientHeader";
import NewClientHeader from "../../components/ClientArea/NewClientHeader";
import IClient from "../../interfaces/IClient";
import axios from "../../http";
import ReactBarcode from "react-jsbarcode";

function ClientProfile() {
  const [client, setClient] = useState<IClient>();

  useEffect(() => {
    async function getClient() {
      try {
        const { data: { payload: { id } } } = await axios.post('/seller/verify', {
          token: sessionStorage.getItem('auth')
        });
        const auth = sessionStorage.getItem('auth');
        const clientResult = await axios.get(`/client/${id}`, { headers: { 'authorization': auth } });
        setClient(clientResult.data);
      } catch (error) {
        console.log(error);
      }
    }
    getClient();
  }, []);

  return (
    <>
      {/* <ClientHeader/> */}
      <NewClientHeader/>
      <section className="p-5 mt-24">
        <h1 className="mb-5 font-bold text-xl">{client?.name}</h1>
        <article className="p-3 border mt-5">
          <p>CPF: <span className="font-bold">{ client?.cpf }</span></p>
          <p>Telefone: <span className="font-bold">{ client?.cellPhone }</span></p>
          <p>Email: <span className="font-bold">{ client?.email }</span></p>
          <p>Filial: <span className="font-bold">{ client?.branch?.title }</span></p>
          <p>Condição: <span className="font-bold">{ client?.level?.title }</span></p>
        </article>
        {
          client && <ReactBarcode value={client.cpf} />
        }
      </section>
    </>
  )
}

export default ClientProfile
