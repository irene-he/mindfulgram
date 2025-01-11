import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { defaultSettings } from "./background";

// Toggles to decide whether or not element is viewable
const Popup = () => {
  const [accountPages, setAccountPages] = useState<boolean>();
  const [homePagePosts, setHomePagePosts] = useState<boolean>();
  const [homePageStories, setHomePageStories] = useState<boolean>();
  const [searchPanel, setSearchPanel] = useState<boolean>();
  const [reels, setReels] = useState<boolean>();
  const [explore, setExplore] = useState<boolean>();
  const popupStates = {
    names: [
      "Account Pages",
      "Home Page Posts",
      "Home Page Stories",
      "Search Panel",
      "Reels",
      "Explore",
    ],
    stateSetters: [
      setAccountPages,
      setHomePagePosts,
      setHomePageStories,
      setSearchPanel,
      setReels,
      setExplore,
    ],
    states: [
      accountPages,
      homePagePosts,
      homePageStories,
      searchPanel,
      reels,
      explore,
    ],
  };

  useEffect(() => {
    chrome.storage.sync.get((syncSettings) => {
      const settings = { ...defaultSettings, ...syncSettings };
      Object.entries(defaultSettings).forEach((entry, index) => {
        let [key] = entry;
        popupStates.stateSetters[index](settings[key]);
      });
    });
  }, []);

  const handleChange = (value: boolean, index: number) => {
    popupStates.stateSetters[index](!value);
    let key = popupStates.names[index].replace(/ /g, "-").toLowerCase();
    chrome.storage.sync.set({ [key]: !value });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "300px",
        height: "400px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <img src="logo.png" width="30px" />
            <h2 style={{ fontStyle: "bold" }}> MindfulGram </h2>
          </div>
          <button
            style={{ backgroundColor: "white", borderStyle: "none" }}
            onClick={window.close}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#962fbf")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
          >
            <svg height="25px" width="25px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div
          style={{
            // #97409f -- darker magenta
            // #962fbf -- original
            // #c74086 -- lighter magenta, pinkish
            // #ae4093 -- magenta
            backgroundColor: "#962fbf",
            width: "100%",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
            fontSize: "15px",
            color: "white",
          }}
        >
          <div> Instagram, but without the distractions. </div>
          <div> So that you can focus on what matters. </div>
        </div>

        <div
          style={{
            display: "flex",
            alignContent: "right",
            flexDirection: "column",
            gap: "8px",
            // width: "100%",
            width: "85%",
            margin: "12px 24px",
            padding: "12px",
            backgroundColor: "#f7f7f7",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px 0px #d3d3d3",
          }}
        >
          <div style={{ fontSize: "16px" }}> Choose what you want to see: </div>
          {popupStates.states?.map((value, index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                fontSize: "16px",
              }}
            >
              <input
                style={{
                  accentColor: "#962fbf",
                  width: "16px",
                  height: "16px",
                }}
                id={popupStates.names[index]}
                type="checkbox"
                checked={value}
                onClick={() => handleChange(value, index)}
              />
              <label htmlFor={popupStates.names[index]}>
                {" "}
                {popupStates.names[index]}{" "}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div style={{ alignSelf: "center", margin: "0px 0px 5px 0px" }}>
        Enjoy your mindful browsing experience :)
      </div>
    </div>
  );
};

render(<Popup />, document.getElementById("react-target"));
