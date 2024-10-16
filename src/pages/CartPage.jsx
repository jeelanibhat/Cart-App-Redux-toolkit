import { useDispatch, useSelector } from "react-redux";
import { decrementCart, deleteItem, incrementCart } from "../features/productSlice";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const CartPage = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.products);
    // console.log("cart data:", cart);

    const handleIncrement = (item) => {
        dispatch(incrementCart(item))
    }
    const handleDecrement = (item) =>{
        dispatch(decrementCart(item))
    }
    const handleDelete = (item) => {
        dispatch(deleteItem(item))
    }
    
    const cartTotal = cart.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0).toFixed(2);
    

    useEffect(()=>{
        cartTotal
    },[cart])

    return (
        <div className="container mx-auto my-8 p-4">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Image</th>
                            <th className="py-3 px-6 text-left">Price</th>
                            <th className="py-3 px-6 text-left">Qty</th>
                            <th className="py-3 px-6 text-left">Total Amount</th>
                            <th className="py-3 px-6 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {cart.map((item, index) => (
                            <tr key={`${item.id}-${index}`} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <NavLink to={`/shop-details/${item.id}`} className="font-medium">{item.title}</NavLink>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-16 w-16 object-cover rounded"
                                    />
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span className="font-medium text-indigo-600">{item.price}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <button onClick={()=> handleDecrement(item)} className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">-</button>
                                        <input
                                            type="text"
                                            name="qty"
                                            value={item.quantity || 1}
                                            className="mx-2 w-10 text-center border border-gray-300 rounded"
                                            readOnly
                                        />
                                        <button onClick={()=> handleIncrement(item)} className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">+</button>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span className="font-medium text-indigo-600">{ (item.price) * parseInt(item.quantity).toFixed(2)}</span>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item)} className="px-2 py-1 bg-gray-300 text-black-700 rounded hover:bg-red-400">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="font-medium text-indigo-600 text-left"> {cartTotal > 0  ? `$ ${cartTotal}` : "Add Products to Cart!"} </td>
                        </tr>
                    </tfoot>

                </table>
            </div>
            {cart.length === 0 && (
                <div className="text-center mt-8 text-gray-500">
                    Your cart is empty.
                </div>
            )}
        </div>
    );
};

export default CartPage;
