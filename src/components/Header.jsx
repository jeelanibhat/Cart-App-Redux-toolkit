// import jbLogo from '../assets/jb-logo.png'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadCartFromStorage } from '../features/productSlice'
import { useEffect } from 'react';

const Header = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(loadCartFromStorage())
    }, [dispatch])

    const {cart} = useSelector((state) => state.products);

    const countCart = cart.reduce((first, item) => {
        return first + (item.quantity)
    }, 0)

    const linkClass = ({isActive}) =>
        isActive ? 'text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-lg' : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-lg'
    

    return (
        <nav className="bg-blue-900 border-b border-white-100">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div
                        className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
                    >
                        <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
                        <span className="hidden md:block text-white text-2xl font-bold ml-2"
                            >Cart App</span>
                            {/* <img
                                className="h-10 w-auto"
                                src={jbLogo}
                                alt="React Jobs"
                            /> */}

                        </NavLink>
                        <div className="md:ml-auto">
                            <div className="flex space-x-2">
                                <NavLink
                                    to="/"
                                    className={linkClass}
                                >Home</NavLink>
                                <NavLink
                                    to="/shop"
                                    className={linkClass}
                                >Shop</NavLink>
                                <NavLink
                                    to="/cart"
                                    className={linkClass}
                                >
                                    Cart
                                    <span className='w-5 h-5 bg-red-700 z-1 absolute text-sm '>{cart.length === 0 ? 0 : countCart}</span>
                                </NavLink>
                                <NavLink to="/login" style={{marginLeft: '30px', background: 'rgb(160 60 60)', color:'white'}} className={`${linkClass}`}>
                                    Login
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header