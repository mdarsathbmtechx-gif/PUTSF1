import React, { useEffect } from "react";

const SocialMediaLinks = () => {
  useEffect(() => {
    // Load external social media scripts
    const fbScript = document.createElement("script");
    fbScript.src = "https://www.embedista.com/j/fbwidget.js";
    fbScript.async = true;
    document.body.appendChild(fbScript);

    const twitterScript = document.createElement("script");
    twitterScript.src = "https://platform.twitter.com/widgets.js";
    twitterScript.async = true;
    document.body.appendChild(twitterScript);

    return () => {
      document.body.removeChild(fbScript);
      document.body.removeChild(twitterScript);
    };
  }, []);

  return (
    <section className="bg-gray-50 py-16 min-h-screen flex flex-col items-center">
      <div className="max-w-7xl w-full px-6 md:px-12">
        {/* ===== Header ===== */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-4">
            Follow Us on Social Media
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Stay connected with us on Facebook, Instagram, and Twitter!
          </p>
        </div>

        {/* ===== Facebook Section ===== */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold text-blue-600 text-center mb-10">
            Facebook Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
            {/* Facebook Page 1 */}
            <div className="flex flex-col items-center bg-gray-50 rounded-xl shadow p-6 w-full max-w-md">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                Facebook Page 1
              </h3>
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
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Visit Page 1
              </a>
            </div>

            {/* Facebook Page 2 */}
            <div className="flex flex-col items-center bg-gray-50 rounded-xl shadow p-6 w-full max-w-md">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                Facebook Page 2
              </h3>
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
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Visit Page 2
              </a>
            </div>
          </div>
        </div>

        {/* ===== Instagram + Twitter Section ===== */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-indigo-600 text-center mb-10">
            Instagram & Twitter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
            {/* ===== Instagram Section (Now like Facebook) ===== */}
            <div className="flex flex-col items-center bg-gray-50 rounded-xl shadow p-6 w-full max-w-md">
              <h3 className="text-2xl font-semibold text-pink-600 mb-4">
                Instagram Profile
              </h3>
              <iframe
                title="Instagram Profile"
                src="https://www.instagram.com/c.s.swamynathan/embed"
                width="340"
                height="400"
                className="rounded-lg shadow-md border border-gray-200"
                allowTransparency="true"
              ></iframe>
              <a
                href="https://www.instagram.com/c.s.swamynathan/?utm_source=qr&igsh=b2V2bDd1aG43ZDAz"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
              >
                Visit Instagram
              </a>
            </div>

            {/* ===== Twitter Section (English link + cleaner embed) ===== */}
            <div className="flex flex-col items-center bg-gray-50 rounded-xl shadow p-6 w-full max-w-md">
              <h3 className="text-2xl font-semibold text-sky-500 mb-4">
                Twitter (X) Profile
              </h3>
              <iframe
                title="Twitter Feed"
                src="https://twitframe.com/show?url=https://twitter.com/c_pondy"
                width="340"
                height="400"
                className="rounded-lg shadow-md border border-gray-200"
              ></iframe>
              <a
                href="https://twitter.com/c_pondy"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition"
              >
                Visit Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaLinks;
