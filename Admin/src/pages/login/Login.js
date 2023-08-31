
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import * as yup from 'yup';
import "./login.css";
import { useFormik } from 'formik';
import { logout } from "../../redux/userRedux";
import { logoutProduct } from "../../redux/productRedux";
import { publicRequest } from "../../requestMethods";

const Login = () => {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .required('User name is required'),
    password: yup
      .string('Enter your password')
      .min(6, 'Password should be of minimum 6 characters length')
      .required('Password is required'),
  });



  
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        console.log(values)
        login(dispatch, (values));
      },
    });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `URL("https://th.bing.com/th/id/R.d904aa05083cb22c205f08e556b71bc4?rik=JNVEZjHbRsdxEg&riu=http%3a%2f%2fmononanimalhospital.files.wordpress.com%2f2011%2f02%2fdog-and-cat.jpg&ehk=BHkeddiEKZt6FqfjZWL3jB6HaO2fRNfBW9MEF3BwiLg%3d&risl=&pid=ImgRaw&r=0")`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment:'fixed',
        backgroundSize:"cover"
      }}
    >
          <form  className="form" onSubmit={formik.handleSubmit}>
            <div className="login">
              <div className="text">
                <h3>LOGIN</h3>
                { error ? (
                <p className="errorMsg"> your User name or Password is not correct  </p>): <p>Please enter your credentials to login.</p>}
              </div>
            </div>
            <input   
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Enter your email"
            />
            {formik.errors.email && (
              <p className="errorMsg"> {formik.errors.email} </p>
            )}
            <input type="password"           
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Enter your password"/>
              {formik.errors.password && (
              <p className="errorMsg"> {formik.errors.password} </p>
               )}
              <button type="submit" >login</button>
          </form>
      </div>
  );
};

export default Login;