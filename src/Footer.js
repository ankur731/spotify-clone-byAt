import React from 'react'
import "./Footer.css";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { Grid, Slider } from '@mui/material';
import { useDataLayerValue } from './DataLayer';
import SpotifyWebApi from 'spotify-web-api-js';
import DevicesIcon from '@mui/icons-material/Devices';


const spotify = new SpotifyWebApi();

function Footer() {

  const [{ track, token, State }, dispatch] = useDataLayerValue();
  const [currentTime, setCurrentTime] = React.useState("0:00");
  const [duration, setDuration] = React.useState("0:00");



  spotify.setAccessToken(token);

  React.useEffect(() => {

    spotify.getMyCurrentPlayingTrack().then((track) => {
      dispatch({
        type: 'SET_TRACK',
        track: track,
      });
    })
    .catch((err) => {
      console.log(err);
    })

    var totalMin = Math.floor((track?.item?.duration_ms / 60000).toFixed(2));
    var totalSec = Math.floor((track?.item?.duration_ms % 60000).toFixed(2));
    totalSec = totalSec.toString().slice(0, 2);

    setDuration(`${totalMin}:${totalSec}`);
    var curMin = Math.floor((track?.progress_ms / 60000).toFixed(2));
    var curSec = Math.floor((track?.progress_ms % 60000).toFixed(2));

    if (curSec > 600000) {
      curMin = curMin + 1;
      curSec = 1;
    }
    if (curSec < 9999) {
      curSec = `0${curSec}`
    }

    curSec = curSec.toString().slice(0, 2);
    setCurrentTime(`${curMin}:${curSec}`);

  },[track, dispatch])

  function handleChange(event) {
    spotify.seek(event.target.value)

  }
  


  function changePlaybackState() {


    const state = State ? "play" : "pause";
    if (state === 'play')
      spotify.play();
    else
      spotify.pause();

    dispatch({
      type: "SET_STATE",
      State: !State
    })
  };


  function changeTrack(type) {

    if (type === 'next') {
      spotify.skipToNext()
    }
    else if (type === 'previous') {
      spotify.skipToPrevious()
    }
  }
  function repeat() {
    spotify.getMyCurrentPlaybackState()
      .then((res) => {
        if (res.repeat_state === "track") {
          spotify.setRepeat("off")
          spotify.setShuffle(true);
        }
        else {
          spotify.setRepeat("track")
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function shuffle() {

    spotify.getMyCurrentPlaybackState()
      .then((res) => {
       if(res.shuffle_state) {
        spotify.setShuffle(false)
       }
       else {
        spotify.setShuffle(true)
       }
      })
      .catch((err) => {
        console.log(err);
      })
  }





  return (
    <div className='footer'>
      <div className="footer__left">
        <img className='footer__albumLogo' src={track?.item?.album.images[0].url} alt='' />
        <div className='footer__songInfo'>
          <h5>{track?.item?.name}</h5>
          <p>{track?.item?.artists[0].name}</p>
        </div>
      </div>
      <div className='footer_center_div'>
        <div className="footer__center">
          <ShuffleIcon onClick={shuffle} className='footer__green' />
          <SkipPreviousIcon onClick={() => changeTrack("previous")} className='footer__icon' />
          {State ? <PlayCircleOutlineIcon fontSize='large' onClick={changePlaybackState} className='footer__icon' /> : <PauseCircleOutlineIcon fontSize='large' onClick={changePlaybackState} className='footer__icon' />}

          <SkipNextIcon onClick={() => changeTrack("next")} className='footer__icon' />
          <RepeatIcon onClick={repeat} className='footer__green' />
        </div>
        <div className='time_indicator'>

          <p>{currentTime}</p>
          <Slider className='song_range' aria-label="time-indicator"
            size="small"
            onChange={handleChange}
            value={50}
            min={0}
            max={track?.item?.duration_ms}
            sx={{
              color: '#fff',
              height: 4,
              '& .MuiSlider-thumb': {
                display: 'none',
              },
            }}
          />
          <p>{duration}</p>
        </div>

      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <DevicesIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider min={0}
              max={100}
              defaultValue={50}
              onChangeCommitted={(event, newValue) => { spotify.setVolume(newValue) }} />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Footer
