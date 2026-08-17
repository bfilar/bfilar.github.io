import type { NavLink } from "../types";

export const NAV_LINKS: NavLink[] = [
    { href: "/", label: "About", isActive: true },
    { href: "/projects", label: "Projects", isActive: true },
    { href: "/publications", label: "Publications", isActive: true },
    { href: "/talks", label: "Media & Writing", isActive: true },
    { href: "/cv", label: "CV", isActive: true },
    { href: "/posts", label: "Blog", isActive: false },
    { href: "/teaching", label: "Teaching", isActive: false },
    { href: "/tags", label: "Tags", isActive: false },
];
