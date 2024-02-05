// This code will handle the visibility of content
interface settingStates {
    [key: string]: boolean;
}

export const defaultSettings: settingStates = {
    "account-pages": true,
    "home-page-posts": false,
    "home-page-stories": false,
    "search-panel": true,
    "reels": false,
    "explore": false
}

const html = document.documentElement;

chrome.storage.sync.get(syncSettings => {
    const settings = {...defaultSettings, ...syncSettings};
    Object.entries(defaultSettings).forEach((entry) => {
        const [key] = entry;
        html.setAttribute(key, `${settings[key]}`);
    });
})

chrome.storage.onChanged.addListener(changes => {
    Object.entries(changes).forEach((entry) => {
        const [key, {newValue}] = entry;
        html.setAttribute(key, `${newValue}`);
    });
})