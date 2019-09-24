# loremFill
Lorem fill is a tool for fast prototyping of web pages by programmtically filling elements with filler content.

Syntax is super easy and follows conventions from other frameworks.

Add the attribute lorem-fill="x" with x being any number. LoremFill will repeat the element x times only on page load and won't add more to your raw HTML file.

```HTML
    <p lorem-fill="5" class="test"></p>
```




```HTML
    <p lorem-fill="5" class="test"></p>
    <p lorem-fill="2" class="test">{{lorem-pg}}</p>
```

Above you'll notice a '{{lorem-pg}}', this markup programmatically adds a paragraph's worth of text. Review the following table for more information:


| Markup        | output        |
| ------------- |:-------------:| 
| {{lorem}}     | Lorem         |
| {{lorem-sent}}| Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.      |
| {{lorem-pg}}  | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.      |
| {{lorem-list}}| "Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit, sed, do, eiusmod, tempor, incididunt, ut, labore, et, dolore, magna, aliqua |


By default any element without text will yield nothing. Conversely, if it has text but lacks the mark up such as the following: 

```HTML
    <p lorem-fill="2" class="test">This is some awesome text</p>
```

This will ignore the lorem-fill attribute and only output one paragraph with the text "This is some awesome text".

Any cloned element created by a lorem-fill will carry the attributes of their parent with the exception of the lorem-fill attribute. Hence the following will be the output:

```HTML
    <p lorem-fill="2" class="test">{{lorem-sent}}</p>
    <p class="test">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <p class="test">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>

```

Feel free to test it out and let me know of any issues! bobby@robertorivera.dev
Also, if you're feeling generous and want to feed my coffee habit consider clicking the link below: 
https://www.buymeacoffee.com/bobberwocky

Either way this is open source and won't cost anything. The above is just an option. 
