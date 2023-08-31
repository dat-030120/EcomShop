import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase"
import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as  Route, useHistory } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { async } from "@firebase/util";


export default function NewProduct() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [Ero,setEro]= useState(false)
  const dispatch = useDispatch();
  const history= useHistory();
  


  const validationSchema = yup.object({
    title: yup
      .string('Enter  title')
      .required(' Title is required'),
    desc: yup
      .string('Enter description')
      .required('Description is required'),
      category: yup
      .string('Enter  Categories')
      .required(' Categories is required'),
    price: yup
      .string('Enter price')
      .required('Price is required'),
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      desc: '',
      category:'',
      price:'',
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
      setEro(true)
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
            const product = { ...values, img: downloadURL, };

            addProduct(product, dispatch).then((result)=>{
              history.push(result);})
          });
        }
      );
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      
        <form className="addProduct"  onSubmit={formik.handleSubmit}>
          <div className="addProductForm">
            <div className="addProductItem">
                <label>Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Food for cat"
                  value={formik.values.title}
                  onChange={formik.handleChange}            />
              </div>
              {formik.errors.title && (
              <p className="errorMsg"> {formik.errors.title} </p>
              )}
              <div className="addProductItem">
                <label>Description</label>
                <input
                  id="desc"
                  name="desc"
                  type="text"
                  placeholder="description..."
                  value={formik.values.desc}
                  onChange={formik.handleChange}
                />
              </div>      
              <div className="addProductItem">
                <label>Categories</label>
                <select name="category" id="category"    
                value={formik.values.categories}
                onChange={formik.handleChange}>
                  <option value="Pet"selected >Pet</option>
                  <option value="Toy">Toy</option>
                  <option value="Care">Care</option>
                  <option value="Food"  >Food</option>
                </select>
              </div>
              <div className="row">
              <div className="addProductItem1">
                <label>Stock</label>
                <select name="inStock" id="inStock"          
                value={formik.values.inStock}
                onChange={formik.handleChange}>
                  <option value="true" selected>Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="addProductItem1">
                <label>Price</label>
                <input
                  id="price"
                  name="price"
                  required
                  type="number"
                  placeholder="100"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
              </div>  
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