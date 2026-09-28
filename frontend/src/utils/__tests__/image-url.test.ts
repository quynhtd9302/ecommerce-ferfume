import { getImageUrl } from "../image-url";
import { BASE_URL } from "../../constants/urlConstants";

describe("getImageUrl", () => {
    it("should prefix relative paths with the backend URL", () => {
        expect(getImageUrl("/img/test.jpg")).toBe(BASE_URL + "/img/test.jpg");
    });

    it("should keep absolute URLs", () => {
        expect(getImageUrl("https://example.com/test.jpg")).toBe("https://example.com/test.jpg");
    });

    it("should return undefined for empty values", () => {
        expect(getImageUrl(undefined)).toBeUndefined();
        expect(getImageUrl("")).toBeUndefined();
    });
});
