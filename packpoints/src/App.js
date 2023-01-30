import { dataProcessing } from './database';
import React, { useState, useEffect } from 'react';
import Select from 'react-select'

import { Leaderboard } from './components/Leaderboard';


const url = 'https://script.google.com/macros/s/AKfycbx3EYsAmGUp3nql4gkRvcuGOTSaVL1ZO3UuNvTioxskYtY3UCcOML-_v_0mfLVJSlQ8/exec';



const App = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [hall, setHall] = useState("");

  const options = [
    { value: 'Argenta', label: 'Argenta' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Great Basin', label: 'Great Basin' },
    { value: 'Man/Jun', label: 'Man/Jun' },
    { value: 'Nevada LLC', label: 'Nevada LLC' },
    { value: 'Nye', label: 'Nye' },
    { value: 'Peavine', label: 'Peavine' },
    { value: 'Sierra', label: 'Sierra' },
    { value: 'All Halls', label: 'All Halls' }
  ]

  const handleHallChange = (selectedOption) => {
    setHall(selectedOption);
    console.log(`Option selected:`, selectedOption);
  }
  
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };  
    fetch(url, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsers(dataProcessing(result));
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Leaderboard users={users}></Leaderboard>
        <Select options={options} onChange={handleHallChange}></Select>
        <h1>You have selected {hall.value}</h1>
      </div>
    );
  }
  
}

export default App;
