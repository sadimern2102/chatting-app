import React, { useState } from 'react';
import { Container,Form,Button,Navbar,Nav,Alert} from 'react-bootstrap';
import { getAuth,createUserWithEmailAndPassword ,sendSignInLinkToEmail ,updateProfile} from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set,push } from "firebase/database";



const Registration = () => {

    let [text,setText] = useState("");
    let [email,setEmail] = useState("");
    let [password,setPass] = useState("");
    let [conPass,setConPass] = useState("");
    let [err,setErr] = useState("");
    let [hide,setHide] = useState(false);
    const navigate = useNavigate()
    
    const auth = getAuth();
    const db = getDatabase();
  
    let handleText = (e)=>{
        setText(e.target.value)
    }
    let handleEmail = (e)=>{
        setEmail(e.target.value)
    }
    let handlePass = (e)=>{
        setPass(e.target.value)
    }
    let handleConPass = (e)=>{
        setConPass(e.target.value)
    }
    let handleSubmit = (e)=>{
        e.preventDefault()
        if(!email || !text || !password || !conPass){
            setErr("Please fill all the gapes")
            setHide(true)
        }else if(password.length<6 || conPass.length<6){
            setErr("Password must be greater then 6 number")
            setHide(true)
        }else if(password !== conPass){
            setErr("Password does not matched")
            setHide(true)
        }else{
            setHide(false)
        }
        // function writeUserData(userId, name, email) {
        //     set(ref(db, 'users/' + userId), {
        //       username: name,
        //       email: email,
        //     });
        //   }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate('/login')
                updateProfile(auth.currentUser, {
                    displayName:text , photoURL: "https://example.com/jane-q-user/profile.jpg"
                  }).then(()=>{
                        set(push(ref(db, 'users/')), {
                          username: text,
                          email: email,
                          id: auth.currentUser.uid
                        });
                  }).then(() => {
                    setText("")
                    setEmail("")
                    setPass("")
                    setConPass("")
                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });
               
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode)
                // ..
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
              <Form.Label className='head'>Registration</Form.Label>
          <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control onChange={handleText} type="text" placeholder="Enter email" value={text} />
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={handleEmail} type="email" placeholder="Enter email"  value={email} />
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={handlePass} type="password" placeholder="Password"  value={password} />
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control  onChange={handleConPass} type="password" placeholder="Password"   value={conPass}/>
          </Form.Group>
          {hide?<Alert  variant='danger'>
             {err}
          </Alert>
          :
          ""}
          <Button onClick={handleSubmit} variant="primary" type="submit">
              Sign Up
          </Button>
          <div className="text">
          <Form.Text className="text-muted">
             <h5> Already have an account?   <Link to="/login">Login</Link></h5>
          </Form.Text>
          </div>
          </Form>
         </div>
      </>
    )
  }

export default Registration