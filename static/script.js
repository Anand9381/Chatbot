document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const sendBtn = document.getElementById('send-btn');
    const clearChatBtn = document.getElementById('clear-chat');

    // Focus input on load
    userInput.focus();

    // Format time
    const getTimeString = () => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Auto scroll down
    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Simple markdown parser (for bold, code, newlines)
    const parseMarkdown = (text) => {
        let html = text
            // Escape HTML
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Code block
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            // Inline code
            .replace(/`(.*?)`/g, '<code>$1</code>')
            // Newlines to <br> if not inside pre block
            .split('<pre>').map((part, i) => {
                if (i % 2 === 0) {
                    return part.replace(/\n/g, '<br>');
                }
                return '<pre>' + part;
            }).join('');
            
        return html;
    };

    // Add message to UI
    const addMessage = (content, isUser = false) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = isUser ? content : parseMarkdown(content);
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = getTimeString();
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    };

    // Add typing indicator
    const showTypingIndicator = () => {
        const indicatorDiv = document.createElement('div');
        indicatorDiv.className = 'message bot-message typing-container';
        indicatorDiv.id = 'typing-indicator';
        
        indicatorDiv.innerHTML = `
            <div class="typing-indicator">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
            <div class="message-time">Typing...</div>
        `;
        
        chatMessages.appendChild(indicatorDiv);
        scrollToBottom();
    };

    // Remove typing indicator
    const removeTypingIndicator = () => {
        const indicatorDiv = document.getElementById('typing-indicator');
        if (indicatorDiv) {
            indicatorDiv.remove();
        }
    };

    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const message = userInput.value.trim();
        if (!message) return;
        
        // Disable input while processing
        userInput.value = '';
        userInput.disabled = true;
        sendBtn.disabled = true;
        
        // Add user message
        addMessage(message, true);
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            // Call backend API
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
            
            removeTypingIndicator();
            
            if (response.ok) {
                const data = await response.json();
                addMessage(data.reply);
            } else {
                addMessage("I'm sorry, I encountered an error while trying to respond.");
            }
        } catch (error) {
            removeTypingIndicator();
            console.error('Error:', error);
            addMessage("I'm sorry, I couldn't connect to the server.");
        } finally {
            // Re-enable input
            userInput.disabled = false;
            sendBtn.disabled = false;
            userInput.focus();
        }
    });

    // Clear chat
    clearChatBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the chat history?')) {
            chatMessages.innerHTML = `
                <div class="message bot-message">
                    <div class="message-content">
                        Chat history cleared. How can I help you now?
                    </div>
                    <div class="message-time">${getTimeString()}</div>
                </div>
            `;
        }
    });
});
