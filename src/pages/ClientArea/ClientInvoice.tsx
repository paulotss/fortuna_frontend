// import ClientHeader from "../../components/ClientArea/ClientHeader";
import NewClientHeader from "../../components/ClientArea/NewClientHeader";
import InvoiceDetails from "../../components/InvoiceDetails";

function ClientInvoice() {
  return (
    <>
      {/* <ClientHeader/> */}
      <NewClientHeader/>
      <div className='mt-24'>
        <InvoiceDetails />
      </div>
    </>
  )
}

export default ClientInvoice;
