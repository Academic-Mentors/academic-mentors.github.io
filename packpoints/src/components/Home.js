import { sortByHall, sheetProcessing, monthProcessing, monthSetter } from '.././database';
import { db } from ".././firebase";
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import NavBar from './NavBar.js';


import { Leaderboard } from './Leaderboard';

import Peavine from '../assets/peavine_3.jpg'
import GBH from '../assets/gb_h.JPG'
import GBH_V from '../assets/gb_v.JPG'
import Argenta from '../assets/argenta_h.JPG'
import Original from '../assets/n_night.JPG'

import './Home.css'

export const Home = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allMonthlyUsers, setAllMonthlyUsers] = useState([]);
  const [monthlyUsers, setMonthlyUsers] = useState([]);

  const [actualUserDataState, setActualUserDataState] = useState({});

  const [hall, setHall] = useState("");
  const [month, setMonth] = useState(false);
  const [dbLoad, setDbLoad] = useState(false);

  const collectionRef = collection(db, 'id_data');
  const monthCollectionRef = collection(db, 'month_data');

  const actualUserData = {}

  useEffect(() => {
    async function getAllDocuments() {
      try {
        const querySnapshot = await getDocs(collectionRef);
        const data = [];

        querySnapshot.forEach(doc => {
          const parsed = doc.data()[doc.id].split(';')
          data.push({ id: doc.id, points: parseInt(parsed[0]), hall: parsed[1] });
          actualUserData[doc.id] = parseInt(parsed[0])
        });
        data.sort((a, b) => b.points - a.points);
        setAllUsers(data); // Update state with the fetched data
        setUsers(data)
        setIsLoaded(true)
        setActualUserDataState(actualUserData)

      } catch (error) {
        console.error('Error getting documents:', error);
      }
    }

    getAllDocuments(); // Call the function to fetch data when the component mounts

    async function getAllMonthDocuments() {
      try {
        const monthQuerySnapshot = await getDocs(monthCollectionRef);
        const monthData = [];

        monthQuerySnapshot.forEach(doc => {
          const monthParsed = doc.data()[doc.id].split(';')
          const points = actualUserData[doc.id] - parseInt(monthParsed[0])
          monthData.push({ id: doc.id, points: points, hall: monthParsed[1] });
        });
        monthData.sort((a, b) => b.points - a.points);
        setAllMonthlyUsers(monthData); // Update state with the fetched data
        setMonthlyUsers(monthData);
        setIsLoaded(true)
        console.log(allMonthlyUsers);

      } catch (error) {
        console.error('Error getting documents:', error);
      }
    }

    getAllMonthDocuments(); // Call the function to fetch data when the component mounts

  }, []);
  

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


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded || !dbLoad) {
    return <div className='Home'>Loading...</div>;
  } else {
    return (
      <div className='Home'>
        {console.log(actualUserDataState)}
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

