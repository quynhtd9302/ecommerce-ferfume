import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure } from "enzyme";

configure({ adapter: new Adapter() });

window.matchMedia = (query: string) =>
    ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
    } as unknown as MediaQueryList);
