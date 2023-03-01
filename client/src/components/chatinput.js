import React from 'react'
import { useState } from 'react'

const Chatinput = () => {
    const [textArea,settextArea]=useState(null)
  return (
    <div className='chat-input'>
      <input type="text" className='text-msg' placeholder='Type your message here..' value={textArea} onChange={(e)=>settextArea(e.target.value)}/>
      <button className='secondary-btn'>Send</button>
    </div>
  )
}

export default Chatinput
