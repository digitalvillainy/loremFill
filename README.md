# loremFill
Lorem fill is a tool for fast prototyping of web pages by programmtically filling elements with filler content.

In order to install it into your project use the following: 

```JavaScript
    npm i @digitalvillainy/lorem-fill
```

or use the cdn like so:

```HTML
    <script src="https://cdn.jsdelivr.net/npm/@digitalvillainy/lorem-fill@0.2.6/loremFill.mjs"></script>
```

Be sure to include the path into your HTML.

```HTML
    <script src="./node_modules/@digitalvillainy/lorem-fill/loremFill.mjs"></script>
```

Syntax is super easy and follows conventions from other frameworks.

Example: https://codepen.io/digitalvillainy/pen/PoYvpmb

Add the attribute lorem-pg="x" with x being any number. LoremFill will repeat the element x times only on page load and won't add more to your raw HTML file.

```HTML
    <p lorem-pg="5" class="test"></p>
```

```HTML
    <p lorem-pg="5" class="test"></p>
    <h1 lorem-sent="2" class="test"></h1>
```

 To determine the output of the attribute simply review the following table:


| Markup        | output        |
| ------------- |:-------------:| 
| lorem="x"     | Will output a random filler word |
| lorem-sent="x"| Creates a 8 word sentence |
| lorem-pg="x"  | Creates a 10 sentence paragraph |


By default any element if it has text it will yield the text entered. 

```HTML
    <p lorem-pg="2" class="test">This is some awesome text</p>
```

This will ignore the lorem-pg attribute and only output one paragraph with the text "This is some awesome text".

Any cloned element created by a lorem attribute will carry the attributes of their parent with the exception of the lorem lorem attribute. Hence the following will be the output:

```HTML
    <p lorem-sent="2" class="test"></p>
    <p class="test">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <p class="test">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>

```

In addition, nested objects without text will essentially create a template for cloning. Such as the following: 

```HTML
    <ul>
        <li lorem="6">
            <a href="#"></a>
        </li>
    </ul>
```

This would yield 6 list tags each with a nested anchor. The anchor tag will have the outputed text. 

```HTML
    <ul>
        <li lorem="6">
            <a href="#">lorem</a>
        </li>
        <li>
            <a href="#">dolor</a>
        </li>
        <li>
            <a href="#">ipsum</a>
        </li>
        <li>
            <a href="#">pariatur</a>
        </li>
         <li>
            <a href="#">cupidatat</a>
        </li>
        <li>
            <a href="#">irure</a>
        </li>
    </ul>
``` 

Feel free to test it out and let me know of any issues! bobby@robertorivera.dev
Also, if you're feeling generous and want to feed my coffee habit consider clicking the link below: 
https://www.buymeacoffee.com/bobberwocky

Either way this is open source and won't cost anything. The above is just an option. 
