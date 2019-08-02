import * as React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import * as ReactDOM from "react-dom";

export interface WithClickOutside {
	onClickOutside?: (e) => void;
}

export const clickOutside = <P, T extends React.ComponentType<P>>(
	Component: T
) => {
	class ClickOutsidewrapper extends React.Component<WithClickOutside> {
		private instance: React.RefObject<any>;
		private $dom: Element | Text;
		private clickedInside: boolean = false;
		constructor(props, context) {
			super(props, context);

			this.instance = React.createRef();

			this.handleDocumentClick = this.handleDocumentClick.bind(this);
			this.handleInsideClick = this.handleInsideClick.bind(this);
			this.onClickOutside = this.onClickOutside.bind(this);
		}

		public componentDidMount() {
			document.addEventListener("mousedown", this.handleDocumentClick);
			if (!this.instance.current) {
				throw new Error("[ClickOutside] Cannot reference component");
			}
			this.$dom = ReactDOM.findDOMNode(this.instance.current);
			if (this.$dom) {
				this.$dom.addEventListener("mousedown", this.handleInsideClick);
			}
		}

		public componentWillUnmount() {
			document.removeEventListener("mousedown", this.handleDocumentClick);
			if (this.$dom) {
				this.$dom.removeEventListener(
					"mousedown",
					this.handleInsideClick
				);
			}
		}

		private onClickOutside(e) {
			if (
				this.instance.current &&
				typeof this.instance.current.onClickOutside === "function"
			) {
				this.instance.current.onClickOutside.bind(
					this.instance.current
				)(e);
			}
			if (typeof this.props.onClickOutside === "function") {
				this.props.onClickOutside(e);
			}
		}

		private handleDocumentClick(e) {
			if (this.clickedInside) {
				this.clickedInside = false;
			} else {
				this.onClickOutside(e);
			}
		}

		private handleInsideClick() {
			this.clickedInside = true;
		}

		public render() {
			// @ts-ignore
			return <Component {...this.props} ref={this.instance} />;
		}
	}

	return (hoistNonReactStatics(ClickOutsidewrapper, Component) as any) as T;
};
