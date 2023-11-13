import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../http";
import InputEdit from "../components/InputEdit";
import IProductResponse from "../interfaces/IProductResponse";
import Header from "../components/Header";
import EditProductAmount from "../components/EditProductAmount";
import * as Yup from 'yup';

function ProductPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<IProductResponse>({
    id: 0,
    title: "",
    price: 0,
    amount: 0,
    barCode: ""
  })
  const { id } = useParams();

  function handleUpdateAmount(newAmount: number): void {
    setProduct({ ...product, amount: newAmount })
  }

  useEffect(() => {
    async function getProduct() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/product/${id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false)
    }
    getProduct();
  }, [id]);

  return (
    <>
      <Header/>
      {
        isLoading
          ? <p>Loading...</p>
          : <section className="p-5">
              <h1 className="mb-3 font-bold text-lg">Produto</h1>
              <article className="flex flex-wrap w-1/2">
                <InputEdit
                  title="Nome"
                  entity="title"
                  valueInput={product.title}
                  endPoint="/product"
                  itemId={product.id}
                  validation={Yup.object({ generic: Yup.string().required("Obrigatório") })}
                />
                <InputEdit
                  title="Valor"
                  entity="price"
                  valueInput={product.price}
                  endPoint="/product"
                  tstyle="w-20"
                  itemId={product.id}
                  validation={Yup.object({ generic: Yup.string()
                    .matches(/^[^0|\D]\d{0,9}(\.\d{1,2})?$/, "Somente números decimais com ponto: 00.00")
                    .required("Obrigatório") })}
                />
                <EditProductAmount
                  amount={product.amount}
                  productId={product.id}
                  handleUpdateAmount={handleUpdateAmount}
                />
              </article>
            </section>
      }
      
    </>
  )
}

export default ProductPage;
