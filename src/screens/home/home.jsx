import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "../library/library";
import Player from '../player/player';
import Favorites from '../favorites/favorites';
import Feed from '../feed/feed';
import Trending from '../trending';
import Sidebar from '../../components/sidebar/sidebar';
import "./home.css"
import { setClientToken } from "../../spotify";

import Login from '../auth/login';
export default function Home() {
  
    const [token, setToken] = useState("");
    useEffect(() => {
      const token = window.localStorage.getItem("token");
console.log(token);
      fetch("https://api.spotify.com/v1/me/player/currently-playing", {
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
        console.log(data); // Handle the response data here
      })
      .catch(error => {
        console.error("There was a problem with your fetch operation:", error);
      });
      
    


    }, []);
  
    useEffect(() => {
      const token = window.localStorage.getItem("token");
      const hash = window.location.hash;
      console.log(hash)
      window.location.hash = "";
      if (!token && hash) {
        const _token = hash.split("&")[0].split("=")[1];
        window.localStorage.setItem("token", _token);
        setToken(_token);
        setClientToken(_token);
      } else {
        setToken(token);
        setClientToken(token);
      }
    }, []);
  
    return !token ? (
      <Login />
    ) : (
    <BrowserRouter>
    <div className="main-body">
    <Sidebar/>

    <Routes>
    <Route path="/" element={<Library />} />
    <Route path="/feed" element={<Feed/>} />
    {/* <Route path="/trending" element={<Trending/>} /> */}
    <Route path="/player" element={<Player/>} />
    <Route path="/favorites" element={<Favorites/>} />

    </Routes>
    </div>
    
    </BrowserRouter>
  )
}

