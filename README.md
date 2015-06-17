# kitty-form-validator

Super easy, super flexible client-side Javascript form validation component

## Usage

Create a form validator.

	var loginValidator = new FormValidator(formElement);

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

Validate the form. Returns `true` when valid, `false` when invalid.

	loginValidator.validate();

Get form errors. There won't be any errors before validating the form.

	loginValidator.getErrors();

## Params

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

## How about cross field validation

You can do anything you want, include cross-field validation.

	loginValidator.addValidator('password', [{
		method: function(control) {
			// check it matches another field
			var valid = false;
			var someOtherControl = document.getElementById('password_confirm');
			if(control.value === someOtherControl.value) {
				valid = true;
			}
			return valid;
		}
	}]);

## Advice

Write a project specific FormValidator that inherits from kitty-form-validator so that you can define *when* to validate and *how* to display errors etc. Ready made example coming soon.
