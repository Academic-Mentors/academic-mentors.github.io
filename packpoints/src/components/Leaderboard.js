import React from 'react';

import './Leaderboard.css'

export const Leaderboard = (props) => {
    return (
        <div className='Leaderboard'>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Hall</th>
                    <th>Points</th>
                </tr>
                {props.users.map((user, key) => (
                    <tr key={key}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.hall}</td>
                        <td>{user.points}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}