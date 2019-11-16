import * as fs from 'fs';

type LogProc = (message: string, ...args: any[]) => boolean | undefined;
type LogProcs = {
    log: LogProc,
    info: LogProc,
    warn: LogProc
    error: LogProc,
};
enum LogLevel {
    LOG = 'Log',
    INFO = 'Info',
    WARN = 'Warn',
    ERROR = 'Error'
}

let __defaultHead = 'ABSLogger:%s:';
let _defaultHead = __defaultHead;
let _defaultProcs: LogProcs = {
    log: (message, ...args: string[]) => {
        const logLevelStr = LogLevel.LOG.padEnd(5, ' ')
        console.log(_defaultHead + message, logLevelStr, ...args);
        return false;
    },
    info: (message, ...args: any[]) => {
        const logLevelStr = LogLevel.INFO.padEnd(5, ' ')
        console.info(_defaultHead + message, logLevelStr, ...args);
        return false;
    },
    warn: (message, ...args: any[]) => {
        const logLevelStr = LogLevel.WARN.padEnd(5, ' ')
        console.warn(_defaultHead + message, logLevelStr, ...args);
        return false;
    },
    error: (message, ...args: any[]) => {
        const logLevelStr = LogLevel.ERROR.padEnd(5, ' ')
        console.error(_defaultHead + message, logLevelStr, ...args);
        return false;
    },
}
let _procs: LogProcs = Object.assign({}, _defaultProcs);

export function init(
    procs?: LogProcs,
    defaultHead?: string
): void {
    if (procs) {
        _procs = procs;
    }
    if (defaultHead) {
        _defaultHead = defaultHead;
    } else {
        _defaultHead = __defaultHead;
    }
}

export function log(message: string, ...args: any[]): void {
    _log(LogLevel.LOG, message, ...args);
}

export function info(message: string, ...args: any[]): void {
    _log(LogLevel.INFO, message, ...args);
}

export function warn(message: string, ...args: any[]): void {
    _log(LogLevel.WARN, message, ...args);
}

export function error(message: string, ...args: any[]): void {
    _log(LogLevel.ERROR, message, ...args);
}

function _log(level: LogLevel, message: string, ...args: any[]): void {
    const proc = _getLogProc(level);
    
    if (proc) {
        const flag = proc(message, ...args);
        if (flag) {
            if (level === LogLevel.LOG) _defaultProcs.log(message, ...args);
            else if (level === LogLevel.INFO) _defaultProcs.info(message, ...args);
            else if (level === LogLevel.WARN) _defaultProcs.warn(message, ...args);
            else if (level === LogLevel.ERROR) _defaultProcs.error(message, ...args);
        }
    }
}

function _getLogProc(level: string): LogProc | undefined {
    if (level === LogLevel.LOG) return _procs.log ? _procs.log : _defaultProcs.log;
    else if (level === LogLevel.INFO) return _procs.info ? _procs.info : _defaultProcs.info;
    else if (level === LogLevel.WARN) return _procs.warn ? _procs.warn : _defaultProcs.warn;
    else if (level === LogLevel.ERROR) return _procs.error ? _procs.error : _defaultProcs.error;
}