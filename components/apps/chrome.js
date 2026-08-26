import React, { Component } from 'react';

export class Chrome extends Component {
    constructor() {
        super();
        this.home_url = 'chrome://newtab';
        this.state = {
            url: 'chrome://newtab',
            display_url: 'https://www.google.com',
            search_query: '',
            is_home: true,
        };

        this.shortcuts = [
            {
                title: "GitHub",
                url: "https://github.com/yashbansal-dev",
                icon: "./themes/Yaru/apps/github.png",
                bg: "#24292e"
            },
            {
                title: "OpenSeek (AI)",
                url: "https://github.com/yashbansal-dev/OpenSeek",
                icon: "./themes/Yaru/apps/tars.svg",
                bg: "#1e1e2e"
            },
            {
                title: "Spardha",
                url: "https://github.com/yashbansal-dev/spardha",
                icon: "./themes/Yaru/system/user-home.png",
                bg: "#E95420"
            },
            {
                title: "LinkedIn",
                url: "https://linkedin.com/in/yashbansal05",
                icon: "./themes/Yaru/status/about.svg",
                bg: "#0A66C2"
            },
            {
                title: "LeetCode",
                url: "https://leetcode.com",
                icon: "./themes/Yaru/apps/calc.png",
                bg: "#FFA116"
            },
            {
                title: "LNMIIT",
                url: "https://lnmiit.ac.in",
                icon: "./themes/Yaru/status/education.svg",
                bg: "#800000"
            },
            {
                title: "YouTube",
                url: "https://youtube.com",
                icon: "./themes/Yaru/apps/spotify.png",
                bg: "#FF0000"
            },
            {
                title: "Wikipedia",
                url: "https://wikipedia.org",
                icon: "./themes/Yaru/status/skills.svg",
                bg: "#333333"
            }
        ];
    }

    componentDidMount() {
        let lastVisitedUrl = localStorage.getItem("chrome-url");
        let lastDisplayedUrl = localStorage.getItem("chrome-display-url");
        if (lastVisitedUrl && lastVisitedUrl !== 'chrome://newtab') {
            this.setState({
                url: lastVisitedUrl,
                display_url: lastDisplayedUrl || lastVisitedUrl,
                is_home: false
            });
        }
    }

    storeVisitedUrl = (url, display_url) => {
        localStorage.setItem("chrome-url", url);
        localStorage.setItem("chrome-display-url", display_url);
    }

    refreshChrome = () => {
        if (!this.state.is_home) {
            const iframe = document.getElementById("chrome-screen");
            if (iframe) iframe.src += '';
        }
    }

    goToHome = () => {
        this.setState({
            url: 'chrome://newtab',
            display_url: 'https://www.google.com',
            search_query: '',
            is_home: true
        });
        this.storeVisitedUrl('chrome://newtab', 'https://www.google.com');
    }

    openInNewTab = (targetUrl) => {
        const urlToOpen = targetUrl || (this.state.is_home ? 'https://www.google.com' : this.state.url);
        window.open(urlToOpen, '_blank', 'noopener,noreferrer');
    }

    performSearch = (query) => {
        const trimmed = (query || this.state.search_query).trim();
        if (!trimmed) return;

        const isUrl = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/.test(trimmed);

        if (isUrl) {
            let finalUrl = trimmed;
            if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
                finalUrl = 'https://' + finalUrl;
            }
            window.open(finalUrl, '_blank', 'noopener,noreferrer');
            this.setState({ display_url: finalUrl });
        } else {
            const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
            window.open(googleUrl, '_blank', 'noopener,noreferrer');
            this.setState({ display_url: `https://www.google.com/search?q=${trimmed}` });
        }
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            const input = e.target.value.trim();
            if (input.length === 0) return;

            const isUrl = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/.test(input);

            if (isUrl) {
                let url = input;
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'https://' + url;
                }
                this.setState({ url, display_url: url, is_home: false });
                this.storeVisitedUrl(url, url);
            } else {
                this.performSearch(input);
            }
            document.getElementById("chrome-url-bar")?.blur();
        }
    }

    handleDisplayUrl = (e) => {
        this.setState({ display_url: e.target.value });
    }

    displayUrlBar = () => {
        return (
            <div className="w-full pt-1.5 pb-1.5 flex justify-start items-center text-white text-sm bg-ub-grey border-b border-gray-900 px-2 select-none flex-shrink-0">
                <div onClick={this.refreshChrome} title="Reload page" className="p-1.5 mr-1 flex justify-center items-center rounded-full hover:bg-white hover:bg-opacity-10 cursor-pointer transition">
                    <img className="w-4 h-4" src="./themes/Yaru/status/chrome_refresh.svg" alt="Refresh" />
                </div>
                <div onClick={this.goToHome} title="Google Home" className="p-1.5 mr-2 flex justify-center items-center rounded-full hover:bg-white hover:bg-opacity-10 cursor-pointer transition">
                    <img className="w-4 h-4" src="./themes/Yaru/status/chrome_home.svg" alt="Home" />
                </div>
                <div className="relative flex-grow mr-2">
                    <input
                        onKeyDown={this.checkKey}
                        onChange={this.handleDisplayUrl}
                        value={this.state.display_url}
                        id="chrome-url-bar"
                        className="outline-none bg-ub-cool-grey rounded-full pl-4 pr-8 py-1 w-full text-xs md:text-sm text-gray-200 focus:text-white focus:bg-gray-800 border border-transparent focus:border-ub-orange transition"
                        type="text"
                        placeholder="Search Google or enter URL..."
                        spellCheck={false}
                        autoComplete="off"
                    />
                </div>
                <button
                    onClick={() => this.openInNewTab()}
                    title="Open in new browser tab"
                    className="flex items-center gap-1.5 bg-ub-orange hover:bg-opacity-90 text-white text-xs px-3 py-1 rounded-full font-mono transition shadow-sm flex-shrink-0"
                >
                    <img className="w-3.5 h-3.5 filter invert" src="./themes/Yaru/status/external-link.svg" alt="Open external" />
                    <span className="hidden sm:inline">Open in Tab</span>
                </button>
            </div>
        );
    }

    renderNewTab = () => {
        return (
            <div className="flex-grow w-full h-full bg-[#202124] text-white flex flex-col items-center justify-start overflow-y-auto px-4 py-8 select-none">
                {/* Google Logo */}
                <div className="mt-8 mb-6 select-none flex items-center justify-center">
                    <span className="text-4xl md:text-6xl font-bold tracking-tight">
                        <span className="text-[#4285F4]">G</span>
                        <span className="text-[#EA4335]">o</span>
                        <span className="text-[#FBBC05]">o</span>
                        <span className="text-[#4285F4]">g</span>
                        <span className="text-[#34A853]">l</span>
                        <span className="text-[#EA4335]">e</span>
                    </span>
                </div>

                {/* Google Search Bar */}
                <div className="w-full max-w-xl relative mb-4">
                    <div className="flex items-center bg-[#303134] hover:bg-[#3c4043] focus-within:bg-[#303134] rounded-full border border-gray-700 hover:border-gray-600 focus-within:border-gray-500 shadow-md px-4 py-2.5 transition">
                        <svg className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            value={this.state.search_query}
                            onChange={(e) => this.setState({ search_query: e.target.value })}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') this.performSearch();
                            }}
                            placeholder="Search Google or type a URL"
                            className="bg-transparent outline-none text-white text-sm md:text-base w-full"
                            autoFocus
                        />
                        {this.state.search_query && (
                            <button
                                onClick={() => this.setState({ search_query: '' })}
                                className="text-gray-400 hover:text-white mr-2 text-sm"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Google Search Buttons */}
                <div className="flex items-center gap-3 mb-10">
                    <button
                        onClick={() => this.performSearch()}
                        className="bg-[#303134] hover:bg-[#3c4043] border border-transparent hover:border-[#5f6368] text-sm text-[#e8eaed] px-4 py-2 rounded font-sans transition"
                    >
                        Google Search
                    </button>
                    <button
                        onClick={() => this.openInNewTab("https://www.google.com/doodles")}
                        className="bg-[#303134] hover:bg-[#3c4043] border border-transparent hover:border-[#5f6368] text-sm text-[#e8eaed] px-4 py-2 rounded font-sans transition"
                    >
                        I&apos;m Feeling Lucky
                    </button>
                </div>

                {/* Quick Shortcut Tiles */}
                <div className="w-full max-w-2xl">
                    <div className="text-xs font-mono text-gray-400 mb-3 text-center uppercase tracking-wider">
                        Quick Bookmarks &amp; Shortcuts
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 max-w-lg mx-auto">
                        {this.shortcuts.map((shortcut, index) => (
                            <div
                                key={index}
                                onClick={() => this.openInNewTab(shortcut.url)}
                                className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-[#303134] cursor-pointer transition group"
                            >
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow group-hover:scale-105 transition transform"
                                    style={{ backgroundColor: shortcut.bg }}
                                >
                                    <img src={shortcut.icon} alt={shortcut.title} className="w-6 h-6 object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                                </div>
                                <span className="text-xs text-gray-300 group-hover:text-white text-center truncate max-w-[80px]">
                                    {shortcut.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Tip */}
                <div className="mt-auto pt-8 text-xs font-mono text-gray-500 text-center">
                    Chrome for Ubuntu • Yash Bansal OS Edition
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="h-full w-full flex flex-col bg-ub-cool-grey select-none">
                {this.displayUrlBar()}
                {this.state.is_home ? (
                    this.renderNewTab()
                ) : (
                    <div className="flex-grow w-full h-full relative flex flex-col bg-white">
                        <div className="bg-ub-cool-grey px-3 py-1 text-xs text-gray-400 border-b border-gray-800 flex justify-between items-center font-mono">
                            <span className="truncate">
                                🔒 Note: Sites restricting iframe embedding can be opened directly.
                            </span>
                            <button onClick={() => this.openInNewTab(this.state.url)} className="text-ubt-gedit-orange hover:underline flex-shrink-0 ml-2 font-bold">
                                Open in New Tab ↗
                            </button>
                        </div>
                        <iframe
                            src={this.state.url}
                            className="flex-grow w-full h-full bg-white"
                            id="chrome-screen"
                            frameBorder="0"
                            title="Chrome View"
                        ></iframe>
                    </div>
                )}
            </div>
        );
    }
}

export default Chrome;

export const displayChrome = () => {
    return <Chrome />;
};
