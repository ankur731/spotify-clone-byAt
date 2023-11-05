export const initialState = {
  user: null,
  //Remove after debugging
  //token:"BQA6VHiN9J5jHFTtczTQ2m8AVB7f-v6JvdYlucvOaXQpy08TKuByMIwoJpJ31wwPfeRTYyUPzEEV3g2UtOPRc25L2xoBSSCSIYzfOj_w-B_fECALzrvxW1Q3TtXiNyqwaa6aWcqKS0SmcRk_7M-M6RXewGjXF96rumMz9ct4YHacpOMvD447lvWBohMMCZkwDzCYdPodGwKM5N-Aug",
  playlists: [],
  spotify: null,
  discover_weekly: null,
  top_artists: null,
  playing: false,
  item: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
            ...state,
            token:action.token,
      };
    case "SET_STATE":
      return {
            ...state,
            State:action.State,
      };
    case "SET_PLAYLISTS":
      return {
          ...state,
          playlists:action.playlists,
      };
    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly:action.discover_weekly,
      }
      case "SET_SEARCH_TRACKS":
        return {
          ...state, 
          searchTracks:action.searchTracks,
        }
    case "SET_PLAYLIST_TRACKS":
      return {
        ...state,
        playlistTracks:action.playlistTracks,
      }
    case "SET_TRACK":
      return {
        ...state,
        track:action.track,
      }
    case "SET_PLAYLISTTRACKS":
      return {
        ...state,
        playlistTracks:action.playlistTracks,
      }
    case "SET_SEARCHEDTRACK":
      return {
        ...state,
        Strack:action.Strack,
      }
      
    default:
      return state;
  }
};

export default reducer;