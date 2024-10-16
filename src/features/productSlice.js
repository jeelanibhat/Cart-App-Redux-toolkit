import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch data from Products API
const url = 'https://fakestoreapi.com/products';
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const products = await fetch(url);
    const response = await products.json();

    const quantityResponse = response.map((resProd) => ({
        ...resProd,
        quantity: 1
    }))
    // console.log("response::", response)
    return quantityResponse;
});

// Create Slice
const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        error : null,
        cart: []
    },
    reducers: {
        addToCart: ( state, action) => {
            const cartItem = state.cart.find((itemLine) => itemLine.id === action.payload.id);
            if(cartItem){
                cartItem.quantity += 1;
            }else{
                // state.cart.push({...action.payload, quantity: 1})
                state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
            }
                localStorage.setItem("cart", JSON.stringify(state.cart));
            // console.log("cart count:", state.cart)
        },
        incrementCart: (state, action) => {
            const cartItem = state.cart.find((itemLine) => itemLine.id === action.payload.id);
            if(cartItem){
                cartItem.quantity += 1;
                localStorage.setItem("cart", JSON.stringify(state.cart));  // Sync with localStorage
            }
        },
        decrementCart : (state, action) => {
            const cartItem = state.cart.find((itemLine) => itemLine.id === action.payload.id);
            // console.log("cartItem222:", cartItem);
            if(cartItem && cartItem.quantity > 1){
                cartItem.quantity -= 1;
                localStorage.setItem("cart", JSON.stringify(state.cart));  // Sync with localStorage
            }
        },
        deleteItem: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        loadCartFromStorage : (state) => {
            const storedCart = localStorage.getItem("cart");
            if(storedCart){
                state.cart = JSON.parse(storedCart)
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export const {addToCart, loadCartFromStorage, incrementCart, decrementCart, deleteItem} = productSlice.actions;
export default productSlice.reducer;