import {Component, h} from 'preact';
import styles from './cps-button.styles.css';
import {customElementToReact} from '../react-interop.js';
import {preactToCustomElement} from '../preact-to-custom-element.js';

class CpsButton extends Component {
	state = {
		disabled: false,
		loaderWidth: null,
		loaderHeight: null,
	}
	componentDidMount() {
		// Used for disableOnClick
		this.props.customElement.addEventListener('click', this.onClick);
		this.checkShowLoader({}, this.props);
	}
	componentWillReceiveProps(nextProps) {
		this.checkShowLoader(this.props, nextProps);
	}
	render() {
		// Update the classes on the custom element itself
		toggleClass(this.props.customElement, styles.button, this.props.actionType !== 'flat');
		toggleClass(this.props.customElement, styles.primary, this.props.actionType === 'primary');
		toggleClass(this.props.customElement, styles.secondary, this.props.actionType === 'secondary');
		toggleClass(this.props.customElement, styles.flat, this.props.actionType === 'flat');
		toggleClass(this.props.customElement, styles.phat, !!this.props.phat);

		if (this.state.disabled) {
			this.props.customElement.disabled = this.state.disabled;
		}

		// Only return something if we want to completely overwrite the innerHTML
		if (this.props.showLoader) {
			if (!this.props.customElement.querySelector('.cps-loader')) {
				this.prepareElementForLoader();
			}
			return (
				<span className={`cps-loader ${styles.loader} ${this.props.customElement.disabled ? styles.disabledWithLoader : ''}`}>
					<span />
					<span />
					<span />
				</span>
			)
		}
	}
	onClick = () => {
		if (this.props.disableOnClick) {
			this.setState({disabled: true});
		}
	}
	checkShowLoader = (oldProps, nextProps) => {
		/* When showLoader is set to true, we want to hide whatever text is in the button, but unhide it when
		 * showLoader is set back to false. Unfortunately, you can't set display: none on text nodes, so we have to
		 * remove the text nodes in order to achieve the same effect.
		 */
		if (!oldProps.showLoader && nextProps.showLoader) {
			this.prepareElementForLoader();
			this.textNodes = Array.prototype.filter.call(nextProps.customElement.childNodes, childNode => childNode.nodeType === 3);
			Array.prototype.forEach.call(this.textNodes, textNode => textNode.parentNode.removeChild(textNode));
		}

		if (oldProps.showLoader && !nextProps.showLoader) {
			this.loaderIsGone(nextProps);
		}
	}
	prepareElementForLoader = () => {
		this.widthBeforeLoader = this.props.customElement.style.clientWidth;
		this.heightBeforeLoader = this.props.customElement.style.clientHeight;

		this.props.customElement.style.width = this.props.customElement.clientWidth + "px";
		this.props.customElement.style.height = this.props.customElement.clientHeight + "px";
	}
	loaderIsGone = props => {
		Array.prototype.forEach.call(this.textNodes, textNode => props.customElement.appendChild(textNode));
		delete this.textNodes;

		if (this.widthBeforeLoader) {
			this.props.customElement.style.width = this.widthBeforeLoader;
			this.props.customElement.style.height = this.heightBeforeLoader;
		}

		delete this.widthBeforeLoader;
		delete this.heightBeforeLoader;
	}
}

const customElement = preactToCustomElement(CpsButton, {parentClass: HTMLButtonElement, properties: ['actionType', 'disableOnClick', 'showLoader', 'phat']});
customElements.define('cps-button', customElement, {extends: 'button'});
export const CprButton = customElementToReact({name: 'cps-button', extends: 'button'});

function toggleClass(element, className, condition) {
	if (condition) {
		element.classList.add(className);
	} else {
		element.classList.remove(className);
	}
}
