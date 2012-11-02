	var scenarios = {
			
		'flagName' : {'name': 'Name', 'desc': "Description"},
		'flagName2' : {'name': 'Name', 'desc': "Description"}
			
	};
	
	var bg = null;
	var ready = function()
	{
		bg = chrome.extension.getBackgroundPage();
		
		model = bg.consentModel;
		
		// Add a section for each scenario
		for(var fname in scenarios)
		{
			
			var run = function() // Create a closure 
			{ 
				var s = scenarios[fname];
				var flag = fname;
				
				var d = document.createElement('div');
				
				var title = document.createElement('h2');
				title.innerText = s.name;
				
				var desc = document.createElement('p');
				desc.innerText = s.desc;
				
				var options = document.createElement('select');
				
				var ask = document.createElement('option');
				ask.setAttribute('value', 'ask');
				ask.innerText = 'Ask Me';
				options.appendChild(ask);
				
				
				var yes = document.createElement('option');
				yes.setAttribute('value', 'consent');
				yes.innerText = 'Give Consent';
				options.appendChild(yes);
				
				
				var no = document.createElement('option');
				no.setAttribute('value', 'decline');
				no.innerText = 'Decline Consent';
				options.appendChild(no);
				
				options.onchange = function()
				{
					switch(options.value)
					{
						case 'decline':
							bg.consentModel.setFlag(flag, false);
							break;
							
						case 'consent':
							bg.consentModel.setFlag(flag, true);
							break;
							
						case 'ask':
							bg.consentModel.setFlag(flag, null);
							break;
					}
				}
				
				var val = bg.consentModel.getFlags()[flag];
				var idx = (val === null || val === undefined) ? 0 : (val === true ? 1 : 2); 
				
				console.log(val, idx);
				
				options.selectedIndex = idx;
				
				d.appendChild(title);
				d.appendChild(desc);
				d.appendChild(options);
				
				document.body.appendChild(d);
			};
			
			run();
		}
	}
	
	document.addEventListener("DOMContentLoaded", ready, false);
	