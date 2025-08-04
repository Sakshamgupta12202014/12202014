import React, { useEffect, useRef, useState } from "react";
import "./UrlShortner.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BACKEND_URL;

function UrlShortner() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [views, setViews] = useState(1);

  const [allUrls, setAllUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllUrls = async () => {
      await axios
        .get(`${baseURL}/api/urls`, { withCredentials: true })
        .then((response) => {
          if (response.data.authenticated === false)
            toast.info("You are not authorised to view urls");
          else setAllUrls(response.data.allUrls);
        })
        .catch((error) => {
          console.log(error);
          toast.error("API Error: cannot fetch All Urls");
        });
    };

    getAllUrls();
  }, [shortId]);

  const shortUrlRef = useRef(null);

  const shortenUrl = async () => {
    try {
      if (longUrl.trim() !== "") {
        const response = await axios.post(
          `${baseURL}/api/url`,
          {
            url: longUrl,
          },
          { withCredentials: true } // include cookies from browser 
        );
        if (response.data.shortId) {
          const id = response.data.shortId;
          console.log(response.data.shortId);
          setShortId(response.data.shortId);

          setShortUrl(response.data.shortUrl);

          const getViews = await axios.get(
            `${baseURL}/api/url/analytics/${id}`,
            { withCredentials: true }
          );
          if (getViews.data.numOfClicks) {
            console.log(getViews.data.numOfClicks);
            setViews(getViews.data.numOfClicks);
          } else if (getViews.data.authenticated === false) {
            toast.warning("You are not authorised to view analytics");
            navigate("/login");
          }
        } else if (response.data.authenticated === false) {
          console.log("you cannot use the service as you are not authorised");
          toast.info("You are not authorised, please login...");
          navigate("/login");
        }

        setLongUrl("");
      } else {
        toast.warning("Please enter a url");
      }
    } catch (error) {
      console.error("Error in sending longUrl to the backend:", error);
      toast.error("Failed to shorten URL");
    }
  };

  const copyShortUrl = (length) => {
    const range = document.createRange();
    const textNode = shortUrlRef.current.firstChild; // Text inside <p>

    range.setStart(textNode, 0); // Start at character 5
    range.setEnd(textNode, length); // End at character 12

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    navigator.clipboard.writeText(selection);
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
      {shortId && (
        <div>
          <p style={{ color: "black" }} ref={shortUrlRef}>
            {shortUrl}
          </p>
          <button
            onClick={() => copyShortUrl(shortUrl.length)}
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "4px",
              borderRadius: "5px",
              outline: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            copy
          </button>
          <p>Views : {views}</p>
        </div>
      )}
      {/* {result && <p>{result}</p>} */}

      {allUrls && (
        <div className="all-urls">
          {allUrls.map((url) => {
            return (
              <div key={url.shortId} className="url-item">
                <p className="url-short-id">{url.shortId}</p>
                <p className="url-redirect">{url.redirectURL}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UrlShortner;

// axios.post('/api/route', {
//   key1: 'value1',
//   key2: 'value2'
// })
// .then(response => {
//   console.log(response.data);
// })
// .catch(error => {
//   console.error(error);
// });
