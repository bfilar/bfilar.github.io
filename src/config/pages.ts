import type { PagesConfig } from "../types";

export const PAGES: PagesConfig = {
    home: {
        title: "About",
        subtitle: "",
        isActive: true,
    },
    blog: {
        title: "Blog",
        subtitle: "",
        isActive: false,
    },
    publications: {
        title: "Publications",
        subtitle: "Peer-reviewed and preprint papers.",
        isActive: true,
    },
    talks: {
        title: "Talks & News",
        subtitle: "Selected public talks, writing, and news.",
        isActive: true,
    },
    projects: {
        title: "Projects",
        subtitle: "Frameworks, agents, and open-source work.",
        isActive: true,
    },
    teaching: {
        title: "Teaching",
        subtitle: "",
        isActive: false,
    },
    tags: {
        title: "Tags",
        subtitle: "",
        isActive: false,
    },
    cv: {
        title: "CV",
        subtitle: "",
        isActive: true,
    },
};
