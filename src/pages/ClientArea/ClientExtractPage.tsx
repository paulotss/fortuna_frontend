import { useState, useEffect } from "react";
import ClientHeader from "../../components/ClientArea/ClientHeader";
import axios from "../../http"
import IClient from "../../interfaces/IClient";
import ClientExtract from "../../components/ClientExtract";

function ClientExtractPage() {
  const [client, setClient] = useState<IClient>()

  useEffect(() => {
    async function getInvoices() {
      try {
        const { data: { payload: { id } } } = await axios.post('/seller/verify', {
          token: sessionStorage.getItem('auth')
        });
        const clientResult = await axios.get(`/client/${id}`);
        setClient(clientResult.data);
      } catch (error) {
        console.log(error);
      }
    }
    getInvoices();
  }, []);

  return (
    <>
      <ClientHeader />
      <ClientExtract clientId={client?.id} clientName={client?.name} route="/client/invoice/" />
    </>
  )
}

export default ClientExtractPage;
