import React from "react";
import ReactDOM from "react-dom";
import marked from "marked";

export default class ResumeEditor extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			style: "",
			content: "",
			isMarkdown: false,
		};
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

	addToContent(char) {
		this.setState({
			content: this.state.content + char,
		});
	}

	getCurrentContentLength() {
		return this.state.content.length;
	}

	setIsMarkdown(isMarkdown) {
		this.setState({
			isMarkdown: isMarkdown,
		});
	}

	componentDidUpdate() {
		ReactDOM.findDOMNode(this).scrollTop = 10000;
	}

	render() {
		return (<div className="resumeEditor"><pre>
			<code dangerouslySetInnerHTML={{ __html: this.state.isMarkdown ? marked(this.state.content) : this.state.content}}></code>
		</pre></div>);
	}
}