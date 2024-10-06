import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Badges from '../components/Badges';
import { Typography, Box, CircularProgress, Paper, Avatar, LinearProgress, Chip, Grid } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';

function Profile() {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!currentUser) {
        return (
            <Box>
                <Typography variant="h4" gutterBottom>Profile</Typography>
                <Typography variant="body1">Please log in to view your profile.</Typography>
            </Box>
        );
    }

    // Fake user data (replace with real data when available)
    const fakeUserData = {
        level: 7,
        rank: 'Knowledge Seeker',
        points: 1250,
        nextLevelPoints: 1500,
        achievements: [
            { name: 'First Quiz Completed', icon: '🏆' },
            { name: 'Study Streak: 7 Days', icon: '🔥' },
            { name: 'Knowledge Explorer', icon: '🧠' },
        ],
    };

    const progress = (fakeUserData.points / fakeUserData.nextLevelPoints) * 100;

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 3, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
                <Box display="flex" alignItems="center" marginBottom={2}>
                    <Avatar sx={{ width: 100, height: 100, marginRight: 2, border: '3px solid #fff' }}>
                        {currentUser.email[0].toUpperCase()}
                    </Avatar>
                    <Box color="white">
                        <Typography variant="h5" fontWeight="bold">{currentUser.email}</Typography>
                        <Typography variant="h6">Level {fakeUserData.level} {fakeUserData.rank}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                    <StarIcon sx={{ color: 'gold', marginRight: 1 }} />
                    <Typography variant="body1" color="white">
                        {fakeUserData.points} / {fakeUserData.nextLevelPoints} XP
                    </Typography>
                </Box>
                <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
            </Paper>

            <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
                <Typography variant="h6" gutterBottom>
                    <EmojiEventsIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                    Achievements
                </Typography>
                <Grid container spacing={1}>
                    {fakeUserData.achievements.map((achievement, index) => (
                        <Grid item key={index}>
                            <Chip
                                icon={<Typography>{achievement.icon}</Typography>}
                                label={achievement.name}
                                variant="outlined"
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            {currentUser.uid && <Badges userId={currentUser.uid} />}
        </Box>
    );
}

export default Profile;
