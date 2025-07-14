import React, { useState } from "react";
import "./UrlShortner.css"
import axios from "axios"

function UrlShortner() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState([]);

  const shortenUrl = async () => {
    await axios
      .post("https://cleanuri.com/api/v1/shorten", { url: longUrl })
      .then((response) => {
        console.log(response.data);
        setShortUrl((prevUrls) => [...prevUrls, response.data.result_url]);
      })
      .catch((error) => {
        console.log("Cannot Fetch Short URL: ", error);
      });
  };
  return (
    <div className="url-shortner-div">
      <h1>URL Shortner page</h1>
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Type long url here..."
      />
      <button onClick={shortenUrl}>Short URL</button>

      <div className="short-urls">
        {shortUrl.length > 0 &&
          shortUrl.map((url) => {
            return <div key={url} className="short-url">{url}</div>;
          })}
      </div>
    </div>
  );
}

export default UrlShortner;
