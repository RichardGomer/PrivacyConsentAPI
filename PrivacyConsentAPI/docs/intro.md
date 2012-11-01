Privacy Consent API
===================

The Privacy Consent API is designed to be a lightweight addition to the browser DOM
that expresses a user's consent to a range of common privacy-related practices.


Background and Motivation
-------------------------

Directive 2009/136/EC from the European Commission imposed new requirements on service
providers to obtain "informed consent" from users before storing or retrieving information
to/from a user's computer.  This applies to web cookies, and was largely a result of
concerns over the use of user tracking (surveillance) technology by companies such
as advertising networks.

In the UK, at least, this has led to the proliferation of "cookie consent" dialogues on 
websites that use cookies.  These consent dialogues can be a burden on site owners to
implement and research from the HCI community suggests that users will become habituated
to consenting to cookies simply to close the dialogue - Undermining the good
intentions behind the directive.

The Privacy Consent API is designed to store user consent to a range of common cookie
uses and to expose that consent to websites in a simple manner, avoiding the need for
websites to ask users for permission directly - We hope that this will improve user 
experience and reduce the negative effects of user habituation.

The Privacy Consent API is developed by Richard Gomer, a postgraduate researcher in the
Web and Internet Research Group at the University of Southampton

@richardgomer
www.richardgomer.eu


API
-----

The API documented here is normative - Any implementations of the API must implement
all of the features described here, as they are described.

The API itself is relatively simple - Consisting of a list of "consent flags" that 
indicate a user's consent to a range of common scenarios, and a function that is called
when consent information becomes available or is updated.  Consent flags each indicate
consent to a particular and specific scenario.  It is important to understand those
scenarios if relying on the consent information provided by the API in order to
comply with the user's wishes or any applicable legislation.  Each flag is described in
detail below.

Consent flags are stored as a DOM property, document.consent, which is itself an object.

Each flag takes one of three values (true, false or null) to indicate whether the user has
consented storage/retrieval of information in a particular scenario.  True indicates that
the user has consented.  False indicates that the user has chosen to opt-out in this scenario.
Null indicates that the user has not specified their consent - Websites may wish to ask the
user for consent directly.

For instance, to determine if the user consents to the use of "single site analytics" 
(see the "Consent Flags" section below for a description of this and other flags).

	if(document.consent.singleSiteAnalytics === true)
	{
		// User has consented
	}
	elseif(document.consent.singleSiteAnalytics === false)
	{
		// User has actively declined consent - Do not bother them by asking for it
	}
	else // Flag is set to null
	{
		// User has not provided consent information - You could ask them
		// NB: The EU directive (at least in the UK) requires affirmative consent - 
		// You mustn't continue without active consent from the user
	}


Because of the limitations of the various browser extension APIs, it cannot be assumed that
consent information is available as soon as the page is ready.  Instead, the API will call 
document.consentReady (provided that it is function) when the consent information becomes available.
This allows websites to set up callbacks that will be fired as soon as consent information is 
available, as shown below.

	var doSomething = function()
	{
		alert("Consent information is ready");
	}
	
	document.consentReady = doSomething;


Consent Flags
-------------

**Single Site Analytics (consent.SingleSiteAnalytics)**

You may:
- Use a persistent cookie (hereby referred to as the tracking cookie) for the purpose of tracking return visits to the current domain in order to collect anonymous website statistics.
- Use a session or persistent cookie to track the user's current session on the current domain in
order to collect anonymous website statistics.

This flag does not give consent to:
- Track the user's visit across multiple domains
- Link the collected statistics to any information that could identify the user
- Infer or make a connection between different values of the tracking cookie (for instance by trying to aggregate statistics for the same user across multiple sessions)



Custom Consent Flags
--------------------

It would be beneficial, overall, for all implementations to share a common set of scenarios.

However, implementations may, if absolutely necessary, add their own consent flags for scenarios not defined here.  They 
must ensure that the scenario is well defined and that the flag's name is prefix with X, followed by a vendor-specific string.

	X_ACME_NameOfScenario
 

