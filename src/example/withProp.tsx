import * as React from "react";
import { clickOutside, WithClickOutside } from "../ClickOutside";

interface ElementProps extends WithClickOutside {}

@clickOutside
class Element extends React.Component<ElementProps> {
	public render() {
		return (
			<div
				style={{
					position: "relative",
					width: 100,
					height: 100
				}}
			>
				<div
					className="inside"
					data-testid="inside"
					style={{ position: "relative", width: 50, height: 50 }}
				/>
			</div>
		);
	}
}

export class AppWithProp extends React.Component<{
	handleClickedOutside?: () => void;
}> {
	public render() {
		return (
			<div style={{ position: "relative", width: 200, height: 200 }}>
				<Element onClickOutside={this.props.handleClickedOutside} />
				<div
					className="outside"
					data-testid="outside"
					style={{ position: "relative", width: 50, height: 50 }}
				/>
			</div>
		);
	}
}
