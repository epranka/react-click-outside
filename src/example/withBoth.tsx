import * as React from "react";
import { clickOutside, WithClickOutside } from "../ClickOutside";

interface ElementProps extends WithClickOutside {
	handleClickedOutside_lifecycle?: () => void;
}

@clickOutside
class Element extends React.Component<ElementProps> {
	// lifecycle from clickOutside
	public onClickOutside() {
		if (this.props.handleClickedOutside_lifecycle) {
			this.props.handleClickedOutside_lifecycle();
		}
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

export class AppWithBoth extends React.Component<{
	handleClickedOutside_lifecycle?: () => void;
	handleClickedOutside_prop?: () => void;
}> {
	public render() {
		return (
			<div style={{ position: "relative", width: 200, height: 200 }}>
				<Element
					handleClickedOutside_lifecycle={
						this.props.handleClickedOutside_lifecycle
					}
					onClickOutside={this.props.handleClickedOutside_prop}
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
