import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { defaultSettings } from "./background";

const Popup = () => {
    // Determines whether these elements are viewable or not:
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
    const getKey = (index: number) => {
        return popupStates.names[index].replace(/ /g, '-').toLowerCase();
    }

    useEffect(() => {
        chrome.storage.sync.get(syncSettings => {
            const settings = {...defaultSettings, ...syncSettings};
            Object.entries(defaultSettings).forEach((entry, index) => {
                popupStates.stateSetters.settings[key]
            });
            popupStates.stateSetters.forEach((setValue, index) => {
                let key = getKey(index);
                if (syncSettings[key]) {
                    console.log(key, syncSettings[key]);
                    setValue(syncSettings[key]);
                } else {
                    console.log(key, defaultSettings[key]);
                    setValue(defaultSettings[key]);
                }
            })
        })
    }, []);

    const handleChange = (value: boolean, index: number) => {
        popupStates.stateSetters[index](!value);
        chrome.storage.sync.set({ [getKey(index)]: !value });
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