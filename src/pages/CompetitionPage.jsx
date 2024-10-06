import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import { QuizContext } from '../context/QuizContext';

const socket = io('http://localhost:3000');

const CompetitionPage = () => {
  const [players, setPlayers] = useState([]);
  const [question, setQuestion] = useState(null);
  const { playerName, leaderboard, setLeaderboard } = useContext(QuizContext);

  useEffect(() => {
    socket.emit('player-join', playerName);  // Notify server when player joins

    socket.on('player-joined', (newPlayer) => {
      setPlayers((prev) => [...prev, newPlayer]);
    });

    socket.on('new-question', (newQuestion) => {
      setQuestion(newQuestion);
    });

    socket.on('update-leaderboard', (updatedLeaderboard) => {
      setLeaderboard(updatedLeaderboard);
    });

    return () => {
      socket.off('player-joined');
      socket.off('new-question');
      socket.off('update-leaderboard');
    };
  }, [playerName]);

  const submitAnswer = (answer) => {
    socket.emit('submit-answer', { player: playerName, answer });
  };

  return (
    <div className="competition-page">
      <h2>Real-Time Quiz Competition</h2>
      <div>
        <h4>Leaderboard</h4>
        <ul>
          {leaderboard.map((player, index) => (
            <li key={index}>{player.name}: {player.score}</li>
          ))}
        </ul>
      </div>
      {question && (
        <div className="question">
          <h3>{question.text}</h3>
          {question.options.map((option, index) => (
            <button key={index} onClick={() => submitAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompetitionPage;
