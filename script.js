document.addEventListener("DOMContentLoaded", () => {

    const sendBtn = document.getElementById("sendBtn");
    const userInput = document.getElementById("userInput");
    const chatMessages = document.getElementById("chatMessages");
    const themeToggle = document.getElementById("themeToggle");

    // DARK MODE
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️ Light Mode";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙 Dark Mode";
        }
    });

    // CHAT
    function addMessage(text, className){
        const msg = document.createElement("div");
        msg.className = className;
        msg.textContent = text;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getResponse(q){

        const lower = q.toLowerCase();

        if(["hi","hello","hey"].includes(lower)){
            return "Hello! 👋";
        }

        if(lower.includes("teel")){
            return "TEEL = Topic, Explanation, Evidence, Link";
        }

        if(/^[0-9+\-*/(). xX]+$/.test(q)){
            try{
                const result = Function("return " + q.replace(/x/gi,"*"))();
                return result.toString();
            }catch{
                return "Math error!";
            }
        }

        return "I don't know that yet.";
    }

    function sendMessage(){

        const text = userInput.value.trim();
        if(!text) return;

        addMessage(text, "user-message");

        const reply = getResponse(text);

        setTimeout(() => {
            addMessage(reply, "bot-message");
        }, 300);

        userInput.value = "";
    }

    sendBtn.addEventListener("click", sendMessage);

    userInput.addEventListener("keydown", (e) => {
        if(e.key === "Enter"){
            sendMessage();
        }
    });

});