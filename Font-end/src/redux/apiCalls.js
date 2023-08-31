import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import { getProductFailure, getProductStart, getProductSuccess } from "./productRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    console.log(user);
    const res = await publicRequest.post("auth/login", user);
    console.log(res);
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
    let output = await ("/login");
    return output;
  } catch (err) {
    dispatch(registerFailure());
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