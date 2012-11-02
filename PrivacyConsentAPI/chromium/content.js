// Request and receive the consent flags from the background script
var port = new PortClient('PrivacyConsent');

console.log(port);

function recv(msg)
{
	// Create a script to make the consent flags available and trigger the ready function
	var json = JSON.stringify(msg.consentFlags);
	var stxt = "document.consent = JSON.parse('" + json + "'); if(typeof document.consentReady == 'function') document.consentReady(); console.log('Consent API ready', document.consent);";

	console.log(stxt);
	
	// Inject the script into the page
	var s = document.createElement('script');
	s.textContent = stxt;
	
	document.head.appendChild(s);
	s.parentNode.removeChild(s);
}

port.sendMessage({name: 'getflags'}, recv);


