/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

interface ImportMetaEnv {
    readonly REACT_APP_API_URL?: string;
    readonly REACT_APP_RECAPTCHA_SITE_KEY?: string;
    readonly REACT_APP_SHOP_NAME?: string;
    readonly REACT_APP_SHOP_PHONE?: string;
    readonly REACT_APP_SHOP_EMAIL?: string;
    readonly REACT_APP_FACEBOOK_URL?: string;
    readonly REACT_APP_INSTAGRAM_URL?: string;
    readonly REACT_APP_TWITTER_URL?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
