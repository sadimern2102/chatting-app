import { createContext,useReducer } from "react";

const Store = createContext()

let userInitialState = {
    user : localStorage.getItem('userInfo')? JSON.parse( localStorage.getItem('userInfo')) : null
}

let userReducer = (state,action)=>{
    switch(action.type){
        case 'USER_INFO':
            console.log("Store",action.payload)
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
            return {...state,user:action.payload}

        default :
        return state
    }
}


let StoreProvider = (props)=>{
    let [state,dispatch] = useReducer(userReducer,userInitialState)
    let value = {state,dispatch}

    return <Store.Provider value={value}>{props.children}</Store.Provider>
}


export {Store,StoreProvider}