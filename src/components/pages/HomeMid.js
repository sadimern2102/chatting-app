import React from 'react'
import { useState,useContext } from 'react';
import { Form,Card} from 'react-bootstrap'
import { FiSend } from 'react-icons/fi';
import { getDatabase, ref, set,push,onValue  } from "firebase/database";
import { useEffect } from 'react';
import {Store} from "../../Store"
import { getAuth } from 'firebase/auth';


const HomeMid = () => {
  let [msg,setMsg] = useState('')
  let [allMsg,setAllMsg] = useState([])
  let[one,setOne] = useState(false)
  let[activeUsr,setActiveUsr] = useState(false)

  const auth = getAuth()
  const db = getDatabase();
  let {state,dispatch} = useContext(Store)

let handleText=(e)=>{
  setMsg(e.target.value)
  console.log("message")
}
let handleSent = ()=>{
  set(push(ref(db, 'message/')), {
    msg: msg,
    sender: auth.currentUser.uid,
    receiver: state.user.id,
  });
  setMsg("")
  setOne(!one)
}

let msgArray = []

useEffect(()=>{
  const starMsgCountRef = ref(db, 'message/');
  onValue(starMsgCountRef, (snapshot) => {
    snapshot.forEach((item)=>{
      msgArray.push(item.val())
      setAllMsg(msgArray)
      console.log(item.val())
    })
  });
  setActiveUsr(true)
},[one])

  return (
    <div className="homeMid all">
      {state.user?
      <>
          <div className="mainArea">
            <div className="messageArea">
          {allMsg.map((item)=>(
            item.receiver == state.user.id || item.sender == state.user.id ?
            auth.currentUser.uid == item.sender ?
                <Card className='handleCard'  style={{width: '250px',marginBottom: "5px"}}>
                  <Card.Body>
                    <h4>{auth.currentUser.displayName}</h4>
                    {item.msg}
                    </Card.Body>
              </Card>:
              <Card style={{width: '250px',marginBottom: "5px"}}>
              <Card.Body>
                <h4>{state.user.name}</h4>
                {item.msg}
                </Card.Body>
          </Card>
              :
              ''
          ))}
                </div>
        </div>
        <div className="sentArea">
          <div className="messageBox">
            <Form.Group className="mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Control onChange={handleText} type="text" placeholder="Enter your message" />
            </Form.Group>
            </div>
            <div className="sent">
                  <FiSend onClick={handleSent} className='plane' />

            </div>
        </div>
      </>
      :
      <Card style={{width: '250px',marginBottom: "5px"}}>
                  <Card.Body>Ami asi</Card.Body>
              </Card>
    }
        
    </div>
  )
}

export default HomeMid