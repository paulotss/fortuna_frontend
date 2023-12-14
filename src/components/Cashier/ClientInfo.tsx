import IClient from "../../interfaces/IClient";

interface IProps {
  client: IClient
  totalCheckout: number;
}

function ClientInfo(props: IProps) {
  const { client, totalCheckout } = props;
  
  return (
    <section className="flex justify-between mb-3">
      <div>Cliente: <span className="font-bold text-lg">{ client.name }</span></div>
      <div className="flex">
        <div className="mr-5">
          Crédito:
          {' '}
          <span className="font-bold text-lg text-green-600">
            {
              Number(client.balance)
                .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
            }
          </span>
        </div>
        <div>
          Débito:
          {' '}
          <span className="font-bold text-lg text-red-600">
            {
              Number(client.balance - totalCheckout)
                .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
            }
          </span>
        </div>
      </div>
    </section>
  )
}

export default ClientInfo;
