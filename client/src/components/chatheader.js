import React from 'react'
import tamana from '../images/dp.jpg'

const Chatheader = () => {
  return (
    <div className='chat-header'>
      <div className='profile-dp'>
        <div className='img-container'>
            <img src={tamana}/>
        </div>
        <h3>Tamanna</h3>
      </div>
      <i className='log-out-icon'>logout</i>
    </div>
  )
}

export default Chatheader
