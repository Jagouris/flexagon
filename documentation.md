# pageQuery Documentation
This is the documentation for the pageQuery library in Javascript. Every current function and HTML tag provided by pageQuery is listed here.
# HTML

<details>
<summary><h2>&lt;binder /&gt</h2></summary>
pageQuery works by using a bespoke element called the binder element:
  
```HTML
<binder>...content...</binder>
```
All binder elements must contain at least one `<page />` element.

### Attributes:
- __`id=""`__

Specify a unique __id__ to refer to the binder. Specifying an __id__ makes it easier to manipulate from outside of the binder object (otherwise you can use the binder's index).

- __`x=""`__ and __`y=""`__

Specify __X__ and __Y__ attributes to define the binder's position at startup. A __%__ sign positions it relative to the page.

- __`width=""`__ and __`height=""`__

Specify __width__ and __height__ attributes to define the binder's dimensions at startup. A __%__ sign resizes it relative to the page.

- __`visible=""`__

Specify __visible__ as true or false to define whether the binder is visible at startup or not.

- __`class=""`__

Specify __class__ the same as normal HTML elements to refer to the binder or to style it with CSS.

- __`style=""`__

Specify __style__ the same as normal HTML elements to style it with CSS.

</details>

<details>
<summary><h2>&lt;page /&gt</h2></summary>
  
Every binder contains at least one page element:
```HTML
<page>...content...</page>
```
Binders may contain as many pages as you wish, though only one page can be displayed at a time. Pages can contain any HTML code that you choose, and you can open a different page by using the functions `openPage()`, `prevPage()`, and `nextPage`.

### Attributes:
- __`id=""`__

Specify a unique __id__ for a page, to make it easier to refer to that page (for instance, when using the `openPage()` function).

</details>

# Javascript

> [!TIP]
> ```javascript
>//<binder id="example"></binder>
>//pageQuery is flexible. If that binder is the first in the document, then its index is 0, and it can be referred to in the following ways:
> getBinder(0);
> getBinder('0');
> getBinder('example');
> ```

<details>
<summary><h2>translateBinder(x, y, binderID);</h2></summary>

> __x:__ string or number (optional)
> 
> __y:__ string or number (optional)
> 
> __binderID:__ string or number (optional)

Reposition a binder on the screen according to specified __X__ and __Y__ coordinates. You may format those coordinates as a string - a __%__ sign repositions a binder relative to the page.

If an __X__ or __Y__ coordinate isn't specified, then the relative __X__ and __Y__ coordinate will remain the same.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).
</details>

<details>
<summary><h2>resizeBinder(width, height, binderID);</h2></summary>

> __width:__ string or number (optional)
> 
> __height:__ string or number (optional)
> 
> __binderID:__ string or number (optional)

Resize a binder according to specified __width__ and __height__ coordinates. You may format those coordinates as a string - a __%__ sign resizes a binder relative to the page.

If a __width__ or __height__ coordinate isn't specified, then the relative __width__ and __height__ coordinate will remain the same.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).
</details>

<details>
<summary><h2>dragBinder(binderID);</h2></summary>

> __binderID:__ string or number (optional)

Drag a binder around the screen based on the cursor position.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).

<hr />

Generally, `dragBinder()` should be used in an `onmousedown` event, like the following example which uses an `<img />` element:

```HTML
<img src="icon.png" onmousedown="dragBinder()">
```

</details>

<details>
<summary><h2>openPage(pageID, binderID);</h2></summary>

> __pageID:__ string or number
>
> __binderID:__ string or number (optional)

Open a specified  __pageID__ within a binder. __pageID__ may be a number or a string, and it can refer to either the name defined in the `id=""` attribute, or the page's index number. The page's index number is determined by the order in which the page was loaded, and indexes starts at 0.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).

<hr />

Example usage which opens the "cat" page in the "animals" binder:
```HTML
<a onclick="openPage('cat', 'animals')"></a>
```

</details>

<details>
<summary><h2>prevPage(binderID);</h2></summary>

> __binderID:__ string or number (optional)

Opens the page at the previous index within a binder. The function will stop working at index 0, since there are no earlier pages.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).
</details>

<details>
<summary><h2>nextPage(binderID);</h2></summary>

> __binderID:__ string or number (optional)

Opens the page at the next index within a binder. The function will stop working at the final index, since there are no later pages.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).
</details>

<details>
<summary><h2>getCurrentPage(binderID);</h2></summary>

> __binderID:__ string or number (optional)

Returns the index of the page which is currently displayed in the binder.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).

</details>

<details>
<summary><h2>openBinder(binderID);</h2></summary>

> __binderID:__ string or number 

Opens the specified binder.
</details>

<details>
<summary><h2>closeBinder(binderID);</h2></summary>

> __binderID:__ string or number (optional)

Closes the specified binder.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).
</details>

<details>
<summary><h2>bringToFront(binderID);</h2></summary>

> __binderID:__ string or number (optional)

Display the binder above all other binders.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).
</details>

<details>
<summary><h2>getBinder(binderID);</h2></summary>

> __binderID:__ string or number 

Returns the specified binder's object instance in Javascript.

<hr />

If you want to manipulate the binder directly, then you can store the binder object as a variable:
```javascript
let myBinder = getBinder("random-binder");
```

</details>

<details>
<summary><h2>findParentBinder(srcElement);</h2></summary>

> __srcElement:__ Object 

Returns the parent binder's __binderID__ of any HTML element which is enclosed in a binder.
</details>

<details>
<summary><h2>defineBinder(srcElement, binderID);</h2></summary>

Lets you define a new binder based on an HTML element.

<hr />

This doesn't work yet.

</details>
