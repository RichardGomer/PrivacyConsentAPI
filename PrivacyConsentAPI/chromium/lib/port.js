/**
 * Chromium port handling library
 */

function PortClient(name)
{
	var self = this;
	
	self.port = chrome.extension.connect({'name': name});
	self.msgCallbacks = new Array();

	/**
	 * Receive replies
	 */
	self.port.onMessage.addListener(
		function(msg)
		{
			//console.log('Receive', msg);
			
			// Look up the callback and run it
			self.msgCallbacks[msg.msgID](msg);
			
			self.msgCallbacks[msg.msgID] = undefined;
		}
	);
	
	/**
	 * Send requests
	 */
	self.sendMessage = function(msg, callback)
	{
		msg.msgID = self.msgCallbacks.length;
		self.msgCallbacks.push(callback);
		
		//console.log('Send', msg);
		
		self.port.postMessage(msg);
	}
}