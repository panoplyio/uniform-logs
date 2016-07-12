# uniform-logs

Override the default console methods to enforce a single log format.
By default an ISO timestamp is appended to each log line as well as the type
of log function called ( LOG, INFO, WARN, ERROR ).

## Usage:

Require the module and call the `override()` function.

    require('uniform-logs').override();

## Options:

**Identify caller** - For console functions log/info/warn, it is possible to include in the log message
the file and line number from which the call to console originated. In order to use this feature, pass
a truthy argument to the `override` function:

    require('uniform-logs').override(true);

Note that in order to identify the original caller of the console function a stack trace needs to be
generated. In a code base with many calls to the console functions, this can have a negative effect on
performance. Therefore turning on the identify caller feature should only be used in a debugging scenario.
