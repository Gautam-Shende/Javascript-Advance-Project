document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chat-form");
    const chatMessages = document.getElementById("chat-messages");
    const msgInput = document.getElementById("msg");

    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const msg = msgInput.value.trim();

        if (msg) {
            outputMessage(`<i class="fas fa-user"></i> You`, msg);

            msgInput.value = '';
            msgInput.focus();

            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                const botReply = getBotReply(msg);
                outputMessage(`<i class="fas fa-robot"></i> AI Bot`, botReply);

                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    });

    function outputMessage(sender, message) {
        const div = document.createElement("div");
        div.classList.add("message");
        
        div.innerHTML = `
            <p class="meta"> ${sender} <span>9:12 PM</span></p>
            <p class="text"> ${message} </p>`;

        chatMessages.appendChild(div);
    }

    function getBotReply(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        if (lowerCaseMessage.includes("hello")) {
            return "Hello! How can I help you today?";
        } else if (lowerCaseMessage.includes("how are you")) {
            return "I'm just a bot, but I'm doing great! How about you?";
        } else if (lowerCaseMessage.includes("your name")) {
            return "I'm ChatBot, your virtual assistant.";
        } else if (lowerCaseMessage.includes("help")) {
            return "Sure! What do you need help with?";
        } else {
            return "I'm sorry, I didn't understand that. Could you please rephrase?";
        }
    }
});
