import type { SiteConfig, ThemeConfig, SettingsConfig, UmamiAnalyticsConfig, AnalyticsConfig } from "../types";

export const SITE: SiteConfig = {
    website: "https://bfilar.github.io/",
    author: "Bobby Filar",
    desc: "Personal site of Bobby Filar — Head of AI at Sublime Security. Research on agentic systems, LLM evaluation, adversarial ML, and AI governance.",
    title: "Bobby Filar",
    ogImage: "prof_pic.png",
    postPerPage: 10,
    favicon: "/favicon.svg",
    lang: "en",
};

export const THEME_CONFIG: ThemeConfig = {
    lightAndDark: true,
    themeLight: "light_default",
    themeDark: "dark_default",
};

export const SETTINGS: SettingsConfig = {
    showTagsInNavbar: false,
    showRSSInFooter: false,
    addDevToolsInProduction: false,
};

const umami: UmamiAnalyticsConfig = {
    websiteId: "",
    src: "https://cloud.umami.is/script.js",
}

export const ANALYTICS: AnalyticsConfig = {
    ga4Id: "",
    umami: umami
};
