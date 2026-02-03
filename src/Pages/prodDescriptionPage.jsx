import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../features/products/productsApiSlice";
import Layout from "../Components/Layout";
import "../Styles/prodDescription.css";
import BuyPhase from "../Components/BuyPhase";

const prodDescriptionPage = () => {
  const { Id } = useParams();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(Id);

  let pageContent = "";

  if (isLoading) return (pageContent = <p>Loading...</p>);
  else if (isError) return (pageContent = <p>Error Fetch Product..</p>);
  else {
    pageContent = (
      <>
        <section className="product-description">
          <div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="prodImg"
            />
          </div>
          <section className="product-phase">
            <h3>{product.name}</h3>
            <h5 className="price">
              Price:{"   "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price)}
            </h5>
            <BuyPhase key={product._id} product={product} />
          </section>
        </section>
        <section className="product-details">
          <h4>Description: </h4>
          <p>{product.description}</p>
        </section>
      </>
    );
  }

  return (
    <>
      <Layout>{pageContent}</Layout>
    </>
  );
};

export default prodDescriptionPage;
