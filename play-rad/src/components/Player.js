import React, { useEffect } from "react";
import ReactAudioPlayer from "react-audio-player"; //...

export const Player = ({ accessToken, trackUri }) => {
  if (!accessToken) return null;

  return (
    <div className="flex">
      <ReactAudioPlayer src={trackUri} autoPlay controls />
    </div>
  );
};
