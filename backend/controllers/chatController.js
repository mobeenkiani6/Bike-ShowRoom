const axios = require('axios');
const { WEBHOOK_URL } = require('../config/webhookConfig');

// Handle chat message and forward to n8n webhook
const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;

        // Validate message
        if (!message || typeof message !== 'string' || !message.trim()) {
            return res.status(400).json({
                error: 'Invalid message',
                response: 'Please provide a valid message.'
            });
        }

        console.log(`[Chat] Received message: "${message}"`);

        // Send message to n8n webhook
        const webhookResponse = await axios.post(WEBHOOK_URL, {
            message: message.trim(),
            timestamp: new Date().toISOString(),
            source: 'chatbot'
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000 // 10 second timeout
        });

        console.log('[Chat] n8n response received');

        // Extract response from webhook
        let botResponse = 'Thank you for your message!';

        if (webhookResponse.data) {
            // Handle different response formats from n8n
            if (typeof webhookResponse.data === 'string') {
                botResponse = webhookResponse.data;
            } else if (webhookResponse.data.response) {
                botResponse = webhookResponse.data.response;
            } else if (webhookResponse.data.message) {
                botResponse = webhookResponse.data.message;
            } else if (webhookResponse.data.text) {
                botResponse = webhookResponse.data.text;
            } else {
                // If response is an object, try to stringify it nicely
                botResponse = JSON.stringify(webhookResponse.data, null, 2);
            }
        }

        // Send response back to frontend
        res.json({
            success: true,
            response: botResponse,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('[Chat] Error:', error.message);

        // Handle different error types
        if (error.code === 'ECONNABORTED') {
            return res.status(504).json({
                error: 'Request timeout',
                response: 'Sorry, the request took too long. Please try again.'
            });
        }

        if (error.response) {
            // Webhook returned an error
            console.error('[Chat] Webhook error:', error.response.status, error.response.data);

            // Fallback for when n8n is offline or test webhook is not active
            if (error.response.status === 404) {
                return res.json({
                    success: true,
                    response: "I am currently in test mode and my brain (n8n workflow) is inactive. Please activate the workflow or try again later.",
                    timestamp: new Date().toISOString()
                });
            }

            return res.status(500).json({
                error: 'Webhook error',
                response: 'Sorry, I encountered an error processing your request. Please try again later.'
            });
        }

        if (error.request) {
            // No response received from webhook
            console.error('[Chat] No response from webhook');
            return res.json({
                success: true,
                response: "I'm having trouble reaching my brain strictly right now. Please check back later!",
                timestamp: new Date().toISOString()
            });
        }

        // Other errors
        res.status(500).json({
            error: 'Internal server error',
            response: 'Sorry, something went wrong. Please try again later.'
        });
    }
};

// Health check endpoint
const healthCheck = (req, res) => {
    res.json({
        status: 'ok',
        service: 'chatbot-api',
        webhook: WEBHOOK_URL ? 'configured' : 'not configured',
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    sendMessage,
    healthCheck
};
