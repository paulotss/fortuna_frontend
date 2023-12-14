import { ChangeEvent, FormEvent, useState } from "react";

interface IProps {
  sendResult(request: string): void
}

function BarCodeInput (props: IProps) {
  const { sendResult } = props;
  const [barcode, setBarcode] = useState("");

  function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(`Submit: ${barcode}`);
    sendResult(barcode);
    setBarcode("");
  }

  function handleChange ({ target }: ChangeEvent<HTMLInputElement>) {
    const { value } = target;
    setBarcode(value);
    console.log(`Change: ${value}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-xs italic">Código de barras</p>
      <input
        type="text"
        name="barcode"
        value={barcode}
        onChange={handleChange}
        autoFocus
        className="border p-1"
      />
    </form>
  )
}

export default BarCodeInput;
