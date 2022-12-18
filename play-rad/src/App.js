import { Login } from "./components/Login";
import { BACKEND } from "./utils/constants";
import { useEffect } from "react";
import axios from "axios";
import { Dashboard } from "./components/Dashboard";
export default function App() {
  useEffect(() => {
    async function getToken() {
      try {
        let result = await axios.get(BACKEND);
        // console.log(result);
        if (result.status === 200) {
          // console.log(result);
        }
      } catch (err) {
        console.error(err, "at getToken method while fetching");
      }
    }
    getToken();
    //eslint-disable-next-line
  }, []);
  const code = new URLSearchParams(window.location.search).get("code");
  console.log(code);
  return (
    <div className="App">
      {code?.length > 0 ? <Dashboard code={code} /> : <Login />}
    </div>
  );
}
