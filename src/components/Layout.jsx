import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, IconButton, Box, Tooltip, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import VideocamIcon from '@mui/icons-material/Videocam';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { keyframes, styled } from '@mui/system';

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px #3498db; }
  50% { box-shadow: 0 0 20px #3498db; }
  100% { box-shadow: 0 0 5px #3498db; }
`;

const StyledAppBar = styled(AppBar)`
  background: rgba(44, 62, 80, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const GradientText = styled(Typography)`
  background: linear-gradient(45deg, #3498db, #1abc9c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavButton = styled(Button)`
  position: relative;
  overflow: hidden;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #3498db, #1abc9c);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover:after {
    opacity: 0.2;
  }
`;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { path: '/', icon: <HomeIcon />, label: 'Home' },
    { path: '/chat', icon: <ChatIcon />, label: 'Chat' },
    { path: '/video-rooms', icon: <VideocamIcon />, label: 'Video Rooms' },
    { path: '/live-rooms', icon: <LiveTvIcon />, label: 'Live Rooms' },
    { path: '/knowledge-battle', icon: <EmojiEventsIcon />, label: 'Knowledge Battle' },
  ];

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <GradientText
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              fontWeight: 'bold',
              letterSpacing: '1px',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            StudySphere
          </GradientText>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {navItems.map((item, index) => (
              <Tooltip key={item.path} title={item.label}>
                <NavButton
                  color="inherit"
                  startIcon={item.icon}
                  onClick={() => navigate(item.path)}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  sx={{
                    mx: 1,
                    color: '#ecf0f1',
                    transition: 'all 0.3s ease',
                    transform: hoveredItem === index ? 'translateY(-5px)' : 'none',
                    '&:hover': {
                      color: '#3498db',
                    },
                    ...(location.pathname === item.path && {
                      animation: `${glowAnimation} 2s infinite`,
                    }),
                  }}
                >
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>{item.label}</Box>
                </NavButton>
              </Tooltip>
            ))}
          </Box>
          <Tooltip title="Profile">
            <IconButton
              color="inherit"
              onClick={() => navigate('/profile')}
              sx={{
                ml: 2,
                color: '#ecf0f1',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'rotate(10deg) scale(1.1)',
                  color: '#3498db',
                },
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </StyledAppBar>
      <Container>
        {children}
      </Container>
    </>
  );
};

export default Layout;
