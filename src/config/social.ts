import type { SocialLink } from "../types";

export const SOCIALS: SocialLink[] = [
    {
        name: "Github",
        href: "https://github.com/bfilar",
        linkTitle: `Bobby Filar on GitHub`,
        isActive: true,
    },
    {
        name: "Linkedin",
        href: "https://www.linkedin.com/in/bobby-filar/",
        linkTitle: `Bobby Filar on LinkedIn`,
        isActive: true,
    },
    {
        name: "Google Scholar",
        href: "https://scholar.google.com/citations?user=OLcliSsAAAAJ",
        linkTitle: `Bobby Filar on Google Scholar`,
        isActive: true,
    },
    {
        name: "Mail",
        href: "mailto:bobby.filar@gmail.com",
        linkTitle: `Email Bobby`,
        isActive: true,
    },
];

export const SOCIAL_ICONS: Record<string, string> = {
    Github: "Github",
    Mail: "Mail",
    Linkedin: "LinkedIn",
    "Google Scholar": "GoogleScholar",
    ORCID: "ORCID",
    RSS: "RSS",
};
