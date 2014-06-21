/* Info
This file contains a Google Analytics script.
Simply add to the end of the body of your html file the following line:
<script language="JavaScript" type="text/javascript" charset="utf-8" src="/app/google/analytics.js">// Google Analytics script</script> */

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-51944046-1', 'drejk2.github.io');
ga('require', 'displayfeatures');
ga('require', 'linkid', 'linkid.js');
ga('send', 'pageview');