# rolancia-abstract-logger

## About

rolancia-abstract-logger is a logger that provides easy logging processes for js, ts.
  
when you start to develop, you might want just leave it in console style logging. then you will want to change it to write to a file or db or something similar way.
  
that's what it does.

## Installation

```
npm install --save rolancia-abstract-logger
```

## Import

Typescript
```
Import {
    init,
    LogProc,
    LogProcs,
    log,
    info,
    warn,
    error,
    debug
} from 'rolancia-abstract-logger';
```

Javascript
```
const absLogger = require('rolancia-abstract-logger);
const log = absLogger.log;
const info = absLogger.info;
const warn = absLogger.warn;
const error = absLogger.error;
const debug = absLogger.debug;
```

## Example

### At start of development

```ts
import {
    init, log, error, LogProc, LogProcs
    } from 'rolancia-abstract-logger';

const simpleLog: LogProc = (message: string, args: any[]): boolean => {
    console.log(message, ...args);
    // write a simple logging procedure for testing.

    return false;
    // if return true, it will call the default log function on the console.
}
const logProc: LogProcs = {
    log: simpleLog,
    info: simpleLog,
    warn: simpleLog,
    error: simpleLog,
    debug: simpleLog
    // you can register log procedure individually.
}
init(logProc);

// if you don't like this step, just skip. default logging will be applied.
```
<br>

### While development

```ts
function cook(name: string, ingredients: Food) {
    const isDone = doCook(ingredients);
    if (isDone) {
        log('%s done', name);
        // like console.log
    }
    else {
        error('%s failed', name);
        // like console.error
    }
}
```
<br>

### At end of development

```ts
const simpleLog: LogProc = (message: string, args: any[]): boolean => {
    // just rewrite or replace your log procedure code
    fs.appendFile('log.txt', util.format(message, args), (err) => {
        if (err) throw err;
    });

    return false;
}
```

## Test
```
npm test
```