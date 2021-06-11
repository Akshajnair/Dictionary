import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Result(props) {
  const [response, setResponse] = useState(() => {
    return null;
  });
  function printans() {
    if (response) return response[0].meanings[0].definitions[0].definition;
    else return "";
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
          console.log(res.data);
          setResponse(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => cancel();
  }, [props.keyword]);
  return <div>{printans()}</div>;
}
