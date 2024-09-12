import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Leaderboard.css';

function Leaderboard() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/quiz-instructions');  // Navigate back to the quiz instructions page
  };

  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const mockLeaderboardData = [
      { id: 1, name: 'Alice', score: 95 },
      { id: 2, name: 'Bob', score: 90 },
      { id: 3, name: 'Charlie', score: 85 },
      { id: 4, name: 'David', score: 80 },
      { id: 5, name: 'Eve', score: 75 }
    ];

    // Sort the data by score in descending order
    const sortedData = mockLeaderboardData.sort((a, b) => b.score - a.score);

    setLeaderboardData(sortedData);
  }, []);

  return (
    <div className="leaderboard">
   
      <div className="leaderboard-content">
      <button className="back-btn" onClick={handleBack}>Back</button>
        <h2>Leaderboard</h2>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
