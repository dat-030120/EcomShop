import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name:'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action)=>{
            const found = state.products.find(
                check => check._id === action.payload._id 
            )

            if(!found){            
                state.quantity += 1;
                state.products.push(action.payload);}
              else{
                found.quantity += action.payload.quantity
              } 
            state.total += action.payload.price * action.payload.quantity;
        },

        removeProduct: (state, action)=> {
            const found = state.products.find(
                check => check._id === action.payload._id
            )
            if(found){
                found.quantity -= action.payload.quantity
                if(found.quantity <= 0){
                    state.products.splice(state.products.indexOf(found), 1);
                }
                state.quantity -= action.payload.quantity;
                state.total -= action.payload.price * action.payload.quantity;            
            }
        },

        removeCart: (state, action) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
            state.address = {};
        },

        setAddressCart: (state, action) =>{
            state.address = action.payload.address;
        }
    }
})

export const {addProduct, removeCart, removeProduct, setAddressCart} = cartSlice.actions
export default cartSlice.reducer;