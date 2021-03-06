describe(`<button is="cps-button" />`, () => {
	let el;

	beforeAll(done => {
		customElements
		.whenDefined('cps-button')
		.then(done)
		.catch(fail);
	});

	beforeEach(() => {
		el = document.createElement('button', {is: 'cps-button'});
	});

	afterEach(() => {
		el.parentNode.removeChild(el);
	});

	it(`actually upgrades a button to be a cps-button`, () => {
		document.body.appendChild(el);

		expect(el instanceof customElements.get('cps-button')).toBe(true);
	});

	it(`respects the actionType property values of 'primary' and 'secondary'`, done => {
		// Set the actionType before even appending to doc
		el.actionType = 'primary';
		document.body.appendChild(el);

		setTimeout(() => {
			expect(getComputedStyle(el).backgroundColor).toEqual('rgb(0, 191, 75)');
			el.actionType = 'secondary';

			setTimeout(() => {
				expect(getComputedStyle(el).backgroundColor).toEqual('rgb(244, 244, 244)');
				el.actionType = 'primary';

				setTimeout(() => {
					expect(getComputedStyle(el).backgroundColor).toEqual('rgb(0, 191, 75)');
					done();
				}, 50);
			}, 50);
		}, 50);
	});

	it(`respects the actionType property value for 'flat'`, done => {
		el.actionType = 'flat';
		document.body.appendChild(el);
		setTimeout(() => {
			// fully transparent background for flat buttons
			expect(['rgba(0, 0, 0, 0)', 'transparent'].indexOf(getComputedStyle(el).backgroundColor)).toBeGreaterThan(-1);
			// Default to green text for flat buttons
			expect(getComputedStyle(el).color).toEqual('rgb(0, 191, 75)');
			done();
		}, 50);
	});

	it(`respects the showLoader property`, done => {
		el.textContent = 'Button text'
		document.body.appendChild(el);

		setTimeout(() => {
			expect(el.querySelector('.cps-loader')).toBeFalsy();

			el.showLoader = true;
			setTimeout(() => {
				expect(el.querySelector('.cps-loader')).toBeTruthy();
				expect(el.textContent).toBe('');
				el.showLoader = false;
				setTimeout(() => {
					expect(el.querySelector('.cps-loader')).toBeFalsy();
					expect(el.textContent).toBe('Button text'); // Restores the text from before loader was activated
					done();
				}, 50);
			}, 50);
		}, 50);
	});

	xit(`respects the disableOnClick property`, done => {
		document.body.appendChild(el);

		el.disableOnClick = true;
		expect(el.disabled).toBe(false);

		setTimeout(() => {
			el.click();
			setTimeout(() => {
				expect(el.disabled).toBe(true)
				done();
			}, 1000);
		}, 50);
	});

	it(`makes a button bigger if the 'phat' property is set`, done => {
		document.body.appendChild(el);

		el.phat = true;

		setTimeout(() => {
			expect(el.getBoundingClientRect().height).toEqual(48);
			done();
		}, 50);
	});

	it(`doesn't change the width of a button when the loader shows after initially not showing`, done => {
		el.textContent = 'a pretty wide button';
		document.body.appendChild(el);

		setTimeout(() => {
			const originalWidth = el.clientWidth;
			el.showLoader = true;
			expect(el.querySelector('.cps-loader'));
			expect(el.clientWidth).toEqual(originalWidth);
			done();
		}, 50);
	});
});
