export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "https://spotify-at.netlify.app/";

const clientId = "ef836a05a64643859266de498a0e7a3d";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "playlist-read-private",
   
];

export const getTokenFromUrl = ()=>{
    return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item)=>{
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);

        return initial;
    },{});
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;