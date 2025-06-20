function initQuestion(options, correctAnswer) {
  const container = document.getElementById('optionsContainer');
  const nextBtn = document.getElementById('nextBtn');
  const timerDiv = document.getElementById('timer');

  options.forEach(opt => {
    const div = document.createElement('div');
    div.className = "option";
    div.innerText = opt;
    div.onclick = () => {
      if (opt === correctAnswer) {
        let seconds = 5;
        timerDiv.innerText = "Please wait " + seconds + " seconds...";
        const interval = setInterval(() => {
          seconds--;
          timerDiv.innerText = "Please wait " + seconds + " seconds...";
          if (seconds === 0) {
            clearInterval(interval);
            nextBtn.style.display = "inline-block";
            timerDiv.innerText = "✅ Correct! Click Next.";
          }
        }, 1000);
      } else {
        alert("❌ Wrong answer. Try again!");
      }
    };
    container.appendChild(div);
  });
}