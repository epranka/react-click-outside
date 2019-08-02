import * as React from "react";
import { clickOutside } from "../ClickOutside";

interface ElementProps {
	handleClickedOutside?: () => void;
}

@clickOutside
class Element extends React.Component<ElementProps> {
	// lifecycle from clickOutside
	public onClickOutside() {
		if (this.props.handleClickedOutside) this.props.handleClickedOutside();
	}

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

export class AppWithLifeCycle extends React.Component<{
	handleClickedOutside?: () => void;
}> {
	public render() {
		return (
			<div style={{ position: "relative", width: 200, height: 200 }}>
				<Element
					handleClickedOutside={this.props.handleClickedOutside}
				/>
				<div
					className="outside"
					data-testid="outside"
					style={{ position: "relative", width: 50, height: 50 }}
				/>
			</div>
		);
	}
}
