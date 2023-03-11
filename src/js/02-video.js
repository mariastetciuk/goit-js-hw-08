import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_PLAYER_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlayerTimeupdate, 1000));

function onPlayerTimeupdate(data) {
  const currenTime = data.seconds;

  localStorage.setItem(STORAGE_PLAYER_KEY, currenTime);
}

player.setCurrentTime(localStorage.getItem(STORAGE_PLAYER_KEY) || 0);
