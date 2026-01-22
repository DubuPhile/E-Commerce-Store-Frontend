import ImageSlider from "../Components/ImageSlider"
import Layout from "../Components/Layout"
import ProductsList from "../Components/productList"

const HomePage = () => {

  const pageContent =  <ProductsList/>
  return (
    <Layout>
        <ImageSlider />
        {pageContent}
    </Layout>
  )
}

export default HomePage