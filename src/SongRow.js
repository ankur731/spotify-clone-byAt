import React from 'react';
import "./SongRow.css";
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './DataLayer';



const spotify = new SpotifyWebApi();
function SongRow({track}) {
     const [{token}]  = useDataLayerValue();
     
     spotify.setAccessToken(token);
      


  return (<div>
      <div className='songRow'>

          <div className='songRow__info'>
              <img className='songRow__album' src={track.album.images[0].url} alt='' />
              <div className='songRow__track'>
                <h4>{track.name}</h4>
                <p>
                  {track.artists.map((artist) => artist.name).join(", ").substr(0,20)}
                </p>
              </div>
          </div>
          <p className='album'>{track.album.name}</p>
          <p className=''>{((Math.floor(track.duration_ms/1000))/60).toFixed(2)}</p>
      </div>
  </div>
  )
}

export default SongRow
