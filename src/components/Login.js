import React, { useState } from 'react';
import { Container,Form,Button,Navbar,Nav,Alert} from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    let [email,setEmail] = useState("");
    let [password,setPass] = useState("");
    let [err,setErr] = useState("");
    let [hide,setHide] = useState(false);
    
    const navigate = useNavigate()
    const auth = getAuth();

    let handleEmail = (e)=>{
        setEmail(e.target.value)
    }
    let handlePass = (e)=>{
        setPass(e.target.value)
    }
    let handleSubmit = (e)=>{
        e.preventDefault()
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate("/home")
            })
            .catch((error) => {
                const errorCode = error.code;
                if(errorCode == "auth/user-not-found"){
                    setHide(true)
                    setErr("Email or Password incorrect!")
                    setEmail("")
                    setPass("")
                }else{
                    setHide(false)

                }
            });

    }

  return (
    <>
       <div className="page">
       <Navbar bg="primary" variant="dark">
            <Container>
            <Navbar.Brand href="#home">Logo</Navbar.Brand>
            <Nav className="ms-auto">
            <Nav.Link href="#home">More</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
       <Form className="formControl">
            <Form.Label className='head'>Login</Form.Label>
        <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={handleEmail} type="email" placeholder="Enter email"  value={email} />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handlePass} type="password" placeholder="Password"  value={password} />
        </Form.Group>
        {hide?<Alert  variant='danger'>
           {err}
        </Alert>
        :
        ""}
        
        <Button onClick={handleSubmit} variant="primary" type="submit">
            Sign In
        </Button>
        <div className="text">
        <Form.Text className="text-muted">
           <h5> Don't have an account?   <Link to="/registration">Registration</Link></h5>
        </Form.Text>
        </div>
        </Form>
       </div>
    </>
  )
}

 

export default Login