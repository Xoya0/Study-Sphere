import React from 'react';
import { Typography, Button, Box, Grid, Paper, Card, CardContent, Avatar, Chip } from '@mui/material';
import { styled } from '@mui/system';
import Leaderboard from '../components/Leaderboard';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

// Styled components (you may want to move these to a separate file)
const MainContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  borderRadius: '20px',
  padding: '10px 20px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[4],
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const GradientTypography = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
}));

const Home = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MainContent>
          <GradientTypography variant="h2" gutterBottom>
            Revolutionize Your Learning Experience
          </GradientTypography>
          <Typography variant="h5" gutterBottom color="textSecondary">
            Real-time collaboration, competitive quizzes, and AI-powered study tools
          </Typography>
          <Box mt={4} display="flex" flexWrap="wrap" justifyContent="center">
            <ActionButton variant="contained" color="primary" size="large" startIcon={<SchoolIcon />}>
              Get Started
            </ActionButton>
            <ActionButton variant="outlined" color="primary" size="large" startIcon={<GroupIcon />}>
              Join Room
            </ActionButton>
            <ActionButton variant="outlined" color="secondary" size="large" startIcon={<EmojiObjectsIcon />}>
              Join Chat
            </ActionButton>
          </Box>
        </MainContent>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Grid container spacing={3}>
          {['Featured Courses', 'Recent Activities', 'Study Tools'].map((title, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    View
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
        
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Your Achievements
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {['Quick Learner', 'Team Player', 'Problem Solver', 'Knowledge Seeker'].map((achievement, index) => (
              <Chip
                key={index}
                label={achievement}
                color="primary"
                variant="outlined"
                avatar={<Avatar>{achievement[0]}</Avatar>}
              />
            ))}
          </Box>
        </Box>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Leaderboard
          </Typography>
          <Leaderboard />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
