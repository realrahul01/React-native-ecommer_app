import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    favouriteData: [],
    cartData:[],
}

export const CounterSlice = createSlice({

    name: 'counter',
    initialState,
    reducers:{
        favState:(state,action)=>{
            state.favouriteData.push(action.payload)
        },
        removeFavState:(state,action)=>{
            state.favouriteData.splice(action.payload, 1)
        },
        handleCart:(state,action)=>{
            const existingItem = state.cartData.findIndex((x)=>x.id === action.payload.id)
            if(existingItem !== -1){
                state.cartData[existingItem].quantity += 1 
            }else{
                state.cartData.push(action.payload)
            }
        },
        addQuantityHandler:(state,action)=>{
            state.cartData = state.cartData.map((x,index)=>{
                if(x.id == action.payload.id){
                    return ({...x, quantity: x.quantity+1})
                }else{
                    return x
                }
            }) 
        },
        minusQuantityHandler:(state,action)=>{
            state.cartData = state.cartData.map((x,index)=>{
                if(x.id == action.payload.id){
                    return ({...x, quantity: x.quantity-1})
                }else{
                    return x
                }
            }) 
        },
        removeHandler:(state,action)=>{
            state.cartData.splice(action.payload,1)
        },
       
    }
})

export const {favState, removeFavState,handleCart, addQuantityHandler, minusQuantityHandler,removeHandler} = CounterSlice.actions;
export default CounterSlice.reducer;