import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import {toast} from 'react-hot-toast'

const useLogin = () => {
    const [loading,setLoading]=useState(false);
    const {setAuthUser}=useAuthContext();

    const login=async (username,password)=>{
        const success=handleInputErrors({username,password})
        if(!success) return;
        setLoading(true)
        try{
          const res=await fetch("https://mernappchat-3.onrender.com/api/auth/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password})
          })

          const data=await res.json();
          if(data.error){
            throw new Error(data.error)
          }
          localStorage.setItem("chat-user",JSON.stringify(data))
          localStorage.setItem('token', data.token);
          setAuthUser(data)
          console.log(data)

        }catch(error){
          toast.error(error.message)
        }finally{
          setLoading(false)
        }
    }
    return {loading,login}
}

export default useLogin


function handleInputErrors({fullName,username,password,confirmPassword,gender}){
    if(!username || !password){
        toast.error('Please fill in all fields')
        return false
    }
  
    if(password.length<6){
      toast.error('Password must be atleast 6 characters')
      return false
    }
  
    return true
  }