'use strict';
var expect = require('chai').expect;
var ABSLogger = require('../dist/index.js');

describe('abstract logger test', () => {
  it('console style logging', () => {
    ABSLogger.log('Okay. Nice foods! First: %s, Second: %s', 'Kimchi', 'Chicken');
    ABSLogger.info('Okay. Nice foods! First: %s, Second: %s', 'Kimchi', 'Chicken');
    ABSLogger.warn('Okay. Nice foods! First: %s, Second: %s', 'Kimchi', 'Chicken');
    ABSLogger.error('Okay. Nice foods! First: %s, Second: %s', 'Kimchi', 'Chicken');
  });
  
  it('console style logging with custom header', () => {
    ABSLogger.init(null, 'Log of %s:');
    ABSLogger.log('Okay. Nice foods! First: %s, Second: %s', 'Kimchi', 'Chicken');
    ABSLogger.info('Okay. Nice foods! First: %s, Second: %s', 'Kimchi', 'Chicken');
    ABSLogger.warn('Okay. Nice foods! First: %s, Second: %s', 'Kimchi', 'Chicken');
    ABSLogger.error('Okay. Nice foods! First: %s, Second: %s', 'Kimchi', 'Chicken');
  });

  it ('overrided logging', () => {
    ABSLogger.init({
        log: (message, ...args) => {
            console.log('I WILL UPLOAD LOGS TO MY DB');
        },
        info: (message, ...args) => {
            console.log('I WILL UPLOAD INFO LOGS TO MY DB');
            return false;
        },
        warn: (message, ...args) => {
            console.log('I WILL UPLOAD WARN LOGS TO MY DB AND CONSOLE ALSO');
            return true;
        },
        error: (message, ...args) => {
            console.log('I WILL UPLOAD ERROR LOGS TO MY DB AND CONSOLE ALSO');
            return true;
        }
    });
    ABSLogger.log('Okay. Nice foods! First: %s, Second: %s', 'Kimchi', 'Chicken');
    ABSLogger.info('Okay. Nice foods! First: %s, Second: %s', 'Kimchi', 'Chicken');
    ABSLogger.warn('Okay. Nice foods! First: %s, Second: %s', 'Kimchi', 'Chicken');
    ABSLogger.error('Okay. Nice foods! First: %s, Second: %s', 'Kimchi', 'Chicken');
  });
})