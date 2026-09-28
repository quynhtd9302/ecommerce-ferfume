import React from "react";
import { Select } from "antd";

import { mountWithStore } from "../../../utils/test/testHelper";
import SelectSearchData from "../SelectSearchData";

describe("SelectSearchData", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<SelectSearchData handleChangeSelect={vi.fn()} />);
        expect(wrapper.find(Select).exists()).toBeTruthy();
    });
});
