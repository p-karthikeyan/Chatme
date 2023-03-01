import React from 'react'
import Nav from '../components/nav'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Onboarding = () => {
  let navigate=useNavigate()
  const [cookies,setcookie,removecookie]=useCookies(['user'])
  const [formdata,setformdata]=useState({
    user_id:cookies.userId,
    first_name:"",
    dob_day:"",
    dob_month:"",
    dob_year:"",
    show_gender:false,
    gender_identity:"",
    gender_interest:"",
    url:"",
    about:"",
    matches:[]
  })
  const handlesubmit=async(e)=>{
      e.preventDefault()
      try{
        const response = await axios.put('http://localhost:8000/user',{formdata})
        const success=response.status===200
        if (success)navigate('/dashboard')
      }catch(err){
        console.log(err)
      }
  }
  const handlechange=(e)=>{
    const value=e.target.type==='checkbox'?e.target.checked:e.target.value
    const name=e.target.name
    setformdata((prevstate)=>({
      ...prevstate,
      [name]:value
    }))
  }
  return (
    <div>
      <Nav
      minimal={false}
      setauth={()=>{}}
      showauth={false}
      />
      <div className='onboarding'>
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handlesubmit}>
          <section>
            <label htmlFor='firstname'>
              First Name
            </label>
            <input id="firstname" placeholder='first name' required='true' value={formdata.first_name} name='first_name' type="text"
            onChange={handlechange}/>
            <label>
              Birthday
            </label>
            <div className='dob-container'>
                <input id="dob_day" placeholder='DD' required='true' value={formdata.dob_day} name='dob_day' type="number"
                onChange={handlechange}/>
                <input id="dob_month" placeholder='MM' required='true' value={formdata.dob_month} name='dob_month' type="number"
                onChange={handlechange}/>
                <input id="dob_year" placeholder='YYYY' required='true' value={formdata.dob_year} name='dob_year' type="number"
                onChange={handlechange}/>
            </div>
            <label>Gender</label>
            <div className='dob-container'>
                <input id="man" checked={formdata.gender_identity==='man'} value="man" name='gender_identity' type="radio"
                onChange={handlechange}/>
                <label htmlFor='man'>
                  Man
                </label>
                <input id="woman" checked={formdata.gender_identity==='woman'} value="woman" name='gender_identity' type="radio"
                onChange={handlechange}/>
                <label htmlFor='woman'>
                  Woman
                </label>
                <input id="other" checked={formdata.gender_identity==='other'} value="other" name='gender_identity' type="radio"
                onChange={handlechange}/>
                <label htmlFor='other'>
                  Other
                </label>
            </div>
                <div>
                <input id="show-gender" checked={formdata.show_gender} value="" name='show_gender' type="checkbox"
                onChange={handlechange}/>
                <label htmlFor='show-gender'>
                  Show gender on my profile
                </label>
                </div>
            <label>Show me</label>
            <div className='dob-container'>
                <input id="lovesman" checked={formdata.gender_interest==='man'} value="man" name='gender_interest' type="radio"
                onChange={handlechange}/>
                <label htmlFor='lovesman'>
                  Man
                </label>
                <input id="loveswoman" checked={formdata.gender_interest==='woman'} value="woman" name='gender_interest' type="radio"
                onChange={handlechange}/>
                <label htmlFor='loveswoman'>
                  Woman
                </label>
                <input id="lovesall" checked={formdata.gender_interest==='everyone'} value="everyone" name='gender_interest' type="radio"
                onChange={handlechange}/>
                <label htmlFor='lovesall'>
                  Everyone
                </label>
            </div>
            <label htmlFor='about'>About me</label>
            <input type="text" required={true} placeholder="Tell something about you.."
            onChange={handlechange} value={formdata.about} name="about" id="about"/>
            <input type="submit" value="Submit" className='secondary-btn'/>
          </section>
          <section>
            <label htmlFor='profile'>
              Profile pic
            </label>
            <input type="url" id="url" name='url' onChange={handlechange} required={true}/>
            <div className='photo-container'>
                {formdata.url &&<img src={formdata.url} alt="Profile pic preview"/>}
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}

export default Onboarding
