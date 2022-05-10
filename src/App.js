import "./App.css";
// Import random word generator
import randomWords from "random-words";
// Import state hooks
import { useState } from "react";

function App() {
  // Create a regex pattern to test https urls with full paths and extensions with query strings with
  const httpsRegex = new RegExp(
    "^(https:\\/\\/)(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$"
  );

  // Create a state hook to store the urls
  const [urls, setUrls] = useState([]);

  // Create a function to generate a random https url
  const generateUrl = () => {
    // Randomly generate a number between 1 and 10. If 1, return random words instead of generating a URL
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    if (randomNumber === 1) {
      // If 1, return random words instead of generating a URL
      return randomWords();
    }
    // Start with https:
    let url = "https://";
    // Add a random word to the url
    url += randomWords();
    // Create an array with common domain name extensions
    const extensions = [".com", ".net", ".org", ".edu", ".gov", ".io", ".me", ".info", ".biz", ".co"];
    // Add a random extension to the url
    url += extensions[Math.floor(Math.random() * extensions.length)];
    // Add between 0 and 3 folder paths to the url
    for (let i = 0; i < Math.floor(Math.random() * 4); i++) {
      url += "/" + randomWords();
    }
    // Create an array with common url file extensions
    const fileExtensions = [".html", ".css", ".js", ".json", ".txt", ".pdf", ".jpg", ".jpeg", ".png", ".gif"];
    // Flip a coin to add a file extension to the url
    if (Math.floor(Math.random() * 2) === 1) {
      url += fileExtensions[Math.floor(Math.random() * fileExtensions.length)];
    }

    // Flip a coin to add query strings to the url
    if (Math.floor(Math.random() * 2) === 1) {
      // Add a query string to the url
      url += "?" + randomWords();
      // Add between 0 and 3 queries with values to the url
      for (let i = 0; i < Math.floor(Math.random() * 4); i++) {
        url += "&" + randomWords();

        // Flip a coin to add a value to the query
        if (Math.floor(Math.random() * 2) === 1) {
          url += "=" + randomWords();
        }
      }
    }

    // Return the url
    return url;
  };

  // Create a function to validate the url against the regex pattern
  const validateUrl = (url) => {
    // Return true if the url matches the regex pattern
    return httpsRegex.test(url);
  };

  // Create a function to generate a URL and store it in an object along with the result of its validation
  const generateAndValidateUrl = () => {
    // Create a new url, then create an object containing the url and the valdidation result
    const newUrl = generateUrl();
    const urlObject = {
      url: newUrl,
      valid: validateUrl(newUrl),
    };
    // Store the object in the state object
    setUrls((urls) => [...urls, urlObject]);
    // If there are more than 10 URLs in the state, remove one.
    if (urls.length > 10) {
      setUrls((urls) => urls.slice(1));
    }
  };

  // Create a function to clear the state
  const clearState = () => {
    setUrls([]);
  };

  // Render a page with a button to generate a new URL, a button to clear the state, and a table that displays the generated URLs.
  return (
    <div className="App">
      <header className="App-header">
        <h1>URL Generator</h1>
        <button onClick={generateAndValidateUrl}>Generate URL</button>
        <button onClick={clearState}>Clear State</button>
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Valid</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url.url}>
                <td>{url.url}</td>
                <td>{url.valid ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
