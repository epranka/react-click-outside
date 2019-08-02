# @epranka/react-click-outside

![Build](https://travis-ci.org/epranka/react-click-outside.svg?branch=master)

> Detect clicks outside the react component

## Install

Using npm

```bash
npm install --save @epranka/react-click-outside
```

or yarn

```bash
yarn add @epranka/react-click-outside
```

## Usage

There are two ways to detect outside clicks

-   with lifecycle

```jsx
import React from "react";
import { clickOutside } from "@epranka/react-click-outside";

class SampleComponent extends React.Component {
	// add this lifecycle
	onClickOutside(e) {
		/* this method will be invoked when mouse pointer clicks outside <div />
		(outside the first DOM element). */
		// e is a document event
	}

	render() {
		return <div />;
	}
}

// wrap component
export default clickOutside(SampleComponent);

// or use decorator
@clickOutside
class SampleComponent extends React.Component {}
```

-   with outside prop

```jsx
class App extends React.Component {
	handleOnClickOutside(e) {
		/* this method will be invoked when mouse pointer clicks
		outside the first DOM element in the SampleComponent component */
		// e is a document click event
	}

	render() {
		/* SampleComponent is the react component wrapped with the 
		clickOutside as in example above. Just pass prop onClickOutside */
		return <SampleComponent onClickOutside={this.handleOnClickOutside} />;
	}
}
```

> If both onClickOutside lifecycle and prop are used, then first lifecycle will be called and then prop.

> If no DOM element will be found in wrapped component, every document mouse click triggers onClickOutside lifecycle or prop

## TODO Features

-   Mobile touch support
-   Functional component support

## Contributing

-   Fork it!
-   Create your feature branch: git checkout -b my-new-feature
-   Commit your changes: git commit -am 'Add some feature'
-   Push to the branch: git push origin my-new-feature
-   Submit a pull request

## Author

If you have questions, feel free to contact

-   Edvinas Pranka
-   Twitter: [@epranka](https://twitter.com/epranka)
-   Email: [epranka@gmail.com](mailto:epranka@gmail.com)
-   Website: [www.kodmina.lt](https://www.kodmina.lt)
