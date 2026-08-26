import React, { Component } from 'react';

export class Chrome extends Component {
    constructor() {
        super();
        this.home_url = 'https://www.google.com/webhp?igu=1';
        this.state = {
            url: 'https://www.google.com/webhp?igu=1',
            display_url: "https://www.google.com",
        }
    }

    componentDidMount() {
        let lastVisitedUrl = localStorage.getItem("chrome-url");
        let lastDisplayedUrl = localStorage.getItem("chrome-display-url");
        if (lastVisitedUrl !== null && lastVisitedUrl !== undefined) {
            this.setState({ url: lastVisitedUrl, display_url: lastDisplayedUrl }, this.refreshChrome);
        }
    }

    storeVisitedUrl = (url, display_url) => {
        localStorage.setItem("chrome-url", url);
        localStorage.setItem("chrome-display-url", display_url);
    }

    refreshChrome = () => {
        document.getElementById("chrome-screen").src += '';
    }

    goToHome = () => {
        this.setState({ url: this.home_url, display_url: "https://www.google.com" });
        this.refreshChrome();
    }

    openInNewTab = () => {
        let target = this.state.url;
        if (target.includes("google.com/webhp?igu=1")) {
            target = "https://www.google.com";
        }
        window.open(target, '_blank', 'noopener,noreferrer');
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let input = e.target.value.trim();
            if (input.length === 0) return;

            let url = input;
            let display_url = input;

            // If input is not a URL (has spaces or no dot), treat as Google Search
            const isUrl = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/.test(input);

            if (!isUrl && !input.startsWith("http://") && !input.startsWith("https://")) {
                url = `https://www.google.com/search?igu=1&q=${encodeURIComponent(input)}`;
                display_url = `https://www.google.com/search?q=${input}`;
            } else {
                if (url.indexOf("http://") !== 0 && url.indexOf("https://") !== 0) {
                    url = "https://" + url;
                }
                display_url = url;
                if (url.includes("google.com")) {
                    url = 'https://www.google.com/webhp?igu=1';
                    display_url = "https://www.google.com";
                }
            }

            this.setState({ url, display_url });
            this.storeVisitedUrl(url, display_url);
            document.getElementById("chrome-url-bar").blur();
        }
    }

    handleDisplayUrl = (e) => {
        this.setState({ display_url: e.target.value });
    }

    displayUrlBar = () => {
        return (
            <div className="w-full pt-1 pb-1 flex justify-start items-center text-white text-sm bg-ub-grey border-b border-gray-900 px-2">
                <div onClick={this.refreshChrome} title="Reload page" className="p-1.5 mr-1 flex justify-center items-center rounded-full hover:bg-white hover:bg-opacity-10 cursor-pointer transition">
                    <img className="w-4 h-4" src="./themes/Yaru/status/chrome_refresh.svg" alt="Ubuntu Chrome Refresh" />
                </div>
                <div onClick={this.goToHome} title="Go to Google Home" className="p-1.5 mr-2 flex justify-center items-center rounded-full hover:bg-white hover:bg-opacity-10 cursor-pointer transition">
                    <img className="w-4 h-4" src="./themes/Yaru/status/chrome_home.svg" alt="Ubuntu Chrome Home" />
                </div>
                <div className="relative flex-grow mr-2">
                    <input
                        onKeyDown={this.checkKey}
                        onChange={this.handleDisplayUrl}
                        value={this.state.display_url}
                        id="chrome-url-bar"
                        className="outline-none bg-ub-cool-grey rounded-full pl-4 pr-8 py-1 w-full text-xs md:text-sm text-gray-200 focus:text-white focus:bg-gray-800 border border-transparent focus:border-ub-orange transition"
                        type="text"
                        placeholder="Search Google or type a URL..."
                        spellCheck={false}
                        autoComplete="off"
                    />
                </div>
                <button
                    onClick={this.openInNewTab}
                    title="Open current page in a new browser tab (bypasses iframe restrictions)"
                    className="flex items-center gap-1.5 bg-ub-orange hover:bg-opacity-90 text-white text-xs px-3 py-1 rounded-full font-mono transition shadow-sm flex-shrink-0"
                >
                    <img className="w-3.5 h-3.5 filter invert" src="./themes/Yaru/status/external-link.svg" alt="Open external" />
                    <span className="hidden sm:inline">Open in Tab</span>
                </button>
            </div>
        );
    }

    render() {
        return (
            <div className="h-full w-full flex flex-col bg-ub-cool-grey select-none">
                {this.displayUrlBar()}
                <div className="bg-ub-cool-grey px-3 py-1 text-xs text-gray-400 border-b border-gray-800 flex justify-between items-center font-mono">
                    <span className="truncate">
                        🔒 Note: External sites with <span className="text-gray-300">X-Frame-Options: SAMEORIGIN</span> block embedding.
                    </span>
                    <button onClick={this.openInNewTab} className="text-ubt-gedit-orange hover:underline flex-shrink-0 ml-2 font-bold">
                        Open in New Tab ↗
                    </button>
                </div>
                <iframe
                    src={this.state.url}
                    className="flex-grow w-full h-full bg-white"
                    id="chrome-screen"
                    frameBorder="0"
                    title="Ubuntu Chrome Url"
                ></iframe>
            </div>
        )
    }
}

export default Chrome

export const displayChrome = () => {
    return <Chrome> </Chrome>;
}
