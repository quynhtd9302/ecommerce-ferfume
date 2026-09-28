// Store contact details shown in the footer and on the Contacts page.
// Configure them in frontend/.env (REACT_APP_* variables are embedded at build time).
export const SHOP_NAME = process.env.REACT_APP_SHOP_NAME || "Perfume";
export const SHOP_PHONE = process.env.REACT_APP_SHOP_PHONE || "";
export const SHOP_EMAIL = process.env.REACT_APP_SHOP_EMAIL || "";

export const SOCIAL_LINKS = {
    facebook: process.env.REACT_APP_FACEBOOK_URL || "",
    instagram: process.env.REACT_APP_INSTAGRAM_URL || "",
    twitter: process.env.REACT_APP_TWITTER_URL || ""
};
