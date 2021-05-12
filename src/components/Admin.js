import React, {useEffect, useState} from 'react'
import {auth} from "../firebase"
import {withRouter} from "react-router"

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
        <div>
            <h2>Ruta protegina</h2>
        </div>
    )
}

export default withRouter(Admin);
