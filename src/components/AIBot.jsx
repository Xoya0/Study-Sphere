import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';

const AIBot = ({ open, onClose }) => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("API Key:", process.env.REACT_APP_OPENAI_API_KEY);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-4',
                messages: [{ role: 'user', content: input }],
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log("API Response:", result.data);  // Add this line to see the full API response
            setResponse(result.data.choices[0].message.content);
        } catch (error) {
            console.error('Error calling GPT-4 API:', error.response ? error.response.data : error);
            setResponse('Sorry, there was an error processing your request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>AI Assistant</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Ask me anything"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                        {loading ? 'Thinking...' : 'Ask'}
                    </Button>
                </Box>
                {response && (
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        {response}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AIBot;