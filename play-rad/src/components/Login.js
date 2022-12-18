import React from "react";
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=222026c437384544b7fb802e7dbba16c&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";
export function Login() {
  return (
    <section className="flex items-center justify-center w-screen h-screen">
      <a
        href={AUTH_URL}
        className="flex bg-teal-700  text-slate-100 font-bold text-xl py-4 px-3 rounded-sm hover-bg-teal-300"
      >
        Login with Spotify
      </a>
    </section>
  );
}
