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
        names: ["Account Pages", "Home Page Posts", "Home Page Stories", "Search Panel", "Reels", "Explore"],
        stateSetters: [setAccountPages, setHomePagePosts, setHomePageStories, setSearchPanel, setReels, setExplore],
        states: [accountPages, homePagePosts, homePageStories, searchPanel, reels, explore],
    }

    useEffect(() => {
        chrome.storage.sync.get(syncSettings => {
            const settings = {...defaultSettings, ...syncSettings};
            Object.entries(defaultSettings).forEach((entry, index) => {
                let [key] = entry;
                popupStates.stateSetters[index](settings[key]);
            });
        })
    }, []);

    const handleChange = (value: boolean, index: number) => {
        popupStates.stateSetters[index](!value);
        let key = popupStates.names[index].replace(/ /g, '-').toLowerCase();
        chrome.storage.sync.set({ [key]: !value });
    }

    return (
        <div style={{width: "max-content"}}>
            Visibility Settings:
            {popupStates.states?.map((value, index) => 
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <input id={popupStates.names[index]} type="checkbox" checked={value} onClick={() => handleChange(value, index)}/> 
                    <label htmlFor={popupStates.names[index]}> {popupStates.names[index]} </label>
                </div>
            )}
        </div>
    );
}

render(<Popup />, document.getElementById("react-target"));