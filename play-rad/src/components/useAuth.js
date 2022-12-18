import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND } from "../utils/constants";
export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  useEffect(() => {
    axios
      .post(`${BACKEND}/login`, { code })
      .then((res) => {
        console.log(res.data, res.status, "response data at login");
        if (res.status === 200) {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);
        }
        window.history.pushState({}, null, "/");
      })
      .catch((err) => {
        console.error(err, "error at login route posting");
        // window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    let interval = setInterval(() => {
      axios
        .post(`${BACKEND}/refresh`, { refreshToken })
        .then((res) => {
          console.log(res, "res at refresh route");
          if (res.status === 200) {
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
          }
        })
        .catch((err) => {
          console.error(err, "error at refresh ");
          //   window.location("/");
        });
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);
  return accessToken;
}
