import useProducts from "../hooks/useProducts"
import Products from "./products"

const ProductsList = () => {
    const {products} = useProducts()


    let pageContent = <p>Loading...</p>

    if(products?.length){
        pageContent = products.map(product => {
        
        return(
            <Products
                key = {product.sku}
                products={product}
            
            />
        )
        })
    }


    return (
        <main className="main main--products">
        {pageContent}
        </main>
    )
}

export default ProductsList