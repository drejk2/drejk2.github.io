/* Info
This file is a library of some useful javascript scripts, that you can easily add to your files.
Simply add to your html file with the following line:
<script language="JavaScript" type="text/javascript" charset="utf-8" src="/general/scripts.js">// Adds the mScripts object with some useful functions</script> */

var scripts = {

distance: function(a,b,inclusive) {
	// Measures the distance between two integers, "a" and "b", in or excluded.
	var c;
	a = parseInt(a) || 0;
	b = parseInt(b) || 0;
	inclusive = (inclusive == "false") ? false : Boolean(inclusive);
	c = Math.abs(a-b);
	c = (inclusive == true) ? (c + 1) : (c - 1);
	(c < 0) ? c = 0 : "";
	return c;
	},

};