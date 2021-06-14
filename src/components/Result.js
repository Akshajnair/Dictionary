import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Result(props) {
  const [response, setResponse] = useState(() => {
    return null;
  });
  const [isfound, setIsfound] = useState(true);
  function getmeaning() {
    return response.meanings.map((element, index) => {
      return (
        <div className="searched-meaning-individual" key={index}>
          <div className="partofspeech">{element.partOfSpeech + ":  "}</div>
          {/* <div className="definition">{element.definitions[0].definition}</div> */}
          <div className="definition">
            {(() => {
              return element.definitions.map((element, index) => {
                return <div key={index}>{element.definition}</div>;
              });
            })()}
          </div>

          <div className="example">
            {(() => {
              if (element.definitions[0].example)
                return "eg: " + element.definitions[0].example;
            })()}
          </div>
        </div>
      );
    });
  }
  function printans() {
    if (response)
      return (
        <div className="result-container">
          <div
            className="searched-keyword"
            style={{ color: props.theme.theme }}
          >
            {response.word}
            {(() => {
              if (response.phonetics[0].audio)
                return (
                  <button
                    className="speaker"
                    onClick={() => {
                      let audio = new Audio(response.phonetics[0].audio);
                      audio.play();
                    }}
                  >
                    <i
                      className="fas fa-volume-up"
                      style={{ color: props.theme.theme }}
                    ></i>
                  </button>
                );
            })()}
          </div>

          <div className="searched-meaning">{getmeaning()}</div>
        </div>
      );
    else return "";
  }
  function invalidsearch() {
    console.log(response);
    if (isfound === false)
      return (
        <div className="banner-display">
          <div className="banner-text" style={{ color: props.theme.darktext }}>
            Sry :(
          </div>
          <div className="banner-text" style={{ color: props.theme.darktext }}>
            Word Not Found
          </div>
        </div>
      );
    else return <div></div>;
  }

  useEffect(() => {
    let cancel = () => {
      return null;
    };
    if (props.keyword) {
      axios({
        method: "GET",
        url:
          "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + props.keyword,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          setResponse(res.data[0]);
          setIsfound(true);
        })
        .catch((err) => {
          if (axios.isCancel(err)) return;
          if (err.response.status === 404) {
            setIsfound(false);
            setResponse("");
          }
        });
    } else {
      setResponse("");
      setIsfound(true);
    }
    return () => cancel();
  }, [props.keyword]);
  return (
    <div>
      {printans()}
      {invalidsearch()}
    </div>
  );
}
