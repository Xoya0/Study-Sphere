import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, set, push } from "firebase/database";
import axios from 'axios'; // Make sure to install axios: npm install axios

const firebaseConfig = {
    apiKey: "AIzaSyDZGT_uYBGutYqWLdMs7bX2AjxDwbz7QmI",
    authDomain: "study-sphere-1de75.firebaseapp.com",
    databaseURL: "https://study-sphere-1de75-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "study-sphere-1de75",
    storageBucket: "study-sphere-1de75.appspot.com",
    messagingSenderId: "176847578828",
    appId: "1:176847578828:web:8702c1fdb176d2254fc469",
    measurementId: "G-BEKX1CGVCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { db, auth, database };

// Add this new function to update user points
export const updateUserPoints = async (userId, points) => {
    const userRef = ref(database, `users/${userId}/points`);
    const currentPoints = (await get(userRef)).val() || 0;
    await set(userRef, currentPoints + points);
};

// New functions for managing badges
export const assignBadge = async (userId, badgeName) => {
    const badgeRef = ref(database, `users/${userId}/badges/${badgeName}`);
    await set(badgeRef, true);
};

export const getUserBadges = async (userId) => {
    const badgesRef = ref(database, `users/${userId}/badges`);
    const snapshot = await get(badgesRef);
    return snapshot.val() || {};
};

export const checkAndAssignBadges = async (userId) => {
    const userRef = ref(database, `users/${userId}`);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val() || {};

    if (userData.quizzesCompleted >= 1 && !userData.badges?.firstQuizCompleted) {
        await assignBadge(userId, 'firstQuizCompleted');
    }

    if (userData.sessionsCompleted >= 100 && !userData.badges?.sessionsMaster) {
        await assignBadge(userId, 'sessionsMaster');
    }

    if (userData.helpfulActions >= 10 && !userData.badges?.helpfulPeer) {
        await assignBadge(userId, 'helpfulPeer');
    }
};

// Add these new functions for leaderboard
export const getGlobalLeaderboard = async (limit = 10) => {
    const usersRef = ref(database, 'users');
    const snapshot = await get(usersRef);
    const users = snapshot.val();
    
    const leaderboard = Object.entries(users || {})
        .map(([userId, userData]) => ({
            userId,
            displayName: userData.displayName || 'Anonymous',
            points: userData.points || 0
        }))
        .sort((a, b) => b.points - a.points)
        .slice(0, limit);
    
    return leaderboard;
};

export const getLocalLeaderboard = async (groupId, limit = 10) => {
    const groupUsersRef = ref(database, `groups/${groupId}/members`);
    const snapshot = await get(groupUsersRef);
    const groupUsers = snapshot.val();
    
    const userPromises = Object.keys(groupUsers || {}).map(async (userId) => {
        const userRef = ref(database, `users/${userId}`);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val();
        return {
            userId,
            displayName: userData.displayName || 'Anonymous',
            points: userData.points || 0
        };
    });
    
    const users = await Promise.all(userPromises);
    const leaderboard = users
        .sort((a, b) => b.points - a.points)
        .slice(0, limit);
    
    return leaderboard;
};

// Function to get an opponent
export const getOpponent = async () => {
    // For now, we'll just return a mock opponent
    // In the future, implement a matchmaking system
    return {
        uid: 'opponent-123',
        displayName: 'AI Opponent'
    };
};

// Function to generate quiz questions using GPT-4
export const generateQuizQuestions = async (category, count = 5) => {
    const API_URL = 'https://api.openai.com/v1/chat/completions';

    const prompt = `Generate ${count} multiple-choice questions about ${category}. 
        Format each question as follows:
        Question: [The question text]
        A) [Option A]
        B) [Option B]
        C) [Option C]
        D) [Option D]
        Correct Answer: [The letter of the correct option]

        Ensure that the questions are diverse and cover different aspects of the ${category} category.`;

    try {
        const response = await axios.post(API_URL, {
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const content = response.data.choices[0].message.content;
        return parseQuestions(content);
    } catch (error) {
        console.error('Error generating questions:', error);
        return [];
    }
};

// Helper function to parse GPT-4 response into question objects
const parseQuestions = (content) => {
    const questionBlocks = content.split('\n\n');
    return questionBlocks.map((block, index) => {
        const lines = block.split('\n');
        const question = lines[0].replace('Question: ', '');
        const options = lines.slice(1, 5).map(line => line.substring(3));
        const correctAnswer = lines[5].replace('Correct Answer: ', '');
        return {
            id: `q${index + 1}`,
            question,
            options,
            correctAnswer
        };
    });
};

// Function to submit an answer and check if it's correct
export const submitAnswer = async (userId, questionId, answer) => {
    const answerRef = ref(database, `battles/${userId}/answers/${questionId}`);
    await set(answerRef, answer);

    // In a real app, you'd check the answer against the correct answer stored in the database
    // For now, we'll just return a mock result
    const correct = Math.random() < 0.5;
    return { correct };
};