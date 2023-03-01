import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'

const Authmodel = ({setauth,issignup}) => {

    let navigate=useNavigate()
    const [cookies,setcookie,removecookie]=useCookies(['user'])
    const [email,setemail]=useState(null)
    const [password,setpassword]=useState(null)
    const [cpassword,setcpassword]=useState(null)
    const [error,seterror]=useState(null)
    const handlesubmit =async(e)=>{
        e.preventDefault()
        try{
          if(issignup &&(password!==cpassword)){
            seterror('password need to match!')
          }else{
            const response=await axios.post(`http://localhost:8000/${issignup?'signup':'login'}`,{email,password})
            setcookie('authtoken',response.data.token)
            setcookie('userId',response.data.userId)
            const success=response.status===201
            if (success && issignup)navigate('/onboarding')
            if (success && !issignup)navigate('/dashboard')
          }
        }catch(error){
          console.log(error) 
        }
    }
    const handleclick=()=>{
        setauth(false);
    }
return (
  <div className='auth-model'>
    <div className='close-btn' onClick={handleclick}>
      X
      </div>
    <h2>{issignup?'CREATE  ACCOUNT':'LOG IN'}</h2>
    <p>By clicking here, I state that I have read and understood the terms and conditions.</p>
    <form onSubmit={handlesubmit}>
      <input type="email" name="email" id="email" placeholder='Email' required={true} 
      onChange={(e)=>setemail(e.target.value)}/>
      <input type="password" name="pswd" id="pswd" placeholder='Password' required={true} 
      onChange={(e)=>setpassword(e.target.value)}/>
      {issignup &&<input type="password" name="cfm-pswd" id="cfm-pswd" placeholder='Confirm password' required={true} 
      onChange={(e)=>setcpassword(e.target.value)}/>}
      <input type="submit" value="Proceed" className='secondary-btn'/>
      <p>{error}</p>
    </form>
    <hr/>
    <h2>
      GET THE APP
    </h2>
  </div>
  )
}

export default Authmodel
