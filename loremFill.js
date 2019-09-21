let tag, tagAttributes, childNode, childNodeAttributes, outputText, listArr;
let loremText = require('./lorem');
let loremTargets = document.querySelectorAll('[lorem-fill]');
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
                outputText = this.outputLorem(element.innerText);
                element.innerText = outputText;
                tag = document.createElement(element.nodeName.toLowerCase());
                tag.innerHTML = outputText;
                tagAttributes = element.attributes;
                this.cloneAttributes(tagAttributes);
                let regx = new RegExp('{{.*');
                let results = regx.exec(element.innerText);
                if(!results && element.innerText !== 'Lorem'){
                    return;
                } else {
                    this.cloneElements(element, Number(element.attributes['lorem-fill'].value)-1);
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

