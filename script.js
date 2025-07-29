const messages = [
  "Hi there! What's your name?",
  "How are you feeling today?",
  "What's something that made you smile recently?",
  "Write a message and press Enter to continue."
];

const motivationalQuotes = [
  "You're doing amazing, keep going!",
  "Every step forward matters.",
  "You matter. Your story matters.",
  "Believe in yourself. You've got this!"
];

let currentMessage = 0;
let userReplies = [];
const chatBox = document.getElementById("chatBox");
const inputBox = document.getElementById("inputBox");

function typeMessage(text, callback) {
  let i = 0;
  const p = document.createElement("p");
  chatBox.appendChild(p);
  const interval = setInterval(() => {
    p.textContent += text[i];
    i++;
    chatBox.scrollTop = chatBox.scrollHeight;
    if (i === text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 40);
}

function nextMessage() {
  if (currentMessage < messages.length) {
    typeMessage(messages[currentMessage]);
    currentMessage++;
  } else {
    const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    typeMessage(quote);
    setTimeout(exportToExcel, 2000);
  }
}

inputBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    const reply = inputBox.value.trim();
    if (reply !== "") {
      const replyP = document.createElement("p");
      replyP.textContent = `You: ${reply}`;
      chatBox.appendChild(replyP);
      userReplies.push(reply);
      inputBox.value = "";
      nextMessage();
    }
  }
});

function exportToExcel() {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([
    ["Your Responses"]
  ].concat(userReplies.map(r => [r])));
  XLSX.utils.book_append_sheet(wb, ws, "Replies");
  XLSX.writeFile(wb, "chatbot_replies.xlsx");
}

window.onload = nextMessage;
