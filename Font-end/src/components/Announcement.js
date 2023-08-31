import React from 'react'
import styled from 'styled-components'

const Container =styled.div`
    height :30px;
    background-color: green;
    color: white;
    display: flex;
    justify-content:center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    z-index: 1;
`; 


const Announcement = () => {
  return (
    <Container>
        Super Deal! buy one with same dewl
    </Container>
  )
}

export default Announcement