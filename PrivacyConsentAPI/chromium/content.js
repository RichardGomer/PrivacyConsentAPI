// Request the consent flags from the background script


// Receive the consent flags from the background script


// Convert the consent flags to json


// Create a script to make the consent flags available and trigger the ready function
var json = JSON.stringy(flags);
var stxt = "document.consent = JSON.parse(\"" + json + "\"); if(typeof document.consentReady == 'function') document.consentReady();";

// Inject the script into the page
var s = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);