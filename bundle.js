(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let App = require('./loremFill.js');
App.beingFill();

},{"./loremFill.js":2}],2:[function(require,module,exports){
let tag, tagAttributes, childNode, childNodeAttributes;
const loremFill = {
    beingFill: function () {
        // let loremText = require('./lorem');
        let loremText = 'Lorem ipsum dolor sit amet.';
        let loremTargets = document.querySelectorAll('[lorem-fill]');
        // let loremText = 'Lorem ipsum dolor sit amet.';
        loremTargets.forEach((element) => {
            if (element.innerHTML.trim() === '') {
                tag = document.createElement(element.nodeName.toLowerCase());
                tag.innerHTML = loremText;
                tagAttributes = element.attributes;
                this.cloneAttributes(tagAttributes);
                if (element.attributes['lorem-fill'] && element.innerHTML.trim() === '') {
                    element.innerText = loremText;
                    this.cloneElements(element, Number(element.attributes['lorem-fill'].value) - 1);
                } else {
                    this.cloneElements(element, Number(element.attributes['lorem-fill'].value));
                }
            } else if (element.hasChildNodes() && element.lastElementChild !== null) {
                tag = document.createElement(element.nodeName.toLowerCase());
                if (element.hasChildNodes() && element.lastElementChild !== null) {
                    let childs = element.childNodes;
                    childs.forEach((child) => {
                        if (child.innerText === '{{lorem-fill}}') {
                            child.innerText = loremText;
                            childNode = document.createElement(child.nodeName.toLowerCase());
                            childNodeAttributes = child.attributes;
                            this.cloneAttributes(childNodeAttributes, true);
                            childNode.innerHTML = loremText;
                            tag.append(childNode);
                        }

                    });
                }
                this.cloneElements(element, Number(element.attributes['lorem-fill'].value) - 1);
            }
        });
    },


    cloneElements: function (el, repeatValue) {
        let clonedParent = el;
        let frag = document.createDocumentFragment();
        frag.append(tag);
        let handle;
        let loremValue = repeatValue;
        for (let i = 0; i < loremValue; i++) {
            handle = frag.cloneNode(true);
            clonedParent.after(handle);
        }
    },

    cloneAttributes: function (attr, innerChild = false) {
        for (let i = 0; i < attr.length; i++) {
            if (attr[i].nodeName === 'lorem-fill') {
                continue;
            }
            if (!innerChild) {
                tag.setAttribute(attr[i].nodeName, attr[i].nodeValue);
            } else {
                childNode.setAttribute(attr[i].nodeName, attr[i].nodeValue);
            }
        }
    }
};

module.exports = loremFill;


},{}]},{},[1]);
