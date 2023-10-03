import { useState } from "react";
import IClient from "../interfaces/IClient";
import Header from "../components/Header";
import Checkout from "../components/Cashier/Checkout";
import ClientSelect from "../components/Cashier/ClientSelect";
import ICashier from "../interfaces/ICashier";

const initialClients: IClient[] = [
  {
    id: 1,
    name: "Paulo de Tarso",
    code: "001",
    cellPhone: "61998585218",
    email: "paulo.oinab@gmail.com",
    branch: "Taguatinga",
    type: "CC",
    cpf: "01810755123",
    balance: 50
  },
  {
    id: 2,
    name: "Raquel Álvares",
    code: "002",
    cellPhone: "61981285134",
    email: "alvares.kel@gmail.com",
    branch: "Taguatinga",
    type: "DD",
    cpf: "01234567891",
    balance: 80
  },
  {
    id: 3,
    name: "Marco Aurélio",
    code: "003",
    cellPhone: "61912345678",
    email: "marco.tf2@gmail.com",
    branch: "Taguatinga",
    type: "CC",
    cpf: "09876543219",
    balance: 140
  }
];

const cashier: ICashier = {
  id: 1,
  title: "Café Sophia"
}

function CashierPage() {
  const [client, setClient] = useState<IClient | null>(null);

  function handleClickSelectClient(client: IClient) {
    setClient(client);
  }

  function removeClient() {
    setClient(null);
  }

  return (
    <>
      <Header/>
      <h1 className="text-center p-5 text-2xl font-bold text-yellow-700 border-b">{ cashier.title }</h1>
      {
        client
          ? <Checkout client={client} removeClient={removeClient} />
          : <ClientSelect clients={initialClients} handleClickSelectClient={handleClickSelectClient} />
      }
    </>
  )
}

export default CashierPage;
