import React from "react";
import ReactDOM from "react-dom";
import StyleEditor from "./StyleEditor.js";
import ResumeEditor from "./ResumeEditor.js";
import "./style/reset.css";
import Prism from "prismjs";
import co from "co";

class ReactClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			style: "",
		};
		this.interval = 40;
		this.resumeEditorContent = `
# react版动态简历

## 个人爱好

	1. 技能树：
			html(5)，css(3)，ES5，ES6，scss，node.js；
			php，mysql，asp.net,asp（这些很久不用了）;
	2. 生活：
			乒乓球,电影；
			穿越火线（大学玩的真的是昏天暗地啊，间接证明是真爱！😝😝工作后忙了，基本没时间玩了）；

## 博客

**GitHub: **https://github.com/songhaoreact
** 博客: http://songhao888.cn/**

> 如果你喜欢这个效果，Fork [我的项目](https://github.com/ShiningDan/reactjianli)，打造你自己的简历！`;

		
		this.styleEditorContent = [`/*
* Hello, 我是宋浩
*
* 这是用react版的动态简历
* 希望大家能够喜欢 :)
*/

/* 所以我们就开始吧！首先给所有元素加上过渡效果 */
* {
-webkit-transition: all .3s;
transition: all .3s;
}
/* 白色背景太单调了，我们来点背景 */
html {
color: #14d112; background: #000000; 
}
.styleEditor {
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* 哈哈，有没有一点儿黑客效果*/
/* 再加一点 3D 效果，更加地酷炫 */
html{
-webkit-perspective: 1000px;
perspective: 1000px;
}
.styleEditor {
position: fixed; left: 0; top: 0; 
-webkit-transition: none; 
transition: none;
-webkit-transform: rotateY(10deg) translateZ(-100px) ;
transform: rotateY(10deg) translateZ(-100px) ;
}
/* 不知道以上对代码框的修改你是否喜欢呢？ */

/* 接下来我给自己准备一个编辑器，用来存放我的简历内容 */
.resumeEditor{
position: fixed; right: 0; top: 0;
padding: .5em;  margin: .5em;
width: 48vw; height: 90vh; 
border: 1px solid;
background: white; color: #222;
overflow: auto;
}

/* 好了，我开始写简历了 */
`,
`
/* 这个简历好像差点什么
* 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
* 简单，用开源工具翻译成 HTML 就行了
*           3          
*           2          
*           1          
*          action！
*/
`,
`
/* 再对 HTML 加点样式 */
.resumeEditor{
padding: 2em;
}
.resumeEditor h1{
display: block;
width: 80px;
margin: 0 auto;
}
.resumeEditor h2{
display: inline-block;
border-bottom: 1px solid;
margin: 1em 0 .5em;
}
.resumeEditor h3{
display: inline-block;
margin: 0.5em 0;
}
.resumeEditor a{
color: #000;
}
.resumeEditor ul{
list-style: none;
}
.resumeEditor ul>li::before {
content: "•";
margin-left: 1em;
margin-right: 0.5em;
}
.resumeEditor blockquote {
margin: 1em;
padding: .5em;
background: #ddd;
}
`];
	}

	addToStyle(char) {
		this.setState({
			style: this.state.style + char,
		});
	}

	replaceStyle(style) {
		this.setState({
			style: style,
		});
	}
	replaceStyleEditorContent() {
		
	}
	showStyleEditorContent(n) {
		let lastContentLength = 0;
		if (n !== 0) {lastContentLength = this.state.style.length;}
		let style = this.styleEditorContent[n];
		let len = style.length;
		return new Promise((resolve, reject) => {
			let showStyle = function () {
				let currentLen = this.state.style.length - lastContentLength;
				if (currentLen < len) {
					let char = style.substring(currentLen, currentLen+1);
					this.refs.StyleEditor.addToContent(char);
					this.addToStyle(char);
					setTimeout(showStyle, this.interval);
				} else {
					resolve();
				}
			}.bind(this);
			showStyle();
		});
	}

	showResumeContent() {
		let content = this.resumeEditorContent;
		let len = content.length;
		return new Promise((resolve, reject) => {
			let showContent = function() {
				let currentLen = this.refs.ResumeEditor.getCurrentContentLength();
				if (currentLen < len) {
					let char = content.substring(currentLen, currentLen+1);
					this.refs.ResumeEditor.addToContent(char);
					setTimeout(showContent, this.interval);
				} else {
					resolve();
				}
			}.bind(this);
			showContent();
		});
	}

	setResumeMarkdown() {
		return new Promise((resolve, reject) => {
			setTimeout(this.refs.ResumeEditor.setIsMarkdown(true), this.interval);
			resolve();
		}); 
	}
	async startShow() {
		await this.showStyleEditorContent(0).then(function() {console.log('done! show Content 0')});
		await this.showResumeContent();
		await this.showStyleEditorContent(1).then(function() {console.log('done! show Content 1')});
		await this.setResumeMarkdown();
		await this.showStyleEditorContent(2).then(function() {console.log('done! show Content 2')});
	}

	componentDidMount() {
		this.startShow();
	}

	render() {
		return (
			<div>
				<StyleEditor ref="StyleEditor" />
				<ResumeEditor ref="ResumeEditor" />
				<style>{this.state.style}</style>
			</div>);
	}
}
ReactDOM.render(<ReactClass />, document.getElementById("content"));