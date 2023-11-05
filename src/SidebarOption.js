import React from 'react';
import "./SidebarOption.css";
import { useDataLayerValue } from './DataLayer';
import SpotifyWebApi from 'spotify-web-api-js';


const spotify = new SpotifyWebApi();

function SidebarOption({ title, Icon, id }) {

  const [{ discover_weekly, token }, dispatch] = useDataLayerValue();

  spotify.setAccessToken(token);

  //11dFghVXANMlKmJXsNCbNl
  function home() {

    spotify.getPlaylist('37i9dQZEVXcCAL4Q4viVu2').then(response => {
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: response,
      })
    })
  }

  function playlistClicked(id) {
    console.log(id);
    spotify.getPlaylist(id).then(response => {
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: response,
      })
    })
  }
  return (
    <div className='sidebarOption'>
      {Icon && <Icon className="sidebarOption_icon" />}
      {Icon ? <h4 onClick={home}>{title}</h4> : <p onClick={() => spotify.getPlaylist(id).then(response => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      })}>{title}</p>}
    </div>
  );
}

export default SidebarOption
