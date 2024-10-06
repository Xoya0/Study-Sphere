import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Box, 
  Container, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  IconButton,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import VideocamIcon from '@mui/icons-material/Videocam';

const LiveRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    // Replace this with your actual API call
    const mockRooms = [
      { id: 1, name: 'Math Study Group', participantCount: 5 },
      { id: 2, name: 'Physics Discussion', participantCount: 3 },
      { id: 3, name: 'Literature Club', participantCount: 7 },
    ];
    setRooms(mockRooms);
  };

  const createRoom = async () => {
    if (!newRoomName) {
      alert('Please enter a room name');
      return;
    }
  
    try {
      const response = await fetch('/api/live-rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newRoomName, creatorId: 'your-creator-id-here' }), // Include creatorId if necessary
      });
  
      if (response.ok) {
        const newRoom = await response.json();
        setRooms([...rooms, newRoom]);
        setNewRoomName('');
        setOpenCreateDialog(false);
      } else {
        alert('Error creating room');
      }
    } catch (error) {
      console.error('Failed to create room:', error);
      alert('Failed to create room');
    }
  };
  
  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Live Rooms
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => setOpenCreateDialog(true)}
        >
          Create New Room
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item key={room.id} xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {room.name}
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <PersonIcon color="action" />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    {room.participantCount} participants
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary" 
                  variant="contained"
                  startIcon={<VideocamIcon />}
                  onClick={() => joinRoom(room.id)}
                  fullWidth
                >
                  Join Room
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>Create New Room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Room Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button onClick={createRoom} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LiveRooms;
