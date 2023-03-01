import React from 'react'
import Authmodel from '../components/authmodel';
import '../index.css'
import Nav from '../components/nav';
import { useState } from 'react';
const Home=()=> {
    const authToken=false;
    const [showauth,setauth]=useState(false)
    const [issignup,setsignup]=useState(true)
    const handleclick=()=>{
        console.log('clicked')
        setauth(true)
        setsignup(true)
    }
  return (
    <div className='overlay'>
    <Nav minimal={true} setauth={setauth} setsignup={setsignup} showauth={showauth}/>
    <div className='home'>
      <h1 className='primary-title'>MAKE A BOND</h1>
      <p className='sec-title'>Have a healthy relation</p>
      <button className='primary-btn' onClick={handleclick}>
        {authToken?'Sign Out':'Create Account'}
      </button>
      {showauth &&(<Authmodel issignup={issignup} setauth={setauth}/>)}
    </div>
    </div>
  )
}

export default Home
