var React = require('react');
module.exports = React.createClass({
		render: function() {
			return (
				<div className="bss-fixed-focus bss-card">
					<div className="bss-card__header">
						<h3 className="bss-subheader">Buttons</h3>
					</div>
					<div className="bss-card__body">

						<div className="bss-subheader-sm padding-bottom-20 bottom-lg-space">Raised Buttons</div>
						<div className="row">
							<div className="col-xs-12">
								<button className="btn +primary right-lg-space bottom-lg-space">primary</button>
								<button className="btn +secondary right-lg-space bottom-lg-space">secondary</button>
								<a href className="btn +primary right-lg-space bottom-lg-space">PRIMARY link</a>
								<a href className="btn +secondary right-lg-space bottom-lg-space">secondary link</a>
							</div>
						</div>
						<div className="row margin-top-24 margin-bottom-20">
							<div className="col-xs-12">
								<button className="btn +primary +disabled right-lg-space bottom-lg-space">PRIMARY</button>
								<button className="btn +secondary right-lg-space bottom-lg-space" disabled>secondary</button>
								<a href className="btn +primary +disabled right-lg-space bottom-lg-space">PRIMARY link</a>
								<a href className="btn +secondary +disabled right-lg-space bottom-lg-space">secondary link</a>
							</div>
						</div>

						<br/>

						<div className="bss-subheader-sm padding-bottom-20">Flat Buttons</div>
						<div className="row">
							<div className="col-xs-12">
								<a href className="bss-link right-lg-space">PRIMARY link</a>
							</div>
						</div>
						<div className="row margin-top-24">
							<div className="col-xs-12">
								<a href className="bss-link +disabled right-lg-space">PRIMARY link</a>
							</div>
						</div>

						<br/>

						<div className="bss-subheader-sm padding-bottom-20">Icon Button</div>
						<div className="row">
							<div className="col-xs-12">
								<a href className="bss-link"><i className="bs-icon bs-icon-Work"></i></a>
								<a href className="bss-link"><i className="bs-icon bs-icon-Cog"></i></a>
								<a href className="bss-link"><i className="bs-icon bs-icon-Close"></i></a>
								<a href className="bss-link"><i className="bs-icon bs-icon-Help"></i></a>
								<a href className="bss-link"><i className="bs-icon bs-icon-LargeCheck"></i></a>
							</div>
						</div>
					</div>
				</div>
			)
		}
})
