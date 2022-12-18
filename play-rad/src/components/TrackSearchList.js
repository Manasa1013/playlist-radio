import React from "react";
import { Link } from "react-router-dom";
export const TrackSearchList = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
    console.log(track, "at track choose");
  };
  return (
    <li
      className="flex m-2 items-center cursor-pointer"
      key={track.uri}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} width="64" height="64" alt={track.title} />
      <div className="ml-3">
        <div className="">{track.title}</div>
        <div className="text-slate-400 text-xs">{track.artist}</div>
      </div>
    </li>
  );
};
