import React, { Component } from 'react';
import ReactGA from 'react-ga4';

export class AboutYash extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about", // by default 'about' screen is active
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "about": <About onNavigate={this.navigateToScreen} />,
            "experience": <Experience />,
            "projects": <Projects />,
            "skills": <Skills />,
            "resume": <Resume />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined || !this.screens[lastVisitedScreen]) {
            lastVisitedScreen = "about";
        }

        // focus last visited screen
        this.changeScreen(document.getElementById(lastVisitedScreen) || { id: lastVisitedScreen });
    }

    navigateToScreen = (screenName) => {
        const el = document.getElementById(screenName);
        if (el) {
            this.changeScreen(el);
        } else {
            this.changeScreen({ id: screenName });
        }
    }

    changeScreen = (e) => {
        if (!e) return;
        const screen = e.id || e.target?.id;
        if (!screen || !this.screens[screen]) return;

        // store this state
        localStorage.setItem("about-section", screen);

        // google analytics if tracking ID is set
        if (process.env.NEXT_PUBLIC_TRACKING_ID) {
            ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: `Yash Portfolio - ${screen}` });
        }

        this.setState({
            screen: this.screens[screen],
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        return (
            <>
                <div id="about" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "about" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="about yash" src="./themes/Yaru/status/about.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Overview</span>
                </div>
                <div id="projects" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "projects" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="yash projects" src="./themes/Yaru/status/projects.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Projects</span>
                </div>
                <div id="experience" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "experience" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="yash experience" src="./themes/Yaru/status/experience.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Experience</span>
                </div>
                <div id="skills" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "skills" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="yash skills" src="./themes/Yaru/status/skills.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Skills</span>
                </div>
                <div id="resume" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "resume" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="yash resume" src="./themes/Yaru/status/download.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Resume</span>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>
                <div onClick={this.showNavBar} className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1 z-40">
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className=" w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className={(this.state.navbar ? " visible animateShow z-50 " : " invisible ") + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"}>
                        {this.renderNavLinks()}
                    </div>
                </div>
                <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">
                    {this.state.screen}
                </div>
            </div>
        );
    }
}

export default AboutYash;

export const displayAboutYash = () => {
    return <AboutYash />;
}

// Backward compatibility alias
export const displayAboutVivek = displayAboutYash;
export const AboutVivek = AboutYash;


function About(props) {
    return (
        <div className="w-full max-w-2xl px-4 md:px-8 py-6 font-sans text-gray-200">
            {/* Header */}
            <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Yash Bansal</h1>
                {/* Verified Checkmark Badge */}
                <svg className="w-5 h-5 text-blue-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
            </div>
            <div className="font-mono text-xs md:text-sm text-gray-400 mt-1 tracking-wide">
                Software Developer &amp; Programmer
            </div>

            {/* Bio */}
            <p className="mt-4 text-xs md:text-sm text-gray-300 leading-relaxed">
                Building scalable software systems, effective web applications, and developer tools with a focus on clean architecture, algorithms, and reliability.
            </p>

            {/* PROJECTS */}
            <div className="mt-8">
                <div className="text-xs font-mono font-bold tracking-wider text-gray-400 uppercase mb-3">
                    PROJECTS
                </div>
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm md:text-base text-white">OpenSeek</span>
                            <span className="font-mono text-xs text-gray-400">Browser Extension • AI</span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-300 mt-0.5">
                            A browser extension allowing users to right-click on any web image to instantly detect whether it is AI-generated or authentic.
                        </p>
                        <a href="https://github.com/yashbansal-dev/OpenSeek" target="_blank" rel="noreferrer" className="inline-flex items-center font-mono text-xs text-gray-400 hover:text-white mt-1 transition">
                            GitHub <span className="ml-0.5">↗</span>
                        </a>
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm md:text-base text-white">Face Recognition Model</span>
                            <span className="font-mono text-xs text-gray-400">Python • Deep Learning</span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-300 mt-0.5">
                            Facial detection and recognition pipeline leveraging deep learning architectures for real-time feature extraction and accurate identity matching.
                        </p>
                        <a href="https://github.com/yashbansal-dev/face-regonition-model" target="_blank" rel="noreferrer" className="inline-flex items-center font-mono text-xs text-gray-400 hover:text-white mt-1 transition">
                            GitHub <span className="ml-0.5">↗</span>
                        </a>
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm md:text-base text-white">Spardha</span>
                            <span className="font-mono text-xs text-gray-400">Web App • Full Stack</span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-300 mt-0.5">
                            Official college sports festival web platform built to manage athletic events, team registrations, schedules, and live score updates.
                        </p>
                        <a href="https://github.com/yashbansal-dev/spardha" target="_blank" rel="noreferrer" className="inline-flex items-center font-mono text-xs text-gray-400 hover:text-white mt-1 transition">
                            GitHub <span className="ml-0.5">↗</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* EXPERIENCE */}
            <div className="mt-8">
                <div className="text-xs font-mono font-bold tracking-wider text-gray-400 uppercase mb-3">
                    EXPERIENCE
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="font-bold text-sm md:text-base text-white">Shopify &amp; MERN Stack Developer</div>
                            <div className="font-mono text-xs text-gray-400">Doggle India</div>
                        </div>
                        <div className="font-mono text-xs text-gray-400">2026</div>
                    </div>

                    <div className="flex justify-between items-start">
                        <div>
                            <div className="font-bold text-sm md:text-base text-white">Research Developer (Deep Learning)</div>
                            <div className="font-mono text-xs text-gray-400">LNMIIT</div>
                        </div>
                        <div className="font-mono text-xs text-gray-400">2026</div>
                    </div>
                </div>
            </div>

            {/* SKILLS */}
            <div className="mt-8">
                <div className="text-xs font-mono font-bold tracking-wider text-gray-400 uppercase mb-3">
                    SKILLS
                </div>
                <div className="space-y-2 text-xs md:text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                        <span className="font-bold text-white font-mono">Programming</span>
                        <span className="md:col-span-3 text-gray-300">C, C++, Python</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                        <span className="font-bold text-white font-mono">Core CS</span>
                        <span className="md:col-span-3 text-gray-300">Data Structures &amp; Algorithms, DBMS, Operating Systems</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                        <span className="font-bold text-white font-mono">Web</span>
                        <span className="md:col-span-3 text-gray-300">HTML, CSS, JavaScript, Full Stack Development, REST APIs</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                        <span className="font-bold text-white font-mono">Databases</span>
                        <span className="md:col-span-3 text-gray-300">MySQL, MongoDB</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                        <span className="font-bold text-white font-mono">Tools</span>
                        <span className="md:col-span-3 text-gray-300">Git, GitHub, Docker, VS Code, Linux, Firebase, Google Colab</span>
                    </div>
                </div>
            </div>

            {/* CONNECT */}
            <div className="mt-8">
                <div className="text-xs font-mono font-bold tracking-wider text-gray-400 uppercase mb-3">
                    CONNECT
                </div>
                <div className="space-y-2 text-xs md:text-sm font-mono border-t border-gray-800 pt-2">
                    <div className="flex justify-between py-1 border-b border-gray-800 border-opacity-50">
                        <span className="text-gray-400">Email</span>
                        <a href="mailto:yashbansal531@gmail.com" className="text-gray-300 hover:text-white">yashbansal531@gmail.com</a>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-800 border-opacity-50">
                        <span className="text-gray-400">GitHub</span>
                        <a href="https://github.com/yashbansal-dev" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">@yashbansal-dev ↗</a>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-800 border-opacity-50">
                        <span className="text-gray-400">LinkedIn</span>
                        <a href="https://linkedin.com/in/yashbansal05" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">/in/yashbansal05 ↗</a>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-800 border-opacity-50">
                        <span className="text-gray-400">Resume</span>
                        <a href="./files/Yash-Bansal-Resume.pdf" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">View ↗</a>
                    </div>
                </div>
            </div>

            {/* Footer with Quote, Signature & Copyright */}
            <div className="mt-10 pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-400">
                <div>
                    <i>&quot;Think outside the box.&quot;</i>
                </div>
                <div className="flex items-center gap-3">
                    <img src="./images/logos/e_sign.png" alt="Signature" className="h-6 filter invert opacity-80" onError={(e) => { e.target.style.display = 'none'; }} />
                    <span>© 2026 Yash Bansal</span>
                </div>
            </div>
        </div>
    )
}

function Experience() {
    return (
        <div className="w-full max-w-2xl px-4 md:px-8 py-6 text-gray-200">
            <div className="text-xs font-mono font-bold tracking-wider text-gray-400 uppercase mb-4">
                WORK EXPERIENCE
            </div>

            <div className="space-y-6">
                <div className="p-4 rounded border border-gray-800 bg-gray-900 bg-opacity-30">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-base md:text-lg text-white">Shopify &amp; MERN Stack Developer</h3>
                            <div className="font-mono text-xs text-ubt-gedit-orange font-bold">Doggle India</div>
                        </div>
                        <span className="font-mono text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded">2026 • Present</span>
                    </div>
                    <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-gray-300 list-disc ml-4">
                        <li>Building scalable eCommerce features, custom Liquid components, and MERN-based REST endpoints.</li>
                        <li>Optimizing checkout workflows, frontend rendering speed, and cross-browser responsiveness.</li>
                    </ul>
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-gray-800 font-mono text-xs text-gray-400">
                        <span className="px-2 py-0.5 bg-gray-800 rounded">React.js</span>
                        <span className="px-2 py-0.5 bg-gray-800 rounded">Node.js</span>
                        <span className="px-2 py-0.5 bg-gray-800 rounded">MERN Stack</span>
                        <span className="px-2 py-0.5 bg-gray-800 rounded">Liquid</span>
                        <span className="px-2 py-0.5 bg-gray-800 rounded">REST APIs</span>
                    </div>
                </div>

                <div className="p-4 rounded border border-gray-800 bg-gray-900 bg-opacity-30">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-base md:text-lg text-white">Research Developer (Deep Learning)</h3>
                            <div className="font-mono text-xs text-ubt-gedit-orange font-bold">LNMIIT Research Lab</div>
                        </div>
                        <span className="font-mono text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded">2026</span>
                    </div>
                    <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-gray-300 list-disc ml-4">
                        <li>Conducted deep learning research on convolutional neural networks for biometric detection and feature vector cosine similarity.</li>
                        <li>Benchmarked neural network performance and streamlined multi-stage dataset preprocessing pipelines.</li>
                    </ul>
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-gray-800 font-mono text-xs text-gray-400">
                        <span className="px-2 py-0.5 bg-gray-800 rounded">Deep Learning</span>
                        <span className="px-2 py-0.5 bg-gray-800 rounded">Computer Vision</span>
                        <span className="px-2 py-0.5 bg-gray-800 rounded">Python</span>
                        <span className="px-2 py-0.5 bg-gray-800 rounded">PyTorch</span>
                        <span className="px-2 py-0.5 bg-gray-800 rounded">OpenCV</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Projects() {
    const project_list = [
        {
            name: "OpenSeek",
            category: "Browser Extension • AI",
            link: "https://github.com/yashbansal-dev/OpenSeek",
            description: "A browser extension allowing users to right-click on any web image to instantly detect whether it is AI-generated or authentic."
        },
        {
            name: "Face Recognition Model",
            category: "Python • Deep Learning",
            link: "https://github.com/yashbansal-dev/face-regonition-model",
            description: "Facial detection and recognition pipeline leveraging deep learning architectures for real-time feature extraction and accurate identity matching."
        },
        {
            name: "Spardha",
            category: "Web App • Full Stack",
            link: "https://github.com/yashbansal-dev/spardha",
            description: "Official college sports festival web platform built to manage athletic events, team registrations, schedules, and live score updates."
        }
    ];

    return (
        <div className="w-full max-w-2xl px-4 md:px-8 py-6 text-gray-200">
            <div className="text-xs font-mono font-bold tracking-wider text-gray-400 uppercase mb-4">
                FEATURED PROJECTS
            </div>

            <div className="space-y-4">
                {
                    project_list.map((project, index) => (
                        <div key={index} className="p-4 rounded border border-gray-800 bg-gray-900 bg-opacity-30 hover:border-gray-700 transition">
                            <div className="flex flex-wrap justify-between items-center gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-base md:text-lg text-white">{project.name}</span>
                                    <span className="font-mono text-xs text-gray-400">{project.category}</span>
                                </div>
                                <a href={project.link} target="_blank" rel="noreferrer" className="font-mono text-xs text-ubt-gedit-orange hover:underline inline-flex items-center">
                                    GitHub <span className="ml-0.5">↗</span>
                                </a>
                            </div>
                            <p className="mt-2 text-xs md:text-sm text-gray-300 leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

function Skills() {
    return (
        <div className="w-full max-w-2xl px-4 md:px-8 py-6 text-gray-200">
            <div className="text-xs font-mono font-bold tracking-wider text-gray-400 uppercase mb-4">
                SKILLS MATRIX
            </div>

            <div className="space-y-4">
                <div className="p-3.5 rounded border border-gray-800 bg-gray-900 bg-opacity-30">
                    <div className="font-mono text-xs font-bold text-ubt-gedit-orange uppercase mb-1.5">Programming</div>
                    <div className="text-sm text-gray-200">C, C++, Python</div>
                </div>

                <div className="p-3.5 rounded border border-gray-800 bg-gray-900 bg-opacity-30">
                    <div className="font-mono text-xs font-bold text-ubt-gedit-orange uppercase mb-1.5">Core Computer Science</div>
                    <div className="text-sm text-gray-200">Data Structures &amp; Algorithms, DBMS, Operating Systems</div>
                </div>

                <div className="p-3.5 rounded border border-gray-800 bg-gray-900 bg-opacity-30">
                    <div className="font-mono text-xs font-bold text-ubt-gedit-orange uppercase mb-1.5">Web &amp; Full Stack</div>
                    <div className="text-sm text-gray-200">HTML, CSS, JavaScript, Full Stack Development, REST APIs</div>
                </div>

                <div className="p-3.5 rounded border border-gray-800 bg-gray-900 bg-opacity-30">
                    <div className="font-mono text-xs font-bold text-ubt-gedit-orange uppercase mb-1.5">Databases</div>
                    <div className="text-sm text-gray-200">MySQL, MongoDB</div>
                </div>

                <div className="p-3.5 rounded border border-gray-800 bg-gray-900 bg-opacity-30">
                    <div className="font-mono text-xs font-bold text-ubt-gedit-orange uppercase mb-1.5">Tools &amp; Environments</div>
                    <div className="text-sm text-gray-200">Git, GitHub, Docker, VS Code, Linux, Firebase, Google Colab</div>
                </div>
            </div>
        </div>
    )
}

function Resume() {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="bg-ub-cool-grey px-4 py-2 flex justify-between items-center border-b border-gray-700">
                <span className="text-xs md:text-sm font-mono text-gray-200">Yash Bansal • Resume (2026)</span>
                <a href="./files/Yash-Bansal-Resume.pdf" download="Yash-Bansal-Resume.pdf" className="px-3 py-1 bg-ub-orange hover:bg-opacity-90 rounded text-xs font-bold font-mono transition text-white">
                    Download PDF
                </a>
            </div>
            <iframe className="flex-grow w-full" src="./files/Yash-Bansal-Resume.pdf" title="Yash Bansal Resume" frameBorder="0"></iframe>
        </div>
    )
}