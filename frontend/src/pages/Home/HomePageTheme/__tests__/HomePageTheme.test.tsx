import React from "react";
import { createMemoryHistory } from "history";
import { Link } from "react-router-dom";

import {createMockRootState, mountWithStore} from "../../../../utils/test/testHelper";
import { MENU } from "../../../../constants/routeConstants";
import HomePageTheme from "../HomePageTheme";
import {LoadingStatus} from "../../../../types/types";

describe("HomePageTheme", () => {
    const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<HomePageTheme />);
        expect(wrapper.find("img").at(0).prop("src")).toBe(
            "https://images.unsplash.com/photo-1595425959632-34f2822322ce?auto=format&fit=crop&w=1200&q=80"
        );
        expect(wrapper.find("img").at(1).prop("src")).toBe(
            "https://images.unsplash.com/photo-1593487568720-92097fb460fb?auto=format&fit=crop&w=1200&q=80"
        );
    });

    it("should click female Link", () => {
        testClickLink(0, "female");
    });

    it("should click male Link", () => {
        testClickLink(1, "male");
    });
    
    const testClickLink = (linkId: number, stateId: string): void => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<HomePageTheme />, mockRootStore, history);
        wrapper.find(Link).at(linkId).simulate("click", { button: 0 });
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith({ pathname: MENU, state: { id: stateId } });
    };
});
