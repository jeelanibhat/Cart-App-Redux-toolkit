import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addToCart } from "../features/productSlice";

const ProductDetailsPage = () => {

    const dispatch = useDispatch();

    const { id } = useParams(); // Get the ID from the URL params
    const [product, setProduct] = useState(null); // State to store the filtered product

    const products = useSelector((state) => state.products.products); // Get products from the Redux store

    useEffect(() => {
        // Find the product by ID (Ensure type consistency)
        const foundProduct = products.find((item) => item.id === parseInt(id));
        setProduct(foundProduct);
    }, [id, products]);

    // Add to cart
    const handleAddCart = (ele) => {
        dispatch(addToCart(ele))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            {product ? (
                <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Image Section */}
                        <div className="flex items-center justify-center">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-auto max-h-96 object-contain rounded-md shadow-sm"
                            />
                        </div>

                        {/* Product Details Section */}
                        <div>
                            <h1 className="text-2xl font-bold mb-4 text-gray-800">
                                {product.title}
                            </h1>
                            <p className="text-gray-600 mb-6">
                                {product.description}
                            </p>
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-indigo-600">
                                    Price: <span className="text-2xl">${product.price}</span>
                                </h3>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button onClick={() => handleAddCart(product)} className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition">
                                    Add to Cart
                                </button>
                                <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-xl font-semibold text-gray-500">
                    No item found
                </div>
            )}
        </div>
    );
};

export default ProductDetailsPage;
