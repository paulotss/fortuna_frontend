import { ChangeEvent, FormEvent, FocusEvent, useState } from "react";

function BarCodeInput () {
  const [barcode, setBarcode] = useState("");

  function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(`Submit: ${barcode}`);
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
        onBlur={(e: FocusEvent<HTMLInputElement>) => e.target.focus()}
        className="border p-1"
      />
    </form>
  )
}

export default BarCodeInput;
