import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import { TrackSearchList } from "./TrackSearchList";
import { Player } from "./Player";
export const Dashboard = (code) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState("");

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
  }
  const spotifyApi = useMemo(
    () => new SpotifyWebApi({ clientId: "222026c437384544b7fb802e7dbba16c" }),
    []
  );
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    //eslint-disable-next-line
  }, [accessToken]);
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false;

    spotifyApi
      .searchTracks(search)
      .then((res) => {
        if (cancel) return;
        console.log(res, "at search results");
        console.log(res.body.tracks.items, "at search tracks");
        setSearchResults(() => {
          try {
            return res.body.tracks.items.map((track) => {
              const smallestAlbumImage = track?.album?.images?.reduce(
                (smallest, image) => {
                  if (image.height < smallest.height) return image;
                  return smallest;
                },
                track.album.images[0] ? track.album.images[0] : ""
              );
              return {
                artist: track.artists[0].name ? track.artists[0].name : "",
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
              };
            });
          } catch (err) {
            console.error("error while fetching particular song");
          }
        });
      })
      .catch((err) => {
        console.error("error at setting search results");
      });
    return () => (cancel = true);
    //eslint-disable-next-line
  }, [search, accessToken]);
  return (
    <div className="flex flex-col h-screen ">
      <section className="flex items-center justify-center w-full outline-transparent rounded-sm">
        <input
          type={`search`}
          className="w-4/5 py-3 px-3 md:w-2/3 outline-transparent border-teal-700 rounded-sm border-2"
          placeholder="Search songs/artists"
          value={search}
          onInput={(e) => {
            setSearch(e.target.value);
          }}
        />
      </section>
      <div className="flex grow my-2 overflow-y-auto">
        <ul>
          {searchResults.map((track) => {
            return (
              <TrackSearchList
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            );
          })}
        </ul>
      </div>
      <div className="bottom">
        <Player
          accessToken={accessToken}
          spotifyApi={spotifyApi}
          trackUri={playingTrack?.uri}
        />
      </div>
    </div>
  );
};
