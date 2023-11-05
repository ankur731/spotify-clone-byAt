import React from 'react'
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import { useDataLayerValue } from './DataLayer';
import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';


const spotify = new SpotifyWebApi();




//11dFghVXANMlKmJXsNC
function Header() {

  const [{ user, discover_weekly, token }, dispatch] = useDataLayerValue();
  const [value, setValue] = React.useState("");
  const [searchKey, setSearchKey] = React.useState("")
  const [searchTracks, setTracks] = React.useState([])

  spotify.setAccessToken(token);
  function handleChange(event) {
    // 👇 Store the input value to local state
    setSearchKey(event.target.value);

  };

   function handleKeyEvent(event) {
    // if (event.key === 'Enter') {
    //   spotify.searchTracks(searchKey).then((tracks)=>{
    //     dispatch({
    //       type: "SET_SEARCH_TRACKS",
    //       searchTracks: tracks,
    //     })
    //     dispatch({
    //       type: "SET_DISCOVER_WEEKLY",
    //       discover_weekly: null,
    //     })

    //     console.log(tracks)
    //   })
    // }
   }

  return (
    <div className='header'>
      <div className='header__left'>
        <SearchIcon />
        <input value={searchKey}
          onChange={handleChange} onKeyDown={handleKeyEvent}
          placeholder='Search for Artists, Songs, or Playlist'
          type='text'
        />
      </div>
        <div class="dropdown">
  <button class="dropbtn"><Avatar  sx={{ width: 24, height: 24 }} src={user?.images[0]?.url} alt='avatar' />{user?.display_name} </button>
  <div class="dropdown-content">
    <a href="#">Account</a>
    <a href="#">Profile</a>
    <a href="#">Setting</a>
    <a href="#">Logout</a>
  </div>
</div>
      </div>
  
  )
}

export default Header
