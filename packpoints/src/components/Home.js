import { sortByHall, sheetProcessing, monthProcessing, monthSetter } from '.././database';
import { db } from ".././firebase";
import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import NavBar from './NavBar.js';


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
  const [allMonthlyUsers, setAllMonthlyUsers] = useState([]);
  const [monthlyUsers, setMonthlyUsers] = useState([]);

  const [hall, setHall] = useState("");
  const [month, setMonth] = useState(false);
  const [dbLoad, setDbLoad] = useState(false);

  console.log(db)
  

  let userId = localStorage.getItem('email');
  if (!!userId) {
      const documentRef = doc(db, 'user_emails', userId);
      
      const getDocument = async () => {
        const docSnap = await getDoc(documentRef);
        if (docSnap.exists()) {
          console.log(docSnap.data()[userId]);
          for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].id === docSnap.data()[userId]) {
              localStorage.setItem("points", allUsers[i].points);
            }
          }
          localStorage.setItem("studentid", docSnap.data()[userId]);
        } else {
          console.log('No such document!');
        }
        setDbLoad(true)
      };
      
      getDocument();
  }



  const options = [
    { value: 'Argenta Hall', label: 'Argenta', src: Argenta },
    { value: 'Canada Hall', label: 'Canada' },
    { value: 'Great Basin Hall', label: 'Great Basin', src: GBH, src_mobile: GBH_V },
    { value: 'Manazanita/Juniper Hall', label: 'Manazanita/Juniper' },
    { value: 'Nevada LLC', label: 'Nevada LLC' },
    { value: 'Nye Hall', label: 'Nye' },
    { value: 'Peavine Hall', label: 'Peavine', src: Peavine },
    { value: 'Sierra Hall', label: 'Sierra' },
    { value: 'All Halls', label: 'All Halls', src: Original }
  ]

  const typeOptions = [
    {value: 'Monthly Standings', label: 'Monthly Standings'},
    {value: 'All Time Standings', label: 'All Time Standings'},
  ]

  const handleHallChange = (selectedOption) => {
    setHall(selectedOption);
    console.log(`Option selected:`, selectedOption);

    if (month === true) {
      setMonthlyUsers(sortByHall(allMonthlyUsers, selectedOption));
    }
    else {
      setUsers(sortByHall(allUsers, selectedOption));
    }
  }

  const handleTypeChange = (selectedOption) => {
    if (selectedOption['value'] === 'Monthly Standings') {
      setMonth(true);
      console.log(`Option selected:`, selectedOption);
    }
    else {
      setMonth(false);
      console.log(`Option selected:`, selectedOption);
    }
  }

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/gh/Academic-Mentors/packpoints/packpoints/id_data.txt')
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

    useEffect(() => {
      fetch('https://cdn.jsdelivr.net/gh/Academic-Mentors/packpoints/packpoints/month_data.txt')
        .then(response => response.text())
        .then((text) => {
          let monthDict = monthProcessing(text);
          setAllMonthlyUsers(monthSetter(monthDict, allUsers));
          setMonthlyUsers(monthSetter(monthDict, users));
          console.log(users)
        },
        (error) => {
          setError(error);
        })
      }, [isLoaded])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded || !dbLoad) {
    return <div className='Home'>Loading...</div>;
  } else {
    return (
      <div className='Home'>
        <h1 className='welcome'>{"Welcome " + localStorage.getItem("name") + ", your ID number is " + localStorage.getItem("studentid") + "!"}</h1>
        {/* {localStorage.getItem("points") > 400 ? <h1 className='welcome'>{"You have " + localStorage.getItem("points") + " points!"}</h1> : <h1 className='welcome'>Brother</h1>} */}
        <h1 className='welcome'>{"You have " + localStorage.getItem("points") + " points!"}</h1>
        <h1 className='welcome'>{(Math.floor(localStorage.getItem("points") / 400) === 1) ? "This means you have 1 entry into the final prizes!" : ("This means you have " + Math.floor(localStorage.getItem("points") / 400) + " entries into the final prizes!")}</h1>
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
          <Leaderboard style={{zIndex: "100"}} users={month === false ? users : monthlyUsers}></Leaderboard>
          {/* {(hall !== "") && <h1 className='hall-selector'>You have selected {hall.value}</h1>} */}
          <div className='type_select'>
            <Select options={typeOptions} onChange={handleTypeChange}/>
          </div>
      </div>
    );
  }
  
}

