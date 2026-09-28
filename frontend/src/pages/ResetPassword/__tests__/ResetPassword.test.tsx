import type { Mock } from "vitest";
import React from "react";
import { Alert } from "antd";

import {createMockRootState, mockDispatch, mountWithStore, waitForComponentToRender} from "../../../utils/test/testHelper";
import { LoadingStatus } from "../../../types/types";
import IconButton from "../../../components/IconButton/IconButton";
import ResetPassword from "../ResetPassword";

const { mockUseParams } = vi.hoisted(() => ({ mockUseParams: vi.fn() }));

vi.mock("react-router-dom", async (importOriginal) => ({
    ...(await importOriginal<typeof import("react-router-dom")>()),
    useParams: mockUseParams
}));

describe("ResetPassword", () => {
    const mockRootStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: Mock;

    beforeEach(() => {
        mockUseParams.mockReturnValue({ code: "test" });
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        mountWithStore(<ResetPassword />);
        expect(mockDispatchFn).nthCalledWith(1, { type: "auth/resetAuthState" });
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should render error Alert message", () => {
        const mockErrorMessage = "Password reset code is invalid!";
        const mockStore = {
            ...mockRootStore,
            auth: { ...mockRootStore.auth, error: mockErrorMessage }
        };
        const wrapper = mountWithStore(<ResetPassword />, mockStore);
        expect(wrapper.find(Alert).prop("message")).toBe(mockErrorMessage);
    });

    it("should onClickReset", async () => {
        const wrapper = mountWithStore(<ResetPassword />);
        wrapper.find(IconButton).at(0).simulate("submit");
        await waitForComponentToRender(wrapper);
    });
});
