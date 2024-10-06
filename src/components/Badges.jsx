import React, { useEffect, useState } from 'react';
import { getUserBadges } from '../firebase';
import { Box, Typography, Tooltip } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';

const badgeIcons = {
    firstQuizCompleted: <SchoolIcon />,
    sessionsMaster: <EmojiEventsIcon />,
    helpfulPeer: <PeopleIcon />,
};

const badgeTitles = {
    firstQuizCompleted: 'First Quiz Completed',
    sessionsMaster: '100 Sessions Master',
    helpfulPeer: 'Helpful Peer',
};

const Badges = ({ userId }) => {
    const [badges, setBadges] = useState({});

    useEffect(() => {
        const fetchBadges = async () => {
            const userBadges = await getUserBadges(userId);
            setBadges(userBadges);
        };
        fetchBadges();
    }, [userId]);

    return (
        <Box>
            <Typography variant="h6" gutterBottom>Badges</Typography>
            <Box display="flex" gap={2}>
                {Object.entries(badges).map(([badgeName, earned]) => (
                    earned && (
                        <Tooltip key={badgeName} title={badgeTitles[badgeName]}>
                            <Box>{badgeIcons[badgeName]}</Box>
                        </Tooltip>
                    )
                ))}
            </Box>
        </Box>
    );
};

export default Badges;
