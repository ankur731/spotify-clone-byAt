import { useEffect } from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi();

function App() {


  const [{ token }, dispatch] = useDataLayerValue();
  

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token
      });


      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });

      })
      .catch((err) => {
        console.log(err);
      })

      spotify.getUserPlaylists().then((playlists) => {
        console.log(playlists)
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      })
      .catch((err) => {
        console.log(err);
      })
    

      spotify.getMyCurrentPlaybackState().then(state=>{
        dispatch({
          type:'SET_STATE',
          State:"false",
        });
      })
      .catch((err) => {
        console.log(err);
      })
      
      

      spotify.getMyCurrentPlayingTrack().then((track) => {
        dispatch({
          type: 'SET_TRACK',
          track: track,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      
//chandbaliye 6Y3tQyTvtOrsoaL9kQCzPM discover weekly 


      spotify.getPlaylist('37i9dQZF1DX14CbVHtvHRB').then(response=>{
        dispatch({
          type:"SET_DISCOVER_WEEKLY",
          discover_weekly:response,
        })
      })
      .catch((err) => {
        console.log(err);
      })
    }
  });


  return (
    <div className="app">{token ? <Player /> : <Login />} </div>
  );
}

export default App;
