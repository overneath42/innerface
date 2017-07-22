# Innerface

**A system of simple UI actions implemented with an HTML API.**

## What is Innerface?

Innerface provides a set of interactions which can be implemented into any page using a simple HTML API.

## How To Use It

To add the library to your site, just include the file on your page; it will automatically activate and initiate any events as necessary based on what it finds within your page.

### Modules

#### Disable

The `disable` module handling automatic disable actions, by linking any number of inputs to a common 'condition' input. The condition input is provided a reference value, and whenever its actual value equals the reference value, the linked inputs will all be disabled automatically. The effect is reverted whenever the values do not match.

```html
<input
  type="text"
  data-if-disable="checkboxIsChecked">

<input
  type="checkbox"
  data-if-disable-condition="checkboxIsChecked|false">
```

In this example, the text input is disabled when the checkbox is checked.

The target inputs should all receive `data-if-disable`. Inputs will be grouped by attribute values. The shared condition input should receive `data-if-disable-condition` with a pipe-separated pair of strings:

- the linked attribute name
- the reference value

#### Validate Input

The `validateInput` module retrieves the value of an input immediately after it is changed, and validates that value against a list of rules.

```html
<label for="validate_sample_1">This input will only accept integers.</label>
<input
  type="text"
  id="validate_sample_1"
  data-if-validate-input="integer">

<label for="validate_sample_2">This input will only accept a number greater than or equal to 10.</label>
<input
  type="number"
  id="validate_sample_2"
  data-if-validate-input="greaterThanOrEqualTo[10]">

<label for="validate_sample_3">This input will only accept an integer greater than 0 and less than 10.</label>
<input
  type="number"
  id="validate_sample_3"
  data-if-validate-input="greaterThan[0]|lessThan[10]">
```

#### Validate Form

The `validateForm` module retrieves all `required` fields within a form. Upon validation, if any required field does not have a value, the module disables any buttons which could submit the form.

```html
<form action="#" data-if-validate-form>
  <div class="form-group">
    <label for="validate_form_field_1" class="control-label">Field One</label>
    <input type="text" name="validate_form_field_1" id="validate_form_field_1" class="form-control" required>
  </div>

  <input type="submit" class="btn btn-default">
</form>
```
