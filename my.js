window.saveDataAcrossSessions = true;

const loader = document.querySelector('.loader');
const outerLoader = document.querySelector('.outer-loader');
const app = document.querySelector('.app');
const musicboxes = app.querySelectorAll('.music');

setTimeout(() => {
  loader.classList.add('removed');
  loader.addEventListener('transitionend', () => {
    loader.remove();
    outerLoader.remove();
  });
}, 4000);

const audios = new Array(musicboxes.length);

for(let i = 0; i < musicboxes.length; ++i)
  audios[i] = new Audio("sounds/" + (i + 1) + ".wav");


// console.log(audios);

musicboxes.forEach((musicBox, idx) => musicBox.id = "box" + String(idx));

app.addEventListener('click', e => {
  if(e.target && e.target.classList.contains('music')) {
    showPlaying(e.target);
    const id = parseInt(e.target.id.substr(3));
    audios[id].play();
  }
});


function showPlaying(musicBox) {
  musicBox.classList.add('playing');
  setTimeout(() => {
    musicBox.classList.remove('playing');
  }, 1200);
}

webgazer.setGazeListener((data, _timestamp) => {

  if(data == null)
    return;

  const currentlySeeingElement = document.elementFromPoint(data.x, data.y);

  if(currentlySeeingElement == null)
    return;

  if(!currentlySeeingElement.classList.contains("music"))
    return;

  const idString = currentlySeeingElement.id.substr(3); // eg: 'box12' -> '12'
  const id = parseInt(idString);

  if(audios[id] && audios[id].paused) {
    showPlaying(currentlySeeingElement);
    audios[id].play();
  }

}).begin();

