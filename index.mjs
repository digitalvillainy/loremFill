const loremTargets = document.querySelectorAll('[lorem-fill]');
let loremText = 'Lorem ipsum dolor sit amet.';
let tag, tagAttributes, childNode, childNodeAttributes;

function init() {
    loremTargets.forEach((element) => {
        if (element.innerHTML.trim() === '') {
            tag = document.createElement(element.nodeName.toLowerCase());
            tag.innerHTML = loremText;
            tagAttributes = element.attributes;
            cloneAttributes(tagAttributes);
            if (element.attributes['lorem-fill'] && element.innerHTML.trim() === '') {
                element.innerText = loremText;
                cloneElements(element, Number(element.attributes['lorem-fill'].value) - 1);
            } else {
                cloneElements(element, Number(element.attributes['lorem-fill'].value));
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
                        cloneAttributes(childNodeAttributes, true);
                        childNode.innerHTML = loremText;
                        tag.append(childNode);
                    }

                });
            }
            cloneElements(element, Number(element.attributes['lorem-fill'].value) - 1);
        }
    });
}
init();

function cloneElements(el, repeatValue) {
    let clonedParent = el;
    let frag = document.createDocumentFragment();
    frag.append(tag);
    let handle;
    let loremValue = repeatValue;
    for (let i = 0; i < loremValue; i++) {
        handle = frag.cloneNode(true);
        clonedParent.after(handle);
    }
}

function cloneAttributes(attr, innerChild = false) {
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

/*module.exports.init = init;
module.exports.cloneElements = cloneElements;
module.exports.cloneAttributes = cloneAttributes;*/
/*module.exports.loremTargets = loremTargets;
module.exports.loremText = loremText;
module.exports.tag = tag;
module.exports.tagAttributes = tagAttributes;
module.exports.childNode = childNode;
module.exports.childNodeAttributes = childNodeAttributes;*/

