const TIME_LIMIT = 24 * 60 * 60 * 1000; // 24 hours
let PAGE_ID = window.PAGE_ID || "default"; // 👈 must be set in HTML
const ACCESS_KEY = "unlockedAccessTime_" + PAGE_ID;

function formatTime(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${h}h ${m}m ${s}s`;
}

function startCountdown(expiry, timerElement, onExpire) {
  timerElement.style.display = 'block';
  const interval = setInterval(() => {
    const now = Date.now();
    const diff = expiry - now;
    if (diff <= 0) {
      clearInterval(interval);
      onExpire();
    } else {
      timerElement.innerText = "Access expires in: " + formatTime(diff);
    }
  }, 1000);
}

function unlockPage(expiryTime) {
  document.getElementById("lockModal").style.display = "none";
  document.getElementById("lectureList").style.display = "block";

  const timer = document.getElementById("timer");
  if (timer) {
    startCountdown(expiryTime, timer, () => {
      localStorage.removeItem(ACCESS_KEY);
      location.reload();
    });
  }
}

function checkUnlock() {
  const urlParams = new URLSearchParams(window.location.search);
  const now = Date.now();
  const savedTime = localStorage.getItem(ACCESS_KEY);

  if (urlParams.get("unlocked") === "true") {
    localStorage.setItem(ACCESS_KEY, now.toString());
    window.history.replaceState({}, document.title, window.location.pathname);
    unlockPage(now + TIME_LIMIT);
  } else if (savedTime && now - parseInt(savedTime) < TIME_LIMIT) {
    const remainingTime = TIME_LIMIT - (now - parseInt(savedTime));
    unlockPage(now + remainingTime);
  } else {
    document.getElementById("lockModal").style.display = "flex";
    document.getElementById("lectureList").style.display = "none";
    document.getElementById("timer").style.display = "none";
  }
}

function redirectToShortLink(SHORT_LINK) {
  window.location.href = SHORT_LINK;
}
