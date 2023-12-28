import { useState, useEffect } from "react";
// import ClientHeader from "../../components/ClientArea/ClientHeader";
import NewClientHeader from "../../components/ClientArea/NewClientHeader";
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
        const auth = sessionStorage.getItem('auth');
        const clientResult = await axios.get(`/client/${id}`, { headers: { 'authorization': auth } });
        setClient(clientResult.data);
      } catch (error) {
        console.log(error);
      }
    }
    getInvoices();
  }, []);

  return (
    <>
      {/* <ClientHeader/> */}
      <NewClientHeader/>
      <div className='mt-24'>
        <ClientExtract clientId={client?.id} clientName={client?.name} route="/client/invoice/" />
      </div>
    </>
  )
}

export default ClientExtractPage;
