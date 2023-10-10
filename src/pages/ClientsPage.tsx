import { useEffect, useState } from "react";
import axios from "../http";
import Header from "../components/Header";
import IClient from "../interfaces/IClient";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function ClientsPage () {
  const [clients, setClients] = useState<IClient[]>()

  useEffect(() => {
    async function getClients() {
      try {
        const { data } = await axios.get('/clients')
        setClients(data)
      } catch (error) {
        console.log(error)
      }
    }
    getClients()
  }, [])

  return (
    <>
      <Header/>
      <section className="p-5">
        <h1 className="font-bold text-xl">Clientes</h1>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Créditos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {
                  clients?.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.cellPhone}</TableCell>
                      <TableCell>{client.balance}</TableCell>
                    </TableRow>
                  ))
                }
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  )
}

export default ClientsPage;