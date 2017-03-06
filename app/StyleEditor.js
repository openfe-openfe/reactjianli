import React from "react";
import ReactDOM from "react-dom";
import {PrismCode} from "react-prism";

export default class StyleEditor extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			style: "",
			content: "",
		};
	}

	addToStyle(char) {
		this.setState({
			style: this.state.style + char,
		});
	}

	addToContent(char) {
		this.setState({
			content: this.state.content + char,
		});
	}

	replaceStyle(style) {
		this.setState({
			style: style,
		});
	}

	replaceContent(content) {
		this.setState({
			content: content,
		});
	} 


	componentDidUpdate() {
		ReactDOM.findDOMNode(this).scrollTop = 10000;
	}

	render() {
		return (<div className="styleEditor"><pre>
			<PrismCode className="language-css">{this.state.content}</PrismCode></pre>
			</div>);
	}
}