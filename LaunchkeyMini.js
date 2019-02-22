//Init sequence to send Sysex

local.sendCC(1, 0, 0); //ResetLaunckey
local.sendNoteOn(1, 0x0C, 0x7F);//Enable inControl
local.sendSysex(0x7E, 0x7F, 6, 1); //This will send 4 bytes
 
local.sendCC(1, 0, 40); 
local.sendCC(1, 7, 108);
 

 //Functions

function setLed(led, red, green, flashRed, flashGreen)
{
	local.sendNoteOn(1, led+96, red + ((1-flashRed) << 2) + (green << 4) + ((1-flashGreen << 6))); 
}



//Commands


function setPadColor(pad, colors, flashing)
{
	setLed(pad, colors[0], colors[1], flashing, flashing);
}

function resetColors()
{
	for(var i=0;i<16;i++) setLed(0,0,0,0);
}



//Events

function moduleParameterChanged(param)
{
	if(param.getParent().name == "padColors")
	{
		var id = parseInt(param.name.substring(3));
		var val = param.getData();
		setLed(id, val[0],val[1], 0, 0);
	}
}


function noteOnEvent(channel, pitch, velocity)
{
	script.log("Note on received "+channel+", "+pitch+", "+velocity);
}


function noteOffEvent(channel, pitch, velocity)
{
	script.log("Note off received "+channel+", "+pitch+", "+velocity);
}

function ccEvent(channel, number, value)
{
	script.log("ControlChange received "+channel+", "+number+", "+value);
}

function sysExEvent(data)
{
	script.log("Sysex Message received, "+data.length+" bytes :");
}