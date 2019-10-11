  # Composite logger  
  Use this package in your applications for logging. Out of the box the package outputs logs to console. You can create more custom channels and send data to them as well, dynamically add and remove them. The advantage of this logger is that it's easy to extend it.  
    
  **npm install -S ts-composite-logger**  
    
  ## Basic usage  
    
  	import {Logger, Console, LogLevel} from "ts-composite-logger";
      
  	const console = new Console();  
  	console.setFormat("hh:mm:ss.SSS"); // this is default
  	
  	global.logger = (new Logger())
		.addChannel(console)
		.setLevel(LogLevel.INFO);
  		
  	global.logger.info("VM connected");
  
  *Available log levels:*
  
  - fatal
  - error
  - warn
  - info
  - debug
  
  > By default **debug** log level is selected. Which means that every log reqest will be fullfilled.
  
  ##  Date format options for console channel
  Format string can be anything, but the following letters will be replaced (and leading zeroes added if necessary):
  
  -   dd -  `date.getDate()`
  -   MM -  `date.getMonth() + 1`
  -   yy -  `date.getFullYear().toString().substring(2, 4)`
  -   yyyy -  `date.getFullYear()`
  -   hh -  `date.getHours()`
  -   mm -  `date.getMinutes()`
  -   ss -  `date.getSeconds()`
  -   SSS -  `date.getMilliseconds()`
  -   O - timezone offset in +hm format (note that time will be in UTC if displaying offset)
  
  > The underlying package to format dates is **date-format**. You can find more details [here](https://www.npmjs.com/package/date-format)
