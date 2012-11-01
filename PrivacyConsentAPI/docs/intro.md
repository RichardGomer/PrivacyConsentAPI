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
to consenting to cookies simply to close the dialogue - Thus undermining the good
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

The API itself is relatively simple.  Indeed, the most complex part of the system is
to understand exactly what each "consent flag" actually indicates.  It's important
that implementers understand what each flag means in order to legitimately claim
user consent.

Consent flags are stored as a DOM property, document.consent

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


 

