import React from 'react'
import Chatheader from './chatheader'
import Chatdisplay from './chatdisplay'
import Matchesdisplay from './matchesdisplay'

const Chatcontainer = () => {
  return (
    <div className='chat-container'>
        <Chatheader/>
        <div className='Options'>
            <button className='option'>Matches</button>
            <button className='option' disabled={true}>Chats</button>
        </div>
        <Matchesdisplay/>
        <Chatdisplay/>
    </div>
  )
}

export default Chatcontainer
