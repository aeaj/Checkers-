import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body><div id="gameBoard"></div></body></html>');
global.document = dom.window.document;
global.window = dom.window;
