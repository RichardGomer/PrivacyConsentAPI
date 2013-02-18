	var scenarios = {
			
		'analytics_firstparty' : {'name': 'Anonymous Usage Statistics', 'desc': "Many websites collect anonymous usage statistics so that they can see whether visitors return to the website, how often they visit and which pages they are most interested in."},
		'analytics_thirdparty' : {'name': 'Anonymous Usage Statistics (Third Party)', 'desc': "Some websites use 'third parties' (outside companies) to collect anonymous usage statistics  so that they can see whether visitors return to the website, how often they visit and which pages they are most interested in.  Third parties may collect information about your usage of multiple websites and possibly share the information that they collect between those websites."}
			
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
				
				document.getElementById('prefs').appendChild(d);
			};
			
			run();
		}
		
		wizard();
	}
	
	var wizard = function()
	{
		var div = document.getElementById('prefs');
		
		div.className = "wizard";
		
		console.log(div);
		
		div.firstElementChild.className = 'selected';
		
		var donext = function()
		{
			var selected = div.getElementsByClassName('selected');
			
			console.log(selected);
			console.log(selected[0].tagName.toLowerCase());
			
			if(selected.length > 0 && selected[0].nextElementSibling != null && selected[0].nextElementSibling.tagName.toLowerCase() == 'div')
			{
				var s = selected[0];
				
				s.className = '';
				s.nextElementSibling.className = 'selected';
			}
		}
		
		var doprev = function()
		{
			var selected = div.getElementsByClassName('selected');
			
			if(selected.length > 0 && selected[0].previousElementSibling != null)
			{
				var s = selected[0];
				
				s.className = '';
				s.previousElementSibling.className = 'selected';
			}
		}
		
		var next = document.createElement('span');
		next.className = 'next';
		next.innerHTML = "&gt;";
		next.onclick = donext;
		
		var prev = document.createElement('span');
		prev.className = 'prev';
		prev.innerHTML = "&lt;";
		prev.onclick = doprev;
		
		div.appendChild(prev);
		div.appendChild(next);
		
		var showall = document.createElement('span');
		showall.className = 'showall';
		showall.onclick = unwizard;
		showall.innerHTML = "Show All";
		
		div.appendChild(showall);
	}
	
	var unwizard = function()
	{
		document.getElementById('prefs').className = "";
	}
	
	document.addEventListener("DOMContentLoaded", ready, false);
	
	
	
	
	