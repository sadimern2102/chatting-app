import React, { useState,useEffect,useContext} from 'react';
import { getAuth,onAuthStateChanged} from "firebase/auth";
import { Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue,push,set} from "firebase/database";
import {Store} from "../../Store"


const HomeRight = (props) => {
    const navigate = useNavigate()
    const auth = getAuth();
    const db = getDatabase();

    let [user,setUser] = useState([])
    let [activeUser,setActiveUser] = useState('')
    let [addUser,setAddUser] = useState(false)
    let {state,dispatch} = useContext(Store)

    console.log(auth)


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setActiveUser(user.displayName)
          } else {
              navigate('/login')
            console.log("data nai")
          }
        });
      
      }, [])
    useEffect((item)=>{
        let userArr = []
        const starCountuser = ref(db, 'users/');
            onValue(starCountuser, (snapshot) => {
                snapshot.forEach((data)=>{
                    let userData = {
                        name : data.val().username,
                        email : data.val().email,
                        id : data.val().id
                    }
                    userArr.push(userData)
                })
                setUser(userArr)
            });
    },[])


      let handleAdd = (id,name)=>{
        setAddUser(true)
        set(push(ref(db, 'addfriends/')), {
          senderName: auth.currentUser.displayName,
          senderId: auth.currentUser.uid,
          receiverId: id,
          receivrName: name,
        });
      }


  return (
   <>
     <div className="ownProfile all">
        <div className="image">
            <img src="" alt=""></img>
        </div>
        <div className="userInfo">
            <h1>{state.user.name}</h1>
            <h2>Frontend Developer</h2>
        </div>
        <div className="all-chat">
            <h1>Users</h1>
            <div className="all-chats">
                {user.map((item)=>(
                    item.id !== auth.currentUser.uid &&
                    <div className="chat">
                    <div className="main">
                        <div className="left">
                            <div className="img">
                                <img src="" alt=""></img>
                            </div>
                        </div>
                        <div className="right">
                            {addUser?
                            <div className="info-text">
                                <div className="one">{item.name}</div>
                                <div className="usrBtn"><h4>Friend Request Send</h4></div>
                            </div>
                            :
                            <div className="info-text">
                                <div className="one">{item.name}</div>
                                <div className="usrBtn"><Button variant="primary" onClick={()=>handleAdd(item.id,item.name)}>Add</Button></div>
                            </div>
                            }
                            
                        </div>
                    </div>
                </div>

                ))}
            </div>
        </div>
    </div>
   
   </>
  )
}

export default HomeRight