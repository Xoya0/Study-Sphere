import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tab, Tabs, Box } from '@mui/material';
import { getGlobalLeaderboard, getLocalLeaderboard } from '../firebase';

function Leaderboard({ groupId }) {
    const [leaderboardType, setLeaderboardType] = useState('global');
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            if (leaderboardType === 'global') {
                const data = await getGlobalLeaderboard();
                setLeaderboardData(data);
            } else if (groupId) {
                const data = await getLocalLeaderboard(groupId);
                setLeaderboardData(data);
            }
        };

        fetchLeaderboard();
    }, [leaderboardType, groupId]);

    const handleTabChange = (event, newValue) => {
        setLeaderboardType(newValue);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Leaderboard</Typography>
            <Tabs value={leaderboardType} onChange={handleTabChange} aria-label="leaderboard tabs">
                <Tab label="Global" value="global" />
                {groupId && <Tab label="Local" value="local" />}
            </Tabs>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell align="right">Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboardData.map((user, index) => (
                            <TableRow key={user.userId}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{user.displayName}</TableCell>
                                <TableCell align="right">{user.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Leaderboard;