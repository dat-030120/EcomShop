import { useState } from "react";
import "./newUser.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase"
import {  regis } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as  Route, useHistory } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { async } from "@firebase/util";


export default function NewUser() {
  const erro = useSelector((state) => state.user.currentUser?.error);

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [Ero,setEro]= useState(false)
  const dispatch = useDispatch();
  const history= useHistory();
  const [input, setinput] = useState({});

 

  const validationSchema = yup.object({
    username: yup
    .string('Enter  username')
    .required(' Title is required'),
    email: yup
    .string('Enter email')
    .required('Email is required'),
    password: yup
    .string('Enter  password')
    .required('No password provided.') 
    .min(6, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'), 
    confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match")
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password:'',
      confirmPassword:'',
      isAdmin:'false'
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleUpload(values)
    },
  });



  const handleChange = (e) => {
    setFile(e.target.files[0])
    setImage(URL.createObjectURL(e.target.files[0]));
  };


  const handleUpload = (values) => {
    if(file ===null){
      const product = {username:values.username,email:values.email,password:values.password,isAdmin:values.isAdmin }
      regis(dispatch,product )
    }
    else
    {const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
        },
        () => {  
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = { username:values.username,email:values.email,password:values.password,isAdmin:values.isAdmin , img: downloadURL, };
            regis(dispatch,product )
          });
        }
      );
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New User</h1>
        <form className="addProduct"  onSubmit={formik.handleSubmit}>
          <div className="addProductForm">
            <div className="addProductItem">
                <label>User Name</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="You Name"
                  value={formik.values.title}
                  onChange={formik.handleChange}            />
              </div>
              {formik.errors.title && (
              <p className="errorMsg"> {formik.errors.title} </p>
              )}
              {erro || <p className="errorMsg">Email already exists</p>}
              <div className="addProductItem">
                <label>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email..."
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>  
              {formik.errors.email && (
              <p className="errorMsg"> {formik.errors.email} </p>
              )}   
              <div className="addProductItem">
                <label>Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password..."
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>  
              {formik.errors.password && (
              <p className="errorMsg"> {formik.errors.password} </p>
              )}  
              <div className="addProductItem">
                <label>Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password..."
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
              </div>  
              {formik.errors.confirmPassword && (
              <p className="errorMsg"> {formik.errors.confirmPassword} </p>
              )}  
              <div className="addProductItem">
                <label>IsAdmin</label>
                <select name="isAdmin" id="isAdmin"          
                  value={formik.values.isAdmin}
                  onChange={formik.handleChange}>
                    <option value="true" selected>Yes</option>
                    <option value="false">No</option>
                </select>
                </div>
              </div>
            <div className="addImge">
            <label>Image</label>
                <input
                type="file"
                id="file"
                hidden
                onChange={handleChange}
              />
           {image ==null ?<div className="ImgeInput">
              <label for="file" className="label">
                <Publish />
              </label>  
            </div> :
            <label for="file"><img src={image} className="ImgeInput"></img></label>} 
            {Ero &&(<p className="errorMsg">Input Image </p>)}
            <div  className="addProductButton1" for="file">
              <label for="file" className="label1">
                  Uploadfile                
              </label>         
            </div>
            
          </div>
          <button  type="submit" className="addProductButton">
          Create
          </button>
        </form>
      </div>
  );
}