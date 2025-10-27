import React, { useEffect } from "react";

const SocialMediaLinks = () => {
  useEffect(() => {
    // Load Facebook script (for both Facebook iframes)
    const fbScript = document.createElement("script");
    fbScript.src = "https://www.embedista.com/j/fbwidget.js";
    fbScript.async = true;
    document.body.appendChild(fbScript);

    // Load Instagram script
    const instaScript = document.createElement("script");
    instaScript.src = "https://www.instagram.com/embed.js";
    instaScript.async = true;
    document.body.appendChild(instaScript);

    // Load Twitter widget script
    const twitterScript = document.createElement("script");
    twitterScript.src = "https://platform.twitter.com/widgets.js";
    twitterScript.async = true;
    document.body.appendChild(twitterScript);

    return () => {
      document.body.removeChild(fbScript);
      document.body.removeChild(instaScript);
      document.body.removeChild(twitterScript);
    };
  }, []);

  return (
    <section className="bg-gray-50 py-20 min-h-screen flex flex-col items-center">
      <div className="max-w-7xl w-full px-6">
        {/* ===== Heading ===== */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-4">
            Follow Us on Social Media
          </h1>
          <p className="text-indigo-600 text-lg md:text-xl">
            Stay connected with us on Facebook, Instagram, and Twitter!
          </p>
        </div>

        {/* ===== Facebook Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center mb-20">
          {/* Facebook 1 */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              Facebook Page 1
            </h2>
            <iframe
              title="Facebook Page 1"
              frameBorder="0"
              width="340"
              height="300"
              src="https://www.facebook.com/v9.0/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fswaminathan1105&tabs=timeline&width=340&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
              className="rounded-lg shadow-md"
              allow="encrypted-media"
            ></iframe>
            <a
              href="https://www.facebook.com/swaminathan1105"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              Visit Page 1
            </a>
          </div>

          {/* Facebook 2 */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              Facebook Page 2
            </h2>
            <iframe
              title="Facebook Page 2"
              frameBorder="0"
              width="340"
              height="300"
              src="https://www.facebook.com/v9.0/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsaminathan.yvone&tabs=timeline&width=340&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
              className="rounded-lg shadow-md"
              allow="encrypted-media"
            ></iframe>
            <a
              href="https://www.facebook.com/saminathan.yvone"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              Visit Page 2
            </a>
          </div>
        </div>

        {/* ===== Instagram Section ===== */}
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto mb-20">
          <h2 className="text-3xl font-semibold text-pink-600 mb-6">
            Follow Us on Instagram
          </h2>

          <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/c.s.swamynathan/?utm_source=qr&igsh=b2V2bDd1aG43ZDAz"
            data-instgrm-version="12"
            style={{
              background: "#FFF",
              border: "0",
              borderRadius: "3px",
              boxShadow:
                "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
              margin: "1px",
              maxWidth: "540px",
              minWidth: "326px",
              padding: "0",
              width: "100%",
            }}
          ></blockquote>

          <a
            href="https://www.instagram.com/c.s.swamynathan/?utm_source=qr&igsh=b2V2bDd1aG43ZDAz"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-pink-700 transition"
          >
            Visit Instagram Profile
          </a>
        </div>

        {/* ===== Twitter Section ===== */}
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto">
          <h2 className="text-3xl font-semibold text-sky-500 mb-6">
            Follow Us on Twitter (X)
          </h2>

          <blockquote
            className="twitter-timeline"
            data-width="340"
            data-height="500"
            data-dnt="true"
            align="center"
          >
            <a href="https://x.com/c_pondy?t=kakIyholWlGDvDTB5xGFqQ&s=09">
              Loading Tweets...
            </a>
          </blockquote>

          <a
            href="https://x.com/c_pondy?t=kakIyholWlGDvDTB5xGFqQ&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-sky-600 transition"
          >
            Visit Twitter Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaLinks;
