// unlock.js

const TIME_LIMIT = 24 * 60 * 60 * 1000; // 24 hours in ms
const ACCESS_KEY = "unlockedAccessTime"; // key for localStorage

function formatTime(ms) {
  const h = Math.floor(ms / (1000 * 60 * 60));
  const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((ms % (1000 * 60)) / 1000);
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
  const lockModal = document.getElementById("lockModal");
  const lectureList = document.getElementById("lectureList");
  const timer = document.getElementById("timer");

  if (lockModal) lockModal.style.display = "none";
  if (lectureList) lectureList.style.display = "block";

  if (timer) {
    startCountdown(expiryTime, timer, () => {
      localStorage.removeItem(ACCESS_KEY);
      location.reload(); // Reload page after expiry
    });
  }
}

function checkUnlock(SHORT_LINK) {
  const urlParams = new URLSearchParams(window.location.search);
  const now = Date.now();
  const savedTime = localStorage.getItem(ACCESS_KEY);

  if (urlParams.get("unlocked") === "true") {
    // Save current time
    localStorage.setItem(ACCESS_KEY, now.toString());

    // Remove ?unlocked=true from the URL without reloading
    window.history.replaceState({}, document.title, window.location.pathname);

    unlockPage(now + TIME_LIMIT);
  } else if (savedTime && now - parseInt(savedTime) < TIME_LIMIT) {
    const remainingTime = TIME_LIMIT - (now - parseInt(savedTime));
    unlockPage(now + remainingTime);
  } else {
    // Lock screen
    const lockModal = document.getElementById("lockModal");
    const lectureList = document.getElementById("lectureList");
    const timer = document.getElementById("timer");

    if (lockModal) lockModal.style.display = "flex";
    if (lectureList) lectureList.style.display = "none";
    if (timer) timer.style.display = "none";
  }
}

function redirectToShortLink(SHORT_LINK) {
  window.location.href = SHORT_LINK;
}     