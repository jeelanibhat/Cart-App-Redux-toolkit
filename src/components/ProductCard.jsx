import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../features/productSlice";
import { useEffect } from "react";
import { addToCart } from "../features/productSlice";
import { NavLink } from "react-router-dom";

const ProductCard = () => {

    const dispatch = useDispatch();
    const { products , loading} = useSelector((state) => state.products);
    
    useEffect(() => {
        dispatch(fetchProducts());
    }, [])
    // console.log("products:", products)

    if (loading) {
        return <h1 className="text-4xl font-extrabold text-red-300 sm:text-5xl md:text-6xl">Loading..</h1>
    }

    const handleCart = (e) => {
        // console.log("product:", e);
        dispatch(addToCart(e))
    }

    return (
        <div className="grid grid-cols-4 gap-4">

            {products.map((product) => {
                return (  // Make sure to return the JSX
                    <div key={product.id} className="bg-white rounded-xl shadow-md relative">
                        <div className="p-4">
                            <NavLink to={`/shop-details/${product.id}`} className="mb-6">
                                <div className="text-gray-600 my-2">
                                    <img src={product.image} alt={product.title} className="max-h-48 mx-auto min-h-48" />
                                </div>
                                <h3 className="text-sm font-bold"> {product.title.length > 25 ? `${product.title.substring(0, 30)}...` : product.title}</h3>
                            </NavLink>

                            <div className="mb-5 min-h-20">
                                <h3 className="text-sm text-gray-500 font-normal"> {`${product.description.substring(0, 100)}...`}</h3>
                            </div>

                            <h3 className="text-indigo-500 mb-2 text-lg">Rs {product.price}</h3>

                            <div className="border border-gray-100 mb-5"></div>

                            <div className="flex flex-col lg:flex-row justify-between mb-4">
                                <div className="text-orange-700 mb-3 text-xl">
                                    {product.category}
                                </div>
                                <div
                                    onClick={() => handleCart(product)}
                                    className="cursor-pointer h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                                >
                                    Add to Cart
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}


        </div>
    )
}

export default ProductCard