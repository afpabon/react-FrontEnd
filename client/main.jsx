import React from 'react';
import { Provider } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import store from './store';
import App from '../imports/components/App';
 
Meteor.startup(() => {
	render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('render-target')
	);
});