# kitty-form-validator

Super easy, super flexible client-side Javascript form validation component

## Installation

1. Type `npm install` into console
2. Type `bower install` into console

## Run tests

1. Type `grunt` into console

## Demo

Open `demo/index.html`

## API (Basics)

### Create a form validator

	var loginValidator = new FormValidator(formElement);

### Adding validators

Add a validator with only one simple rule for the username control.

	loginValidator.addValidator('username', [
		{
			method: function(control) {
				var valid = true;
				if(control.value == "") {
					valid = false;
				}
				return valid;
			},
			message: "Please enter your username"
		}
	]);

Add a validator with two rules for the password control.

	loginValidator.addValidator('password', [
		{
			// would encourage abstraction of
			// this method in a 'notEmpty' as
			// is obviously a candidate for
			// reuse
			method: function(control) {
				var valid = true;
				if(control.value == "") {
					valid = false;
				}
				return valid;
			},
			message: "Please enter a password"
		},
		{
			method: function(control) {
				var valid = true;
				if(control.value.length < 8) {
					return false;
				}
				return valid;
			},
			message: "Your password must be at least 8 characters"

		}
	]);

### Validate the form

Returns `true` when valid, `false` when invalid.

	loginValidator.validate();

### Get form errors

Get form errors in the format of `{ controlName: 'username', message: 'Please enter a username.' }`.

	loginValidator.getErrors();

There won't be any errors before validating the form.

## API (more)

### Params

If you wanted to reuse a function e.g. to ensure control never have a value greater then X. Then params are for you...

	function maxLengthRule(control, params) {
		var valid = true;
		if(control.value.length > params.length) {
			valid = false;
		}
		return valid;
	}

	loginValidator.addValidator('password', [{
		method: maxLengthRule,
		message: "Password can't be longer than 8 chars",
		params: {
			length: 8
		}
	}]);

### Cross-field validation

Yes, obviously. e.g a form that has two controls in it: `password` and `confirmPassword`. They must match.

	loginValidator.addValidator('password', [{
		method: function(control) {
			// check it matches another field
			var valid = false;
			var someOtherControl = document.getElementById('confirmPassword');
			if(control.value === someOtherControl.value) {
				valid = true;
			}
			return valid;
		},
		message: "Passwords need to match"
	}]);

## What about reacting to submit, blur, change events?

This is project-specific so this component leaves this functionality at your discretion. I may well be releasing an additional (bower) component that does this for you. But for now, you will definitely need some code that looks roughly like:

	var formElement = ...;
	var loginValidator = new kitty.FormValidator(formElement);
	lib.addEventListener(formElement, 'submit', function(e) {
		if(!loginValidator.validate()) {
			var errors = loginValidator.getErrors();
			showErrors(errors);
			e.preventDefault
		}
	});

	function showErrors(errors) {
		// Display list of errors at the top of the page/form
		// And/or in context of the relevant field etc
	}

Assuming you have more than one form for your project, it would be advisable to use kitty-base components to inherit from this constructor and add all the common bits (like listening for submit events and showing errors) into the inherited constructor.