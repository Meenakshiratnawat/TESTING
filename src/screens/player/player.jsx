import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import SongCard from "../../components/songCard";
import Queue from "../../components/queue";
import AudioPLayer from "../../components/audioPlayer";
import Widgets from "../../components/widgets";

export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

 
  useEffect(() => {
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          // console.log(res.data.items)
          setTracks(res.data.items);
          setCurrentTrack(res.data?.items[0]?.track);
        });
    }
  }, [location.state]);
  // console.log(location.state);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
// console.log(token);
    fetch("https://api.spotify.com/v1/tracks?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
        
      }
      return response.json();
    })
    .then(data => {
      console.log(data.tracks[0]?.album?.artists[0]?.id); // Handle the response data here

      // setTracks(data.tracks);
  // console.log(data);
  setTracks(data.tracks);
// console.log(data.tracks[0].preview_url)
    setCurrentTrack(data.tracks[0]);

    })
    .catch(error => {
      console.error("There was a problem with your fetch operation:", error);
    });
    
  


  }, []);

  useEffect(() => {
    // console.log(tracks[currentIndex]);

    // Check if tracks[currentIndex]?.track exists
    if (tracks[currentIndex]?.track) {
        // console.log(tracks[currentIndex]?.track);
        setCurrentTrack(tracks[currentIndex]?.track);
    } else {
        // console.log(tracks[currentIndex]);
        setCurrentTrack(tracks[currentIndex]);
    }

}, [currentIndex, tracks]);
console.log(currentTrack);
console.log(tracks);



  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        <AudioPLayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
      </div>
      <div className="right-player-body">
        <SongCard album={currentTrack?.album} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}