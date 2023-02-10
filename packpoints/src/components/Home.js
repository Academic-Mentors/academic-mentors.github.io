import { sortByHall, sheetProcessing } from '.././database';
import React, { useState, useEffect } from 'react';
import Select from 'react-select'

import { Leaderboard } from './Leaderboard';

import Peavine from '../assets/peavine_4.jpg'
import Argenta from '../assets/peavine_2.jpg'
import Canada from '../assets/peavine_3.jpg'
import Original from '../assets/unr_original_2.jpg'

import './Home.css'

export const Home = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [hall, setHall] = useState("");

  const options = [
    { value: 'Argenta Hall', label: 'Argenta', src: Argenta },
    { value: 'Canada Hall', label: 'Canada', src: Canada },
    { value: 'Great Basin Hall', label: 'Great Basin' },
    { value: 'Manzanita/Juniper Hall', label: 'Manzanita/Juniper' },
    { value: 'Nevada LLC', label: 'Nevada LLC' },
    { value: 'Nye Hall', label: 'Nye' },
    { value: 'Peavine Hall', label: 'Peavine', src: Peavine },
    { value: 'Sierra Hall', label: 'Sierra' },
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
          src={hall.src ?? Original}
          alt="peavine background"
        />
          <h1 className='header'>Welcome to Pack Points</h1>
          <div className='select'>
            <Select options={options} onChange={handleHallChange}/>
          </div>
          <Leaderboard users={users}></Leaderboard>
          {/* {(hall !== "") && <h1 className='hall-selector'>You have selected {hall.value}</h1>} */}
      </div>
    );
  }
  
}

