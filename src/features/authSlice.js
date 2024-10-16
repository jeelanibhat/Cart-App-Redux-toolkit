import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk("userLogin", async (userCredentials) => {
    const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(userCredentials)
    });

    if (!response.ok) {
        throw new Error("User not found!");
    }

    const data = await response.json();
    return data; // Return the entire response object
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        error: null,
        isAuthenticated: false,
        loading: false,
        profile: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.access_token || action.payload.token; // Adjust based on the API response structure
                state.user = action.payload.user; // Adjust if needed based on API response
                localStorage.setItem("token", state.token);
                console.log("Success Login")
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to Login";
            })
            .addCase(profileUser.pending, (state) =>{
                state.loading = false;
                state.error = null;
            })
            .addCase(profileUser.fulfilled, (state, action) =>{
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(profileUser.rejected, (state, action) =>{
                state.loading = false;
                state.error = action.error.message
            })
    }
});

export const profileUser = createAsyncThunk('profileUser', async () => {
    const token = localStorage.getItem('token');
    console.log("profile token:", token)
    const response = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    console.log("response profile:", response.status)

    if (!response.ok) {
        const errorData = await response.json(); // Get detailed error response if available
        console.error("Profile fetch error data:", errorData); // Log error data
        throw new Error("Failed to fetch profile");
    }

    const data = await response.json();
    console.log("profile data slice:", data)
    return data;
});

export default authSlice.reducer;
