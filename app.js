const episodeCount = 1;
const frameCount = 22;
let usedFrames = new Set();
let ans;
const episodes = [
  { number: 1, title: "Help Wanted" },
  { number: 2, title: "Reef Blower" },
  { number: 3, title: "Tea at the Treedome" },
  { number: 4, title: "Bubblestand" },
  { number: 5, title: "Ripped Pants" },
  { number: 6, title: "Jellyfishing" },
  { number: 7, title: "Plankton!" },
  { number: 8, title: "Naughty Nautical Neighbors" },
  { number: 9, title: "Boating School" },
  { number: 10, title: "Pizza Delivery" },
  { number: 11, title: "Home Sweet Pineapple" },
  { number: 12, title: "Mermaid Man and Barnacle Boy" },
  { number: 13, title: "Pickles" },
  { number: 14, title: "Hall Monitor" },
  { number: 15, title: "Jellyfish Jam" },
  { number: 16, title: "Sandy's Rocket" },
  { number: 17, title: "Squeaky Boots" },
  { number: 18, title: "Nature Pants" },
  { number: 19, title: "Opposite Day" },
  { number: 20, title: "Culture Shock" },
  { number: 21, title: "F.U.N." },
  { number: 22, title: "MuscleBob BuffPants" },
  { number: 23, title: "Squidward the Unfriendly Ghost" },
  { number: 24, title: "The Chaperone" },
  { number: 25, title: "Employee of the Month" },
  { number: 26, title: "Scaredy Pants" },
  { number: 27, title: "I Was a Teenage Gary" },
  { number: 28, title: "SB-129" },
  { number: 29, title: "Karate Choppers" },
  { number: 30, title: "Sleepy Time" },
  { number: 31, title: "Suds" },
  { number: 32, title: "Valentine's Day" },
  { number: 33, title: "The Paper" },
  { number: 34, title: "Arrgh!" },
  { number: 35, title: "Rock Bottom" },
  { number: 36, title: "Texas" },
  { number: 37, title: "Walking Small" },
  { number: 38, title: "Fools in April" },
  { number: 39, title: "Neptune's Spatula" },
  { number: 40, title: "Hooky" },
  { number: 41, title: "Mermaid Man and Barnacle Boy II" },
];
console.log(usedFrames);
const timeLimits = {
  easy: 30,
  medium: 20,
  hard: 10,
};

document.getElementById("startButton").addEventListener("click", () => {
  const difficulty = document.getElementById("difficulty").value;

  startGame(timeLimits[difficulty]);

  console.log("The difficulty is ", difficulty);
  console.log("The time limit is ", timeLimits[difficulty]);
});

function startGame(timeLimit) {
  let score = 0;
  let timeLeft = timeLimit;
  let imagePath = getRandomFrame();
  document.getElementById("app").innerHTML = `
        <h2>Score: <span id="score">0</span></h2>
        <h2>Time Left: <span id="timer">${timeLeft}</span> seconds</h2>
        <img id="gameImage" src="${imagePath}" alt="Spongebob Frame" />
        <select id="choicesDropdown">
        </select>
        <button id="submitButton">Submit</button>
    `;

  const choicesDropdown = document.getElementById("choicesDropdown");
  episodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.number;
    option.textContent = `E${episode.number}: ${episode.title}`;
    choicesDropdown.appendChild(option);
  });

  // Initialize Choices.js after populating options
  const choices = new Choices("#choicesDropdown", {
    searchEnabled: true,
    removeItemButton: true,
    placeholder: true,
    placeholderValue: "Select an episode...",
  });

  const timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      endGame(score);
    }
  }, 1000);

  document
    .getElementById("submitButton")
    .addEventListener("click", function () {
      const userAnswer = parseInt(
        document.getElementById("choicesDropdown").value
      );
      console.log("123");
      if (userAnswer === ans) {
        score++;
        document.getElementById("score").textContent = score;
        let newImagePath = getRandomFrame();
        if (usedFrames.size < episodeCount * frameCount) {
          // Load next image and reset timer
          document.getElementById("gameImage").src = newImagePath;
          timeLeft = timeLimit;
          // To reset the dropdown value
          choices.removeActiveItems();
        } else {
          clearInterval(timerInterval);
          endGame(score);
        }
      }
      // Let's make it so they have infinite guesses within the time limit
      // } else {
      //   clearInterval(timerInterval);
      //   endGame(score);
      // }
    });
} //end of startGame()

//Issue: Need to avoid repeating the same frame!! Done
// Issue: What happens if the person does all of the frames and we run out????
function getRandomFrame() {
  console.log(usedFrames);
  let randomEpisode = Math.floor(Math.random() * episodeCount) + 1;
  let randomFrame = Math.floor(Math.random() * frameCount) + 1;
  let currentImgPath = `./images/E${randomEpisode}/F${randomFrame}.png`;
  // Make sure we are not reusing the same frame
  while (usedFrames.has(currentImgPath)) {
    randomEpisode = Math.floor(Math.random() * episodeCount) + 1;
    randomFrame = Math.floor(Math.random() * frameCount) + 1;
    currentImgPath = `./images/E${randomEpisode}/F${randomFrame}.png`;
  }
  ans = randomEpisode;

  // Add the image path to what we've seen before
  usedFrames.add(currentImgPath);

  return currentImgPath;
}

function endGame(finalScore) {
  document.getElementById("app").innerHTML = `
      <h1>Game Over</h1>
      <p>That frame was from episode ${ans}</p>
      <br>
      <p>Your final score is: ${finalScore}</p>
      <button id="restartButton">Play Again</button>
  `;

  document
    .getElementById("restartButton")
    .addEventListener("click", function () {
      location.reload();
    });
}

// Music Selection Logic
const musicSelect = document.getElementById("musicSelect");
const audioPlayer = document.getElementById("backgroundMusic");
const audioSource = document.getElementById("audioSource");

// Event listener to change music based on user selection
musicSelect.addEventListener("change", function () {
  const selectedMusic = musicSelect.value; // Get the selected music file

  if (selectedMusic === "none") {
    audioPlayer.src = ""; // Stop current audio
  } else {
    audioPlayer.src = selectedMusic;
    audioPlayer.play(); // Automatically play selected music
  }
});
