import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IClient from "../interfaces/IClient";
import Header from "../components/Header";
import Checkout from "../components/Cashier/Checkout";
import ClientSelect from "../components/Cashier/ClientSelect";
import ICashier from "../interfaces/ICashier";
import axios from "../http"
import ReportCashier from "../components/Cashier/ReportCashier";
import CashierTitleEdit from "../components/CashierTitleEdit";

function CashierPage() {
  const [client, setClient] = useState<IClient | null>(null);
  const [cashier, setCashier] = useState<ICashier>({ id: 1, title: '' });
  const { id } = useParams()

  function handleClickSelectClient(client: IClient) {
    setClient(client);
  }

  function removeClient() {
    setClient(null);
  }

  useEffect(() => {
    async function getCashier () {
      try {
        const { data } = await axios.get(`/cashier/${id}`);
        setCashier(data);
      } catch (error) {
        console.log(error);
      }
    }
    getCashier()
  }, [id])

  return (
    <>
      <Header/>
      <CashierTitleEdit payload={cashier.title} cashierId={cashier.id} />
      {
        client
          ? <Checkout client={client} cashier={cashier} removeClient={removeClient} />
          : <>
              <ClientSelect handleClickSelectClient={handleClickSelectClient} />
              <ReportCashier />
            </>
      }
    </>
  )
}

export default CashierPage;
