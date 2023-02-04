import { sortByHall, sheetProcessing } from './database';
import React, { useState, useEffect } from 'react';
import Select from 'react-select'

import { Leaderboard } from './components/Leaderboard';

import './App.css'


// const url = 'https://script.google.com/macros/s/AKfycbx3EYsAmGUp3nql4gkRvcuGOTSaVL1ZO3UuNvTioxskYtY3UCcOML-_v_0mfLVJSlQ8/exec';



const App = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [hall, setHall] = useState("");

  const options = [
    { value: 'Argenta Hall', label: 'Argenta' },
    { value: 'Canada Hall', label: 'Canada' },
    { value: 'Great Basin Hall', label: 'Great Basin' },
    { value: 'Manzanita/Juniper Hall', label: 'Manzanita/Juniper' },
    { value: 'Nevada LLC', label: 'Nevada LLC' },
    { value: 'Nye Hall', label: 'Nye' },
    { value: 'Peavine Hall', label: 'Peavine' },
    { value: 'Sierra Hall', label: 'Sierra' },
    { value: 'All Halls', label: 'All Halls' }
  ]

  const handleHallChange = (selectedOption) => {
    setHall(selectedOption);
    console.log(`Option selected:`, selectedOption);
    setUsers(sortByHall(allUsers, selectedOption));
  }
  
  // useEffect(() => {
  //   var requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };  
  //   fetch(url, requestOptions)
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setUsers(dataProcessing(result));
  //         setAllUsers(dataProcessing(result));
  //         setUsers(sheetProcessing());
  //         setAllUsers(sheetProcessing)
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     )
  // }, [])

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/gh/Academic-Mentors/packpoints/packpoints/id_data.txt')
      .then(response => response.text())
      .then((text) => {
        setIsLoaded(true)
        setUsers(sheetProcessing(text))
        setAllUsers(sheetProcessing(text))
        console.log(users)
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      })
    }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className='App'>Loading...</div>;
  } else {
    return (
      <div className='App'>
        <Leaderboard users={users}></Leaderboard>
        <Select options={options} onChange={handleHallChange}></Select>
        <h1>You have selected {hall.value}</h1>
      </div>
    );
  }
  
}

export default App;
