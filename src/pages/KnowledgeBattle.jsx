import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { generateQuizQuestions, submitAnswer, getOpponent, updateUserPoints, assignBadge } from '../firebase';
import { 
  Box, Typography, Button, CircularProgress, Select, MenuItem, Dialog, 
  DialogTitle, DialogContent, DialogActions, Paper, Grid, Avatar, 
  LinearProgress, Chip, Fade, Card, CardContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const CATEGORIES = ['General', 'Science', 'History', 'Literature', 'Geography'];
const QUESTIONS_PER_BATTLE = 5;
const TIME_PER_QUESTION = 15;

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

const OptionButton = styled(Button)(({ theme, correct, wrong }) => ({
  margin: theme.spacing(1),
  width: '100%',
  backgroundColor: correct ? theme.palette.success.light : wrong ? theme.palette.error.light : theme.palette.background.paper,
  '&:hover': {
    backgroundColor: correct ? theme.palette.success.main : wrong ? theme.palette.error.main : theme.palette.action.hover,
  },
}));

const KnowledgeBattle = () => {
  const { currentUser } = useAuth();
  const [opponent, setOpponent] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('General');
  const [battleStarted, setBattleStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
    const initializeBattle = async () => {
      const opponent = await getOpponent();
      setOpponent(opponent);
      setLoading(false);
    };

    initializeBattle();
  }, []);

  useEffect(() => {
    let timer;
    if (battleStarted && timeLeft > 0 && !answerSubmitted) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !answerSubmitted) {
      handleAnswer(null);
    }
    return () => clearTimeout(timer);
  }, [battleStarted, timeLeft, answerSubmitted]);

  const startBattle = async () => {
    setLoading(true);
    try {
      const quizQuestions = await generateQuizQuestions(category, QUESTIONS_PER_BATTLE);
      setQuestions(quizQuestions);
      setBattleStarted(true);
      setTimeLeft(TIME_PER_QUESTION);
      setCurrentQuestionIndex(0);
      setUserScore(0);
      setOpponentScore(0);
    } catch (error) {
      console.error('Error starting battle:', error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answer) => {
    if (answerSubmitted) return;

    setAnswerSubmitted(true);
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.correctAnswer.charCodeAt(0) - 65;
    setCorrectAnswer(currentQuestion.options[correctAnswerIndex]);

    const isCorrect = answer === currentQuestion.options[correctAnswerIndex];
    
    if (isCorrect) {
      setUserScore(prevScore => prevScore + 1);
    }

    const opponentCorrect = Math.random() < 0.5;
    if (opponentCorrect) {
      setOpponentScore(prevScore => prevScore + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setTimeLeft(TIME_PER_QUESTION);
        setAnswerSubmitted(false);
        setCorrectAnswer(null);
      } else {
        endBattle();
      }
    }, 2000);
  };

  const endBattle = async () => {
    setShowResults(true);
    if (userScore > opponentScore) {
      await updateUserPoints(currentUser.uid, 10);
      await assignBadge(currentUser.uid, 'BattleWinner');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!battleStarted) {
    return (
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>Knowledge Battle</Typography>
        <Typography variant="body1" gutterBottom>Select a category and start the battle!</Typography>
        <Select value={category} onChange={(e) => setCategory(e.target.value)} fullWidth margin="normal">
          {CATEGORIES.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" onClick={startBattle} fullWidth sx={{ mt: 2 }}>
          Start Battle
        </Button>
      </StyledPaper>
    );
  }

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" gutterBottom>Knowledge Battle</Typography>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Box display="flex" alignItems="center">
            <Avatar src={currentUser.photoURL} sx={{ mr: 1 }} />
            <Typography variant="h6">{currentUser.displayName}</Typography>
          </Box>
          <Typography variant="h5">Score: {userScore}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <Typography variant="h6">{opponent?.displayName}</Typography>
            <Avatar src={opponent?.photoURL} sx={{ ml: 1 }} />
          </Box>
          <Typography variant="h5" align="right">Score: {opponentScore}</Typography>
        </Grid>
      </Grid>
      <Chip label={`Category: ${category}`} color="secondary" sx={{ mb: 2 }} />
      <LinearProgress variant="determinate" value={(timeLeft / TIME_PER_QUESTION) * 100} sx={{ mb: 2 }} />
      <Typography variant="body2" align="right">Time left: {timeLeft}s</Typography>

      {questions[currentQuestionIndex] && (
        <Fade in={true}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>{questions[currentQuestionIndex].question}</Typography>
              <Grid container spacing={2}>
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <Grid item xs={6} key={index}>
                    <OptionButton 
                      variant="outlined" 
                      onClick={() => handleAnswer(option)}
                      correct={answerSubmitted && option === correctAnswer}
                      wrong={answerSubmitted && option !== correctAnswer && option === questions[currentQuestionIndex].options[questions[currentQuestionIndex].correctAnswer.charCodeAt(0) - 65]}
                      disabled={answerSubmitted}
                    >
                      {option}
                      {answerSubmitted && option === correctAnswer && <CheckCircleOutlineIcon color="success" sx={{ ml: 1 }} />}
                      {answerSubmitted && option !== correctAnswer && option === questions[currentQuestionIndex].options[questions[currentQuestionIndex].correctAnswer.charCodeAt(0) - 65] && <CancelOutlinedIcon color="error" sx={{ ml: 1 }} />}
                    </OptionButton>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Fade>
      )}

      <Dialog open={showResults} onClose={() => setShowResults(false)}>
        <DialogTitle>Battle Results</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>You scored {userScore} out of {questions.length}!</Typography>
          <Typography variant="h6" gutterBottom>Your opponent scored {opponentScore} out of {questions.length}.</Typography>
          {userScore > opponentScore && (
            <Box display="flex" alignItems="center" mt={2}>
              <EmojiEventsIcon color="primary" sx={{ mr: 1 }} />
              <Typography>Congratulations! You've won 10 points and the BattleWinner badge!</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setShowResults(false);
            setBattleStarted(false);
            setQuestions([]);
          }} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
};

export default KnowledgeBattle;