import React from 'react';
import { Typography, Box, Grid, Paper, Button } from '@mui/material';
import { Quiz, Timer } from '@mui/icons-material';

const Challenges = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Challenges
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Quiz color="primary" sx={{ mr: 2, fontSize: 40 }} />
              <Typography variant="h4">Daily Quiz Challenge</Typography>
            </Box>
            <Typography variant="body1" paragraph>
              Complete today's quiz within 24 hours!
            </Typography>
            <Button variant="contained" color="primary">
              Start Quiz
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Timer color="secondary" sx={{ mr: 2, fontSize: 40 }} />
              <Typography variant="h4">Weekly Study Hours Challenge</Typography>
            </Box>
            <Typography variant="body1" paragraph>
              Meet your weekly study hours goal!
            </Typography>
            <Button variant="contained" color="secondary">
              View Progress
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Challenges;
