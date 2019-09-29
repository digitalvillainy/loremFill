((document) => {
    let tag, tagAttributes, childNode, childNodeAttributes, outputText, listArr, finalParagraph;
    let finalArr = [];
    let createParagraph = [];
    let loremText = {
        "fill": [
            "lorem",
            "ipsum",
            "dolor",
            "sit",
            "amet",
            "consectetur",
            "adipiscing",
            "elit",
            "sed",
            "do",
            "eiusmod",
            "tempor",
            "incididunt",
            "ut",
            "labore",
            "et",
            "dolore",
            "magna",
            "aliqua",
            "enim",
            "ad",
            "minim",
            "veniam",
            "quis",
            "nostrud",
            "exercitation",
            "ullamco",
            "laboris",
            "nisi",
            "ut",
            "aliquip",
            "ex",
            "ea",
            "commodo",
            "consequat",
            "duis",
            "aute",
            "irure",
            "in",
            "reprehenderit",
            "voluptate",
            "velit",
            "esse",
            "cillum",
            "dolore",
            "eu",
            "fugiat",
            "nulla",
            "pariatur",
            "excepteur",
            "sint",
            "occaecat",
            "cupidatat",
            "non",
            "proident",
            "sunt",
            "culpa",
            "qui",
            "officia",
            "deserunt",
            "mollit",
            "anim",
            "id",
            "est",
            "laborum"
        ]
    };

    let loremTargets = document.querySelectorAll('[lorem-pg], [lorem-sent], [lorem]');
    listArr = loremText.fill;
    const loremFill = {
        beginFill: function () {
            loremTargets.forEach((element) => {
                if (element.childNodes.length === 0) {
                    tag = document.createElement(element.nodeName.toLowerCase());
                    tag.innerHTML = this.outputLorem(element.attributes[0].nodeName);
                    tagAttributes = element.attributes;
                    this.cloneAttributes(tagAttributes);
                    this.cloneElements(element, element.attributes[0].value);
                } else if (element.childNodes.length !== 0 && element.lastElementChild !== null) {
                    outputText = this.outputLorem(element.attributes[0].nodeName);
                    tag = document.createElement(element.nodeName.toLowerCase());
                    if (element.hasChildNodes()) {
                        let childs = element.childNodes;
                        childs.forEach((child) => {
                            if (child.innerText !== '#text' && child.innerText !== undefined) {
                                child.innerText = this.randomList(0);
                                childNode = document.createElement(child.nodeName.toLowerCase());
                                childNodeAttributes = child.attributes;
                                this.cloneAttributes(childNodeAttributes, true);
                                childNode.innerHTML = this.randomList(0);
                                tag.append(childNode);
                            }
                        });
                    }
                    this.cloneElements(element, element.attributes[0].value - 1);
                }
            });
        },

        randomList: function (num, repeat = false) {
            if (!repeat) {
                return listArr[Math.floor(Math.random() * listArr.length)];
            } else {
                for (let i = 0; i < num; i++) {
                    finalArr[i] = listArr[Math.floor(Math.random() * listArr.length)];
                }
                return finalArr;
            }
        },

        createSentence: function (num, repeat = false) {
            if (num === 0 && !repeat) {
                this.randomList(8, true);
                let sentence = finalArr.join();
                let finalSentence = sentence.replace(/,/g, ' ');
                finalSentence = finalSentence.charAt(0).toUpperCase() + finalSentence.slice(1);
                return finalSentence + '.';
            } else {
                for (let i = 0; i < num; i++) {
                    this.randomList(8, true);
                    let sentence = finalArr.join();
                    let finalSentence = sentence.replace(/,/g, ' ');
                    finalSentence = finalSentence.charAt(0).toUpperCase() + finalSentence.slice(1);
                    createParagraph[i] = finalSentence + '.';
                    let pg = createParagraph.join();
                    finalParagraph = pg.replace(/,/g, ' ');
                    finalParagraph.toString();
                }
                return finalParagraph;
            }

        },

        outputLorem: function (cmd) {
            if (cmd.includes('lorem-sent')) {
                return this.createSentence(0);
            } else if (cmd.includes('lorem-pg')) {
                return this.createSentence(10, true);
            } else if (cmd.includes('lorem')) {
                return this.randomList(0);
            } else if (!cmd) {
                return cmd;
            }
        },

        cloneElements: function (el, repeatValue) {
            let clonedParent = el;
            let frag = document.createDocumentFragment();
            frag.append(tag);
            let handle;
            for (let i = 0; i < repeatValue; i++) {
                if (tag.lastElementChild !== null) {
                    childNode.innerHTML = this.randomList(0);
                    tag.append(childNode);
                }
                handle = frag.cloneNode(true);
                clonedParent.after(handle);
            }
            if(el.attributes[0].nodeName === 'lorem' || el.attributes[0].nodeName === 'lorem-pg' || el.attributes[0].nodeName === 'lorem-sent'){
                el.remove();
            }
        },

        cloneAttributes: function (attr, innerChild = false) {
            for (let i = 0; i < attr.length; i++) {
                if (attr[i].nodeName === 'lorem' || attr[i].nodeName === 'lorem-pg' || attr[i].nodeName === 'lorem-sent' ) {
                    continue;
                }
                if (!innerChild) {
                    tag.setAttribute(attr[i].nodeName, attr[i].nodeValue);
                } else {
                    childNode.setAttribute(attr[i].nodeName, attr[i].nodeValue);
                }
            }
        },
    };
    loremFill.beginFill();
})(document,window);
