import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../http";
import InputEdit from "../components/InputEdit";
import IProductResponse from "../interfaces/IProductResponse";
import Header from "../components/Header";

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
                />
                <InputEdit
                  title="Valor"
                  entity="price"
                  valueInput={product.price}
                  endPoint="/product"
                  tstyle="w-20"
                  itemId={product.id}
                />
                <InputEdit
                  title="Quantidade"
                  entity="amount"
                  valueInput={product.amount}
                  endPoint="/product"
                  tstyle="w-20"
                  itemId={product.id}
                />
              </article>
            </section>
      }
      
    </>
  )
}

export default ProductPage;
