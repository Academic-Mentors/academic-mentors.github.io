import { sortByHall, sheetProcessing } from '.././database';
import React, { useState, useEffect } from 'react';
import Select from 'react-select'

import { Leaderboard } from './Leaderboard';

import Peavine from '../assets/peavine_3.jpg'
import GBH from '../assets/gb_h.JPG'
import GBH_V from '../assets/gb_v.JPG'
import Argenta from '../assets/argenta_h.JPG'
import Original from '../assets/n_night.JPG'
import Placeholder from '../assets/test_1.jpg'

import './Home.css'

export const Home = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [hall, setHall] = useState("");

  const options = [
    { value: 'Argenta Hall', label: 'Argenta', src: Argenta },
    { value: 'Canada Hall', label: 'Canada', src: Placeholder },
    { value: 'Great Basin Hall', label: 'Great Basin', src: GBH, src_mobile: GBH_V },
    { value: 'Manzanita/Juniper Hall', label: 'Manzanita/Juniper', src: Placeholder },
    { value: 'Nevada LLC', label: 'Nevada LLC', src: Placeholder },
    { value: 'Nye Hall', label: 'Nye', src: Placeholder },
    { value: 'Peavine Hall', label: 'Peavine', src: Peavine },
    { value: 'Sierra Hall', label: 'Sierra', src: Placeholder },
    { value: 'All Halls', label: 'All Halls', src: Original }
  ]

  const handleHallChange = (selectedOption) => {
    setHall(selectedOption);
    console.log(`Option selected:`, selectedOption);
    setUsers(sortByHall(allUsers, selectedOption));
  }

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/gh/unrhc/packpoints/packpoints/id_data.txt')
      .then(response => response.text())
      .then((text) => {
        setIsLoaded(true)
        setUsers(sheetProcessing(text))
        setAllUsers(sheetProcessing(text))
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      })
    }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className='Home'>Loading...</div>;
  } else {
    return (
      <div className='Home'>
        <img
          className="demo-bg"
          src={window.innerWidth > 1024 ? (hall.src ?? Original) : (hall.src_mobile ?? Original)}
          alt="peavine background"
          style={{zIndex: "0"}}
        />
          <h1 className='header'>Welcome to Pack Points</h1>
          <div className='select'>
            <Select options={options} onChange={handleHallChange}/>
          </div>
          <Leaderboard style={{zIndex: "100"}} users={users}></Leaderboard>
          {/* {(hall !== "") && <h1 className='hall-selector'>You have selected {hall.value}</h1>} */}
      </div>
    );
  }
  
}

