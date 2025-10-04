// SocialMediaLinks.jsx
import React from "react";

const SocialMediaLinks = () => {
  const facebookLinks = [
    {
      url: "https://www.facebook.com/putsf/photos/pb.100064406182633.-2207520000/2152802001550017/?type=3",
      thumbnail: "https://www.facebook.com/putsf/photos/pb.100064406182633.-2207520000/2152802001550017/?type=3",
      label: "Facebook Post"
    },
    {
      url: "https://www.facebook.com/reel/866407385407233/?s=fb_shorts_profile&stack_idx=0",
      thumbnail: "https://via.placeholder.com/300x500.png?text=Reel+1",
      label: "Facebook Reel 1"
    },
    {
      url: "https://www.facebook.com/reel/2323132691067806/?s=fb_shorts_profile&stack_idx=0",
      thumbnail: "https://via.placeholder.com/300x500.png?text=Reel+2",
      label: "Facebook Reel 2"
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1200px", width: "100%" }}>
        <h1 style={{ textAlign: "center", marginBottom: "40px" }}>My Facebook Links</h1>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          {facebookLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "black",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
            >
              <div style={{ position: "relative" }}>
                <img 
                  src={link.thumbnail} 
                  alt={link.label} 
                  style={{ width: "100%", height: "auto", display: "block" }} 
                />
              </div>
              <p style={{ padding: "10px", fontWeight: "bold", textAlign: "center" }}>{link.label}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
