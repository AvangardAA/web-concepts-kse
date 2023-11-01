import React, {useContext, useState, useEffect, createContext} from "react";
import jwtDecode from "jwt-decode"
import axios from "axios";


const AuthContext = createContext({
    auth: null,
    setAuth: () => {},
    user: null
})

export function useAuth(){
   return useContext(AuthContext)
}

export function AuthProvider ({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [isLogin, setIsLogin] = useState(!!localStorage.getItem("jwt_session"))

    async function logIn(data) {
        const resp = await axios({
            method: "Post",
            url: "http://43.207.112.193:8081/token/",
            data: data,
            headers: {"Content-Type": "application/json"}
        })
        const name = "jwt_session";
        const value = resp.data.access_token
        localStorage.setItem(name, value)
        setIsLogin(true)
    }

    function logOut () {
        localStorage.removeItem("jwt_session")
        localStorage.removeItem("private.pem")
        setIsLogin(false)
        
        return
    }

    useEffect(() => {
        try {
            const accessToken = localStorage.getItem("jwt_session")
            setCurrentUser(jwtDecode(accessToken))
        } catch (e) {}
    }, [])

    const value = {
        currentUser, logIn, logOut, isLogin
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}
