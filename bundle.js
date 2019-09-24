(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let App = require('./loremFill.js');
App.beingFill();

},{"./loremFill.js":2}],2:[function(require,module,exports){
let tag, tagAttributes, childNode, childNodeAttributes, outputText, listArr;
let loremTargets = document.querySelectorAll('[lorem-fill]');
let loremText = {
        "fill": "Lorem",
        "sent": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "list": [
            "Lorem",
            " ipsum",
            " dolor",
            " sit",
            " amet",
            " consectetur",
            " adipiscing",
            " elit",
            " sed",
            " do",
            " eiusmod",
            " tempor",
            " incididunt",
            " ut",
            " labore",
            " et",
            " dolore",
            " magna",
            " aliqua"
        ],
        "paragraph": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    };
const loremFill = {
    beingFill: function () {
        loremTargets.forEach((element) => {
            if (element.innerHTML.trim() === undefined && element.innerHTML.trim() !== '') {
                outputText = this.outputLorem(element.innerText);
                tag = document.createElement(element.nodeName.toLowerCase());
                tag.innerHTML = outputText;
                tagAttributes = element.attributes;
                this.cloneAttributes(tagAttributes);
                if (element.attributes['lorem-fill'] && element.hasChildNodes()) {
                    element.innerText = outputText;
                    this.cloneElements(element, Number(element.attributes['lorem-fill'].value) - 1);
                }
                this.cloneElements(element, Number(element.attributes['lorem-fill'].value));
            } else if (element.hasChildNodes() && element.lastElementChild !== null) {
                outputText = this.outputLorem(element.innerText);
                tag = document.createElement(element.nodeName.toLowerCase());
                if (element.hasChildNodes()) {
                    let childs = element.childNodes;
                    childs.forEach((child) => {
                        outputText = this.outputLorem(child.innerText);
                        if (child.innerText !== '') {
                            listArr = Array.from(outputText);
                            child.innerText = this.randomList();
                            childNode = document.createElement(child.nodeName.toLowerCase());
                            childNodeAttributes = child.attributes;
                            this.cloneAttributes(childNodeAttributes, true);
                            childNode.innerHTML = this.randomList();
                            tag.append(childNode);
                        }
                    });
                }
                this.cloneElements(element, Number(element.attributes['lorem-fill'].value) - 1);
            } else {
                let regx = new RegExp('{{.*');
                let results = regx.exec(element.innerText);
                if(results !== null){
                    outputText = this.outputLorem(element.innerText);
                    element.innerText = outputText;
                    tag = document.createElement(element.nodeName.toLowerCase());
                    tag.innerHTML = outputText;
                    tagAttributes = element.attributes;
                    this.cloneAttributes(tagAttributes);
                    this.cloneElements(element, Number(element.attributes['lorem-fill'].value) - 1);
                }
            }
        });
    },

    randomList: () => {
        return listArr[Math.floor(Math.random() * listArr.length)];
    },
    outputLorem: function (cmd) {
        let regx = new RegExp('{{.*');
        let results = regx.exec(cmd);
        if (results) {
            if (cmd === '{{lorem-sent}}') {
                return loremText.sent;
            } else if (cmd === '{{lorem-pg}}') {
                return loremText.paragraph;
            } else if (cmd === '{{lorem-list}}') {
                return loremText.list;
            } else if (cmd === '{{lorem}}') {
                return loremText.fill;
            }
        } else {
            return cmd;
        }
    },

    cloneElements: function (el, repeatValue) {
        let clonedParent = el;
        let frag = document.createDocumentFragment();
            console.log();

        frag.append(tag);
        let handle;
        let loremValue = repeatValue;
        for (let i = 0; i < loremValue; i++) {
            if (tag.lastElementChild !== null) {
                childNode.innerHTML = this.randomList();
                tag.append(childNode);
            }
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
