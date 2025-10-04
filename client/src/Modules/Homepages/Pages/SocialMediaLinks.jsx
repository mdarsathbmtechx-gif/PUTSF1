// SocialMediaLinks.jsx
import React, { useEffect, useState } from "react";

const SocialMediaLinks = () => {
  const facebookPosts = [
    "https://www.facebook.com/putsf/photos/pb.100064406182633.-2207520000/2152802001550017/",
    "https://www.facebook.com/reel/866407385407233/",
    "https://www.facebook.com/reel/2323132691067806/",
  ];

  const [sdkLoaded, setSdkLoaded] = useState(false);

  // Load Facebook SDK
  useEffect(() => {
    if (!window.FB) {
      const script = document.createElement("script");
      script.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0";
      script.async = true;
      script.defer = true;
      script.onload = () => setSdkLoaded(true);
      document.body.appendChild(script);
    } else {
      setSdkLoaded(true);
      window.FB.XFBML.parse();
    }
  }, []);

  // Parse embeds whenever SDK is loaded or posts change
  useEffect(() => {
    if (sdkLoaded && window.FB) {
      window.FB.XFBML.parse();
    }
  }, [sdkLoaded]);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>My Facebook Posts</h1>
        <div style={styles.grid}>
          {facebookPosts.map((postUrl, index) => (
            <div
              key={index}
              className="fb-post"
              data-href={postUrl}
              data-width="500"
              style={styles.post}
            >
              {!sdkLoaded && (
                <div style={styles.placeholder}>
                  Loading Facebook post...
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "60px 20px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  content: {
    maxWidth: "900px",
    width: "100%",
  },
  heading: {
    textAlign: "center",
    marginBottom: "50px",
    fontSize: "2.5rem",
    color: "#333",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "40px",
  },
  post: {
    margin: "0 auto",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  },
  placeholder: {
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    color: "#555",
    fontSize: "1rem",
    borderRadius: "10px",
  },
};

export default SocialMediaLinks;
