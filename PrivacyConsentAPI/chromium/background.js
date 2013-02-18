
function PrivacyConsentModel()
{
	var self = this;
	
	self.consentFlags = {};

	/*
	 * Set a flag
	 */
	self.setFlag = function(name, value)
	{
		self.consentFlags[name] = value;
	
		//console.log(name, value);
		
		self.storeConsent();
	}
	
	/*
	 * Get the flags
	 */
	self.getFlags = function()
	{
		return self.consentFlags;
	}
	
	/*
	 * Set up an event listener to handle flag requests from content script
	 */
	self.handleRequest = function(port, message)
	{
		message.consentFlags = self.consentFlags;
		port.postMessage(message);
	}
	
	chrome.extension.onConnect.addListener(function(port)
	{
		port.onMessage.addListener(
					function(msg)
					{
						self.handleRequest(port, msg);
					}
				);
	});
	
	/*
	 * Store flags in persistent storage
	 */
	self.storeConsent = function()
	{
		var newflags = {'consentFlags': self.consentFlags};
		chrome.storage.sync.set(newflags);
	}
	
	/*
	 * Restore flags from storage
	 */
	self.loadConsent = function()
	{
		var restore = function(flags)
		{
			if(chrome.extension.lastError != undefined || typeof flags.consentFlags == 'undefined')
			{
				return;
			}
			
			//console.log("Loaded flags", flags);
			
			self.consentFlags = flags.consentFlags;
		}
		
		chrome.extension.lastError = undefined; // clear error register so we can detect load failure
		
		chrome.storage.sync.get('consentFlags', restore);
	}
	
	self.loadConsent();
}

// Adding to window makes the object accessible using getBackgroundPage() elsewhere in the extension
window.consentModel = new PrivacyConsentModel();


// Set up browser action to configure prefs

var showPrefs = function(tab)
{
	chrome.tabs.create({'url': chrome.extension.getURL('prefs.html')});
}

chrome.browserAction.onClicked.addListener(showPrefs); 
