import ImageSlider from "../Components/ImageSlider";
import ProductsList from "../Components/productList";

const HomePage = () => {
  const pageContent = <ProductsList />;
  return (
    <>
      <ImageSlider />
      {pageContent}
    </>
  );
};

export default HomePage;
