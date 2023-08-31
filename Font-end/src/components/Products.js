import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Product from './Product';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/apiCalls';
import Pagination from '@mui/material/Pagination';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  margin:10px;
  justify-content: space-between;
`;
const PaginationContainer = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
`
const Products = ({cat}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
    const currentPage = window.location.href.split('/')[3];
    const rowPerPage =  currentPage ? 8 : 4;
    const [totalPage, setTotalPage] = useState(1);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product?.products);


  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setTotalPage(Math.ceil(filteredProducts?.length / rowPerPage))
  }, [rowPerPage]);
  
   useEffect(()=> {
    if(cat?.category ==='All'|| cat?.category ==null){
        setFilteredProducts(product)
    }else{
      setFilteredProducts(product?.filter((item) =>
      Object.entries(cat).every(([key, value]) =>
      item[key].includes(value)
        )
      ))
      }
  
    }, [cat])
  return (
    
    <Container>
 {filteredProducts.map((item) => <Product item={item} key={item?.id} />)} 
             
    </Container>
    
  )
}

export default Products