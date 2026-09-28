import { BASE_URL } from "../constants/urlConstants";

// Images uploaded to the backend are stored as relative paths ("/img/...", "/static/..."),
// older records may still contain absolute URLs.
export const getImageUrl = (filename?: string | null): string | undefined => {
    if (!filename) {
        return undefined;
    }
    return /^(https?:)?\/\//.test(filename) || filename.startsWith("data:") ? filename : BASE_URL + filename;
};
