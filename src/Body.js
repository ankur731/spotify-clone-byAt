import React from 'react';
import "./Body.css";
import Header from './Header';
import { useDataLayerValue } from './DataLayer';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from './SongRow';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import SpotifyWebApi from 'spotify-web-api-js';


const Spotify = new SpotifyWebApi();


function Body({spotify}) {

    const[{discover_weekly, token}] = useDataLayerValue();

    Spotify.setAccessToken(token);
    

    

  return (
    <div className='body'>
      <Header spotify={spotify} />
      <div className='body__info'>
        <img src={discover_weekly?.images[0].url} alt='discover weekly' />
        <div className='body__infoText'>
          <strong>PLAYLIST</strong>
          <h2>{discover_weekly?.name}</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className='body__songs'>
        <div className='body__icons'>

          <PlayCircleOutlineIcon fontSize='large'  className='body__shuffle' />
          <FavoriteIcon fontSize='large'/>
          <MoreHorizIcon />
        </div>
        <div className='songRow_topBar'>
        <h2>Title</h2>
        <h2>Album</h2>
        <QueryBuilderIcon />
      </div>
      <hr />
      
        {discover_weekly?.tracks.items.map(item=>
          <SongRow track={item.track} />
        )}
       
      </div>
    </div>
  );
}
export default  Body;
