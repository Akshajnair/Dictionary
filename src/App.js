import { useRef, useState } from "react";
import Result from "./components/Result";
import { theme } from "./components/Theme";
import "./App.css";

function App() {
  const [keyword, setKeyword] = useState(() => {
    return "";
  });
  const [themeselect, setThemeselect] = useState(() => {
    if (localStorage.getItem("theme")) return localStorage.getItem("theme");
    else return 0;
  });
  const headerselect = useRef("");
  let darkmodetext = () => {
    if (themeselect) {
      return "Light Mode";
    } else {
      return "Dark Mode";
    }
  };
  return (
    <div
      className="App"
      style={{
        backgroundColor: theme[themeselect].body,
        color: theme[themeselect].text,
      }}
    >
      <div className="container">
        {/* night mode button */}
        <div className="nightmode-container">
          <button
            style={{ color: theme[themeselect].text }}
            className="nighmode_button"
            onClick={() => {
              if (themeselect) {
                setThemeselect(0);
                localStorage.setItem("theme", 0);
              } else {
                setThemeselect(1);
                localStorage.setItem("theme", 1);
              }
            }}
          >
            {darkmodetext()}
            <i
              className="fas fa-moon"
              style={{ color: theme[themeselect].text }}
            ></i>
          </button>
        </div>
        {/* title */}
        <div className={"header " + headerselect.current}>
          <div className="title" style={{ color: theme[themeselect].theme }}>
            Dictionary
          </div>
          <div className="subtitle">
            by{" "}
            <a
              href="https://akshajnair.com"
              style={{ color: theme[themeselect].link }}
            >
              Akshaj Nair
            </a>
          </div>
          {/* Search input */}
          <input
            id="search_bar"
            className="input"
            placeholder="search"
            onChange={(e) => {
              setKeyword(e.target.value);
              if (e.target.value) headerselect.current = "selected";
              else headerselect.current = "";
            }}
            value={keyword}
            style={{
              borderColor: theme[themeselect].theme,
              color: theme[themeselect].theme,
              backgroundColor: theme[themeselect].body,
            }}
          ></input>
        </div>
        <Result keyword={keyword} theme={theme[themeselect]} />
      </div>
    </div>
  );
}

export default App;
