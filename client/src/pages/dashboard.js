import React from 'react'
import TinderCard from 'react-tinder-card' 
import { useState } from 'react'
import Chatcontainer from '../components/chatcontainer'

const Dashboard = () => {

  const db = [
    {
      name: 'Richard Hendricks',
      url: 'https://i.imgur.com/4WENAhz_d.webp?maxwidth=520&shape=thumb&fidelity=high'
    },
    {
      name: 'Erlich Bachman',
      url: 'https://i.imgur.com/4WENAhz_d.webp?maxwidth=520&shape=thumb&fidelity=high'
    },
    {
      name: 'Monica Hall',
      url: 'https://i.imgur.com/4WENAhz_d.webp?maxwidth=520&shape=thumb&fidelity=high'
    },
    {
      name: 'Jared Dunn',
      url: 'https://i.imgur.com/4WENAhz_d.webp?maxwidth=520&shape=thumb&fidelity=high'
    },
    {
      name: 'Dinesh Chugtai',
      url: 'https://i.imgur.com/4WENAhz_d.webp?maxwidth=520&shape=thumb&fidelity=high'
    }
  ]
  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div className='dashboard'>
      <Chatcontainer/>
      <div className='swipe-container'>
        <div className='card-container'>
          {characters.map((character) =>
            <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
              <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          )}
            <div className='swipe-info'>
            {lastDirection?<p>you swiped {lastDirection}</p>:<p/>}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
