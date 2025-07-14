// unlock.js

const TIME_LIMIT = 24 * 60 * 60 * 1000; // 24 hours in ms

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

function checkUnlock(SHORT_LINK, ACCESS_KEY) {
  const urlParams = new URLSearchParams(window.location.search);
  const savedTime = localStorage.getItem(ACCESS_KEY);
  const now = Date.now();

  const lockModal = document.getElementById("lockModal");
  const lectureList = document.getElementById("lectureList");
  const timer = document.getElementById("timer");

  function unlockPage() {
    if (lockModal) lockModal.style.display = "none";
    if (lectureList) lectureList.style.display = "block";
    startCountdown(now + TIME_LIMIT, timer, () => {
      localStorage.removeItem(ACCESS_KEY);
      location.reload();
    });
  }

  if (urlParams.get("unlocked") === "true") {
    localStorage.setItem(ACCESS_KEY, now.toString());
    unlockPage();
  } else if (savedTime && now - parseInt(savedTime) < TIME_LIMIT) {
    unlockPage();
  } else {
    if (lockModal) lockModal.style.display = "flex";
    if (lectureList) lectureList.style.display = "none";
    if (timer) timer.style.display = "none";
  }
}

function redirectToShortLink(SHORT_LINK) {
  window.location.href = SHORT_LINK;
}
