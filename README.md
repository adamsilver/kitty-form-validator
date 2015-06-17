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

Check if the form is valid.

	loginValidator.validate();

Get form errors. There won't be any errors before validating the form.

	loginValidator.getErrors();

## Complex rules

This validator can do it all - just name it?

### Cross field

Coming soon

## Advice

Write a project specific FormValidator that inherits from kitty-form-validator so that you can define *when* to validate and *how* to display errors etc. Ready made example coming soon.
