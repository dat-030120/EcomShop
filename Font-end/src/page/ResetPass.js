import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  
`;

const Error = styled.span`
  color: red;
`;

const ResetPass = () => {
  const user = useSelector((state) => state.user?.currentUser?.user);
  const [npass, setNpass] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();

  const handleClick =async (e) => {
    e.preventDefault();
    if(npass.length > 5){
        const res = await publicRequest.post("auth/Restpass", {email:user.email,password,npass});
        if(res.data.statust==="ok"){
            navigate("/")
        }else{setErro(true)}
    }else{}
    
  };
  return (
    <Container>
      <Wrapper>
        <Title>Rest passwrord</Title>
        <Form>
          <Input
            placeholder="old password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="new password"
            type="password"
            onChange={(e) => setNpass(e.target.value)}
          />
           {npass.length < 6 && <Error>Password must more than 6</Error>}
          <Button onClick={handleClick}>
            Reset
          </Button>
          {erro && <Error>Erro passwrod</Error>}

        </Form>
      </Wrapper>
    </Container>
  );
};

export default ResetPass;
