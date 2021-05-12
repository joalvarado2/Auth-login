import React, {useEffect, useState} from 'react'
import {auth} from "../firebase"
import {withRouter} from "react-router"
import Firestore from './Firestore'

const Admin = (props) => {

    const [user, setUser] = useState(null)

    useEffect(()=>{
        if(auth.currentUser){
            console.log("existe un usuario")
            setUser(auth.currentUser)
        } else {
            console.log("no existe el usuario")
            props.history.push("/login")
        }
    },[])

    return (
        <div className="mt-5">
            <h2 className="text-center">Ruta protegina</h2>
            {user && (
                <Firestore user={user}/>
            )}
        </div>
    )
}

export default withRouter(Admin);
