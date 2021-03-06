import {Component, h} from 'preact';
import styles from './cps-datepicker.styles.css';
import {customElementToReact} from '../react-interop.js';
import {preactToCustomElement} from '../preact-to-custom-element.js';
import moment from 'moment';
import {partial} from 'lodash';

import Header from './header.component.js';
import Days from './days.component.js';
import FourByThree from './four-by-three.component.js';

export default class CpsCalendar extends Component {
	constructor(props) {
		super();
		this.state = {
			display: 'day',
			date: props.date ? moment(props.date) : moment(),
			pickedDate: props.date ? moment(props.date) : null,
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			pickedDate: nextProps.date ? moment(nextProps.date) : null,
		});
	}
	render() {
		return (
			<div
				className={styles.datepicker}>
				<Header
					changeRange={this.changeRange}
					changeDisplay={this.changeDisplay}
					date={this.state.date}
					display={this.state.display}/>
				{this.state.display === 'day'
					? <Days
							pickedDate={this.state.pickedDate}
							selectDate={this.selectDate}
							date={this.state.date}/>
					: <FourByThree
							pickRangeChangeDisplay={this.pickRangeChangeDisplay}
							display={this.state.display}
							date={this.state.date}/>
				}
				{this.props.removeDateOption &&
					<div
						onClick={partial(this.selectDate, null)}
						className={`${styles.removeDateFooter} cps-primary-green cps-wt-bold`}>
						{this.props.removeDateText}
					</div>
				}
			</div>
		)
	}
	selectDate = date => {
		if (this.props.customElement) {
			this.props.customElement.dispatchEvent(new CustomEvent('date-change', {
				detail: date ? new Date(date) : null,
			}))
		} else if (this.props.selectDate) {
			this.props.selectDate(date);
		}
	}
	changeDisplay = display => {
		this.setState({
			display
		});
	}
	changeRange = modifier => {
		this.setState({
			date: getRangeDate(this.state.display, modifier, this.state.date)
		})
	}
	pickRangeChangeDisplay = (range, display) => {
		const newDate = moment(this.state.date);
		newDate[this.state.display === 'month' ? 'month' : 'year'](range);
		this.setState({
			display,
			date: newDate,
		})
	}
}

function getRangeDate(subject, modifier, oldDate) {
	const date = moment(oldDate);
	if (subject === 'day')
		return date.month(oldDate.month() + modifier)
	if (subject === 'month')
		return date.year(oldDate.year() + modifier)
	if (subject === 'year')
		return date.year(oldDate.year() + (modifier * 10))
	if (subject === 'decade')
		return date.year(oldDate.year() + (modifier * 100))
}

const cpsCalendarProps = [
	'date', 'removeDateOption', 'removeDateText'
];
const customElement = preactToCustomElement(
	CpsCalendar,
	{
		parentClass: HTMLElement,
		properties: cpsCalendarProps
	}
);
customElements.define('cps-calendar', customElement);
export const CprCalendar = customElementToReact({name: 'cps-calendar'});
