import React from 'react'
import colorlogo from  '../images/logo.png'


const Nav = ({minimal,setauth,showauth,setsignup}) => {
    const handleclick=()=>{
        setauth(true)
        setsignup(false)
    }
    const authToken=false
  return (
    <nav>
    <div className='logo-container'>
      <img className='logo' alt='logo' src={colorlogo}/>
      <h1 className={minimal?'whitelogo':'blacklogo'}>ChatMe</h1>
    </div>
    {!authToken && <button className='nav-btn' disabled={showauth} onClick={handleclick}>log in</button>}
    </nav>
  )
}

export default Nav
