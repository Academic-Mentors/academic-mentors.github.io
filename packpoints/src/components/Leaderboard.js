import React from 'react';

import './Leaderboard.css'

export const Leaderboard = (props) => {
    return (
        <div className='Leaderboard'>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Hall</th>
                    <th>Points</th>
                </tr>
                {props.users.map((user, key) => (
                    <tr key={key}>
                        <td>{user.id}</td>
                        <td>{user.hall}</td>
                        <td>{user.points}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}