import React from 'react';
import './UserFound.css';
function UserFound({ words, headerText}) {

    return (
      <div className="Found-solutions-list">
      
        {words.length > 0 &&
          <h4>{headerText}: {words.length}</h4>
        }
        <ul>
          {words.map((solution) => {return <li key={solution}>{solution}</li>})}
        </ul>
      </div>
    );
  }
export default UserFound