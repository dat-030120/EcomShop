import { getAllUsersFailure, getAllUsersStart, getAllUsersSuccess, loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import { getOrderFailure, getOrderStart, getOrderSuccess, updateOrderFailure, updateOrderStart, updateOrderSuccess } from "./clienRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    dispatch(loginSuccess(res.data));
    window.location.reload();
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const regis = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};
export const getAlluser = async (dispatch) => {
  dispatch(getAllUsersStart());
  try {
    const res = await userRequest.get("/users")
    dispatch(getAllUsersSuccess(res.data));
  } catch (err) {
    console.dir(err)
    dispatch(getAllUsersFailure());
  }
};
// order
export const getOrder = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await publicRequest.get("/orders");
    dispatch(getOrderSuccess(res.data));
    console(res.data)
  } catch (err) {
    dispatch(getOrderFailure());
  }
};
export const updateOrder = async (id, order, dispatch) => {
  dispatch(updateOrderStart());
  try {
    // update
    await userRequest.put(`/orders/${id}`,order)
    dispatch(updateOrderSuccess({ id, order }));
  } catch (err) {
    dispatch(updateOrderFailure());
  }
};
//product
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.get(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    await userRequest.put(`/products/${id}`,product)
    dispatch(updateProductSuccess({ id, product }));
    let output = await ("/product/"+id);
    return output;
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
    let output = await ( "/");
    return output;
  } catch (err) {
    dispatch(addProductFailure());
  }
};
