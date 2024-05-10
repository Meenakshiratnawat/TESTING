import React,{useEffect,useState  } from 'react'
import APIKit from "../../spotify";
import "./favorites.css";
export default function Favorites() {
  const [album, setAlbum] = useState(null);

useEffect(() => {
  APIKit.get("https://api.spotify.com/v1/me/tracks?offset=0&limit=20&locale=en-GB,en-US;q=0.9,en;q=0.8").then(function (response) {
    setAlbum(response.data.items);
console.log(response.data.items)

  });
}, []);
 


return (
    <div className="screen-container">
        <div><h1 className="library-title">Your Favorites</h1></div>

    <div className="library-body">
      {album?.map((album) => (

        <div
          className="playlist-card"
          key={album.id}
        >
          <img
            src={album.track.album.images[0].url}
            className="playlist-image"
            alt="Playlist-Art"
          />
          <p className="playlist-title">{album.track.name}</p>
          <div className="playlist-fade">
           
          </div>
        </div>
      ))}
    </div>
  </div> 
   )
}
