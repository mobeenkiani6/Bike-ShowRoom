const express = require('express');
const router = express.Router();
const { sendMessage, healthCheck } = require('../controllers/chatController');

// POST /api/chat/message - Send a message to the chatbot
router.post('/message', sendMessage);

// GET /api/chat/health - Health check
router.get('/health', healthCheck);

module.exports = router;
