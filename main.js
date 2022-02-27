const fileInput = document.querySelector("#file-input");
const fileInputContainer = document.querySelector("#file-input-container");

const player = new Plyr("#player", {
  seekTime: 5,
  autoplay: true,
  keyboard: {
    global: true,
  }
});

player.on('seeked', (e) => {
  const instance = e.detail.plyr;

  const currentTime = instance.currentTime;
  const duration = instance.duration;

  console.log(`Seeked to ${formatTime(currentTime)} of ${formatTime(duration)}`);
})

function formatTime(sec, { withHours = true } = {}) {
  const date = new Date(null);
  date.setSeconds(sec);

  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = Math.floor(sec % 60);

  const hoursString = hours < 10 ? `0${hours}` : hours;
  const minutesString = minutes < 10 ? `0${minutes}` : minutes;
  const secondsString = seconds < 10 ? `0${seconds}` : seconds;

  if (hours > 0 || withHours) {
    return `${hoursString}:${minutesString}:${secondsString}`;
  }

  return `${minutesString}:${secondsString}`;
}

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  console.log(file);
  const result = startPlayerWithFile(file);

  if (!result) {
    return;
  }

  fileInputContainer.classList.add("hidden");
});

function startPlayerWithFile(file) {
  if (!/video\/\w+/.test(file.type) && !file.name.includes(`.mp4.crdownload`)) {
    return false;
  }

  const blobUrl = URL.createObjectURL(file);
  console.log(blobUrl);

  player.source = {
    type: "video",
    title: file.name,
    sources: [
      {
        src: blobUrl,
        type: file.type,
      },
    ],
  };

  return true;
}

fileInputContainer.addEventListener('dragover', (e) => {
  e.preventDefault();
})

fileInputContainer.addEventListener('drop', (e) => {
  e.preventDefault();

  const file = e.dataTransfer.files[0];
  console.log(file);
  const result = startPlayerWithFile(file);
  console.log(result);

  if (!result) {
    return;
  }

  fileInputContainer.classList.add("hidden");
})

const oldFileInputContainerBackgroundColor = fileInputContainer.style.background;
fileInputContainer.addEventListener('dragenter', (e) => {
  e.target.style.backgroundColor = 'rgba(176, 3, 52, 0.5)';
})

fileInputContainer.addEventListener('dragleave', (e) => {
  e.target.style.backgroundColor = oldFileInputContainerBackgroundColor;
});