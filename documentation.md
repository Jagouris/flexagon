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

- __`hidden`__

Specify __hidden__ to hide the binder at startup.

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

If you have a binder:
```html
<binder id="example"></binder>
```
Then you can refer to it in the following three ways:
```javascript
getBinder(0); //The index of the binder is 0, because it is the first one in the document
getBinder('0'); //You can also use a string to call an index number
getBinder('example'); //And you can refer to it with the given ID
```
Furthermore, if a function is anywhere inside a binder, like the following:
```html
<binder>
   <page>
      <button onclick="openPage('example')">Open Example Page</button>
   </page>
</binder>
```
Then you don't need to refer to that binder, since pageQuery will automatically look for the closest parent binder.

It is also worth knowing that you can have more than one function inside an HTML element, like this:
```html
<button onclick="bringToFront(); openPage('example')"></button>
```

Finally, if you create your own script alongside pageQuery, you need to include `pageQuery()` into a `window.onload` event, otherwise the binder elements won't be initialised properly:
```javascript
window.onload = function(){
   pageQuery();
   //your code....
}
```

<details>
<summary><h2>translateBinder(x, y, binderID);</h2></summary>

> __x:__ string or number (optional)
> 
> __y:__ string or number (optional)
> 
> __binderID:__ string, number or Object (optional)

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
> __binderID:__ string, number or Object (optional)

Resize a binder according to specified __width__ and __height__ coordinates. You may format those coordinates as a string - a __%__ sign resizes a binder relative to the page.

If a __width__ or __height__ coordinate isn't specified, then the relative __width__ and __height__ coordinate will remain the same.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).
</details>

<details>
<summary><h2>dragBinder(binderID);</h2></summary>

> __binderID:__ string, number or Object (optional)

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
> __binderID:__ string, number or Object (optional)

Open a specified  __pageID__ within a binder. __pageID__ works similar to __binderID__:

```javascript
openPage(0); //The index of the page is 0, because it is the first one in the binder
openPage('0'); //You can also use a string to call an index number
openPage('example'); //And you can refer to it with the given ID
```

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).

<hr />

Example usage which opens the "cat" page in the "animals" binder:
```HTML
<a onclick="openPage('cat', 'animals')"></a>
```

</details>

<details>
<summary><h2>prevPage(binderID);</h2></summary>

> __binderID:__ string, number or Object (optional)

Opens the page at the previous index within a binder. The function will stop working at index 0, since there are no earlier pages.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).
</details>

<details>
<summary><h2>nextPage(binderID);</h2></summary>

> __binderID:__ string, number or Object (optional)

Opens the page at the next index within a binder. The function will stop working at the final index, since there are no later pages.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).
</details>

<details>
<summary><h2>getCurrentPage(binderID);</h2></summary>

> __binderID:__ string, number or Object (optional)

Returns the index of the page which is currently displayed in the binder.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).

</details>

<details>
<summary><h2>openBinder(binderID);</h2></summary>

> __binderID:__ string, number or Object

Opens the specified binder.
</details>

<details>
<summary><h2>closeBinder(binderID);</h2></summary>

> __binderID:__ string, number or Object (optional)

Closes the specified binder.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).
</details>

<details>
<summary><h2>bringToFront(binderID);</h2></summary>

> __binderID:__ string, number or Object (optional)

Display the binder above all other binders.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).
</details>

<details>
<summary><h2>getBinder(binderID);</h2></summary>

> __binderID:__ string, number or Object

Returns the specified binder's object instance in Javascript.

<hr />

If you want to manipulate the binder directly, then you can store the binder object as a variable:
```javascript
let myBinder = getBinder("random-binder");
```

</details>

<details>
<summary><h2>cloneBinder(binderName, binderID);</h2></summary>

> __binderName:__ string (optional)
> 
> __binderID:__ string, number or Object (optional)

Clones the specified binder, all of its pages, and returns the object instance of the cloned binder. If the ID is already claimed by a different binder, then it will be given a unique ID.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).
</details>


<details>
<summary><h2>getBinderIndex(binderID);</h2></summary>

> __binderID:__ string, number or Object

Returns the specified binder's index.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).

</details>

<details>
<summary><h2>findParentBinder(srcElement);</h2></summary>

> __srcElement:__ Object 

Returns the parent binder's index of any HTML element which is enclosed in a binder.
</details>

<details>
<summary><h2>defineBinder(srcElement, binderID);</h2></summary>

Lets you define a new binder based on an HTML element.

<hr />

This doesn't work yet.

</details>
