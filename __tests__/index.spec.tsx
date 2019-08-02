import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import userEvent from "@testing-library/user-event";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { AppWithLifeCycle } from "../src/example/withLifecycle";
import { AppWithProp } from "../src/example/withProp";
import { AppWithBoth } from "../src/example/withBoth";
import { AppWithoutDOM } from "../src/example/withoutDOM";

Enzyme.configure({ adapter: new Adapter() });

describe("Test @epranka/react-click-outside", () => {
	it("with lifecyle onClickOutside", () => {
		const handleClickedOutside = jest.fn();
		const { getByTestId } = render(
			<AppWithLifeCycle handleClickedOutside={handleClickedOutside} />
		);
		userEvent.click(getByTestId("inside"));
		expect(handleClickedOutside).not.toBeCalled();
		userEvent.click(getByTestId("outside"));
		userEvent.click(getByTestId("outside"));
		expect(handleClickedOutside).toBeCalledTimes(2);
		userEvent.click(getByTestId("inside"));
		expect(handleClickedOutside).toBeCalledTimes(2);
		userEvent.click(getByTestId("outside"));
		expect(handleClickedOutside).toBeCalledTimes(3);
	});

	it("with prop onClickOutside", () => {
		const handleClickedOutside = jest.fn();
		const { getByTestId } = render(
			<AppWithProp handleClickedOutside={handleClickedOutside} />
		);
		userEvent.click(getByTestId("inside"));
		expect(handleClickedOutside).not.toBeCalled();
		userEvent.click(getByTestId("outside"));
		userEvent.click(getByTestId("outside"));
		expect(handleClickedOutside).toBeCalledTimes(2);
		userEvent.click(getByTestId("inside"));
		expect(handleClickedOutside).toBeCalledTimes(2);
		userEvent.click(getByTestId("outside"));
		expect(handleClickedOutside).toBeCalledTimes(3);
	});

	it("with both prop and lifecycle onClickOutside", () => {
		const handleClickedOutside_lifecycle = jest.fn();
		const handleClickedOutside_prop = jest.fn();
		const { getByTestId } = render(
			<AppWithBoth
				handleClickedOutside_lifecycle={handleClickedOutside_lifecycle}
				handleClickedOutside_prop={handleClickedOutside_prop}
			/>
		);
		userEvent.click(getByTestId("inside"));
		expect(handleClickedOutside_lifecycle).not.toBeCalled();
		expect(handleClickedOutside_prop).not.toBeCalled();
		userEvent.click(getByTestId("outside"));
		userEvent.click(getByTestId("outside"));
		expect(handleClickedOutside_lifecycle).toBeCalledTimes(2);
		expect(handleClickedOutside_prop).toBeCalledTimes(2);
		userEvent.click(getByTestId("inside"));
		expect(handleClickedOutside_lifecycle).toBeCalledTimes(2);
		expect(handleClickedOutside_prop).toBeCalledTimes(2);
		userEvent.click(getByTestId("outside"));
		expect(handleClickedOutside_lifecycle).toBeCalledTimes(3);
		expect(handleClickedOutside_prop).toBeCalledTimes(3);
	});

	it("without dom", () => {
		const handleClickedOutside_lifecycle = jest.fn();
		const handleClickedOutside_prop = jest.fn();
		const { getByTestId } = render(
			<AppWithoutDOM
				handleClickedOutside_lifecycle={handleClickedOutside_lifecycle}
				handleClickedOutside_prop={handleClickedOutside_prop}
			/>
		);
		expect(handleClickedOutside_lifecycle).not.toBeCalled();
		expect(handleClickedOutside_prop).not.toBeCalled();
		userEvent.click(getByTestId("outside"));
		userEvent.click(getByTestId("outside"));
		expect(handleClickedOutside_lifecycle).toBeCalledTimes(2);
		expect(handleClickedOutside_prop).toBeCalledTimes(2);
	});
});
