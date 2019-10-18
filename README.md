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

## Create you own channel

This example demonstrates how to create a MongoDB channel.
The implementation can be found [here](https://www.npmjs.com/package/ts-mongodb-logger).

Create a class that implements _ILoggerChannel_ interface.

    import assert from "assert";
    import {MongoClient} from "mongodb";
    import {ILoggerChannel} from "ts-composite-logger";
    import {ILogMessage} from "ts-composite-logger";

    export class MongoDB implements ILoggerChannel {
      private readonly connectUrl: string;
      private readonly dbName: string;
      private readonly collectionName: string;
      private client;

      constructor(url: string, db: string, collection: string) {
        this.connectUrl = url;
        this.dbName = db;
        this.collectionName = collection;
      }

      public async write(message: ILogMessage) {
        if (!this.client) {
          throw new Error("Channel not connected to DB");
        }

        const db = this.client.db(this.dbName);
        const collection = db.collection(this.collectionName);
        await this.insert(collection, message);
      }

      private insert(collection, message: ILogMessage) {
        return new Promise((resolve, reject) => {
          collection.insertOne(message, (error, result) => {
            if (error) {
              return reject(error);
            }

            return resolve();
          });
        });
      }

      public connect(): Promise<ILoggerChannel> {
        return new Promise((resolve, reject) => {
          MongoClient.connect(this.connectUrl, { useNewUrlParser: true }, (err, client) => {
            try {
              assert.strictEqual(null, err);
            } catch (e) {
              return reject(e);
            }
            
            this.client = client;
            resolve(this);
          });
        });
      }
    }

Now you can add an instance of this class to the composite logger by calling
_addChannel_ method.
