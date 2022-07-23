import React, { useState,useEffect,useContext} from 'react';
import { getAuth,onAuthStateChanged,signOut   } from "firebase/auth";
import { OverlayTrigger,Button,Tooltip } from 'react-bootstrap';
import { FiSettings } from 'react-icons/fi';
import { ImSwitch } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue} from "firebase/database";
import {Store} from "../../Store"


const OwnProfile = (props) => {
    const navigate = useNavigate()
    const auth = getAuth();
    const db = getDatabase();

    let [user,setUser] = useState([])
    let [adduser,setadduser] = useState([])
    let [activeUser,setActiveUser] = useState('')
    let [singleUser,setSingleUser] = useState(false)
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
    useEffect(()=>{
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

      let handleSignOut = ()=>{
        signOut(auth).then(() => {
            navigate('/login')
            console.log("Sign Out")
          }).catch((error) => {
            console.log(error)
          });
      }
     
      let handleSingleUser = (data)=>{
            setSingleUser(true)
            dispatch({type:'USER_INFO' , payload : data})
            console.log(data)
      }

      useEffect(()=>{
        let addArr = []
        const starAddCountuser = ref(db, 'addfriends/');
            onValue(starAddCountuser, (snapshot) => {
                snapshot.forEach((data)=>{
                    console.log(data.val())
                    let addData = {
                        senderName : data.val().senderName,
                        senderId : data.val().senderId,
                        receiverId : data.val().receiverId,
                        receivrName : data.val().receivrName,

                    }
                    console.log(addData,"adding")
                    if(!addArr.includes(addData)){
                        addArr.push(addData)

                    }

                })
                setadduser(addArr)
                console.log("add user", adduser)
            });
    },[])



  return (
   <>
     <div className="ownProfile all">
        <div className="satting">
                <FiSettings className='setticon' />
                <>
                    {[ 'bottom'].map((placement) => (
                        <OverlayTrigger
                        key={placement}
                        placement={placement}
                        overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                                Log Out
                            </Tooltip>
                        }
                        >
                        <Button variant="success"><ImSwitch onClick={handleSignOut} className='switch'></ImSwitch></Button>
                        </OverlayTrigger>
                    ))}
                    </>
            
        </div>
        <div className="image">
            <img src="" alt=""></img>
        </div>
        <div className="userInfo">
            <h1>{activeUser}</h1>
            <h2>Frontend Developer</h2>
        </div>
        <div className="activeUser">
            <div className="info-text">
                <div className="left">Online Now</div>
                <div className="right">{user.length - 1}</div>
            </div>
        <div className="userPic">
        {user.map((item)=>(
                    item.id !== auth.currentUser.uid &&
                    <div className="pic">
                        <img src="" alt=""></img>
                    </div>

                ))}
        </div>

        </div>
        <div className="all-chat">
            <h1>Chats</h1>
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
                            <div onClick={()=>handleSingleUser(item)} className={state.user?item.id == state.user.id ? "active" : "info-text":"info-text"}>
                                <div className="one">{item.name}</div>
                                <div className="two">11:34</div>
                            </div>
                            <h2>Message</h2>
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

export default OwnProfile