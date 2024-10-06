import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

const LeaderboardPage = () => {
  const { leaderboard } = useContext(QuizContext);

  return (
    <div className="leaderboard-page">
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((player, index) => (
          <li key={index}>{player.name}: {player.score}</li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardPage;
