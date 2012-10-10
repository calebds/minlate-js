minlate-js
===

A miniature, logic-less templating function written in JavaScript.

Usage
---
The minified source code for minlate-js is available in [minlate.min.js](https://github.com/paislee/minlate-js/blob/master/minlate.min.js).
You may download and link to this file or include its contents in your own JavaScript application.
The un-minified and commented source code is available in [minlate.js](https://github.com/paislee/minlate-js/blob/master/minlate.js).

Specify a template in HTML like this:
```
<div id="template1" class="minlate">
  <h3>{first} {last}</h3>
  <b>Email:</b> <span>{email}</span><br>
  <b>Phone:</b> <span>{phone}</span>
</div>
```
Once minlate-js has loaded, render a template by calling `minlate()`. For example:
```
minlate("template1", {
  first: "Jane",
  last: "Doe",
  email: "jane@example.com",
  phone: "555-555-5555"
});
```
This will cause the rendered template to appear in-place:
```
<div id="template1">
  <h3>Jane Doe</h3>
  <b>Email:</b> <span>jane@example.com</span><br>
  <b>Phone:</b> <span>555-555-5555</span>
</div>
```
Details
---
<h3>Calling the minlate function</h3>
```
minlate( id, map, [start, end])
```
__id__ - A string ID of the template to be rendered<br>
__map__ - A simple map of keys to string replacement values<br>
__start__ - An optional single-character string to override the default start character "{"<br>
__end__ - An optional single-character string to override the default end character "}"

__returns__ The DOM node representing the rendered template, or null if no template is rendered

This function requires two parameters. The first is a string value
representing the ID of a template node in the DOM. This node must have the
class 'minlate'. The second parameter is a simple Object mapping keys to
string values. The keys should correspond to places in the template markup
specified with {key}, and map[key] is the replacement value. Minlate
replaces all {keys} in the tempalate with values by specified by map, and
returns the updated DOM node.

The third and fourth parameters are optional, and should be single character
strings. If provided, these override the default start and end tokens for
replacement values. The defaults are open and close curly braces,
respectively.

<h3>Notes</h3>
- Templates are initially hidden, becoming visible once rendered.
- If no ID is provided, the function returns null.
- If a key in the template is absent from the map, it is replaced with the empty string.
- This function may be called any number of times; the template will be updated in the DOM.

Demo
---
A working example of minlate-js is available at http://paislee.net/minlate/minlate-test.html.

License
--- 
Copyright &copy; 2012 "Paislee" Caleb Sotelo<br>
Dual licensed under the MIT and GPL licenses.<br>
http://dev.paislee.net/about/license/
