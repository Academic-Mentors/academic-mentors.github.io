import { dataProcessing } from './database';
import React, { useState, useEffect } from 'react';


const url = 'https://script.google.com/macros/s/AKfycbx3EYsAmGUp3nql4gkRvcuGOTSaVL1ZO3UuNvTioxskYtY3UCcOML-_v_0mfLVJSlQ8/exec';



const App = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  
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
      <ul>
        {console.log(users)}
        {users.map(user => (
          <li key={user.email}>
            {user.name} {user.points} {user.email}
          </li>
        ))}
      </ul>
    );
  }
  
}

export default App;
