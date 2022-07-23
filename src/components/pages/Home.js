import React, { useState,useEffect } from 'react';
import HomeLeft from './HomeLeft';
import HomeMid from './HomeMid';
import OwnProfile from './OwnProfile';
import HomeRight from './HomeRight';
import { getAuth,onAuthStateChanged  } from "firebase/auth";
import { Container, Spinner,Row,Col } from 'react-bootstrap';
import './home.css'
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const auth = getAuth();
  const navigate = useNavigate()



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        props.usertype(user)
      } else {
        props.clearuser()
      }
      if(user == null){
        navigate('/login')
      }
    });
  
  }, [])



  return props.loading?(
    <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
  ):(
    <>
     <div className="home-part">
    <Container>
     <div className="allpart">
     <Row>
        <Col xs={4}><OwnProfile></OwnProfile></Col>
        <Col xs={5}><HomeMid></HomeMid></Col>
        <Col xs={3}><HomeRight></HomeRight></Col>
      </Row>
     </div>
  </Container>
     </div>

      <div className="homepage">
        
      
      </div>
    </>
  )
}


export default Home