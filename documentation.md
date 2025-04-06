#  Documentation

# HTML

<details>
<summary><h3>&lt;binder /&gt</h3></summary>
  
Flexagon works with an element called the `<binder />` element:
  
```HTML
<binder id="example-binder">...content...</binder>
```
All binder elements contain at least one `<page />` element. Binders can contain any HTML code.

Specify a unique __id__ for a binder to make it easier to refer to that binder (for instance, when using the `openBinder()` function).

<hr />

You can include all normal HTML attributes in a binder element (such as __id__, __style__, __onclick__ etc.):
```HTML
<binder style="background: #00ff00" onclick="bringToFront()"></binder>
```

</details>
<details>
<summary><h3>&lt;page /&gt</h3></summary>
  
Every binder contains at least one page element:
```HTML
<page id="example-page">...content...</page>
```
Only one page can be displayed at a time. Pages can contain any HTML code.

Specify a unique __id__ for a page to make it easier to refer to that page (for instance, when using the `openPage()` function).

</details>

# Javascript

If you have a binder called "example":
```html
<binder id="example"></binder>
```
Then you can refer to it in the following three ways:
```javascript
getBinder('example'); //You can refer to it with its ID, "example"
getBinder(0); //You can refer to it with 0, because it was the first one loaded the document
getBinder('0'); //You can refer to it with 0 in quotation marks
```

<hr />

If a function is anywhere inside a binder, like the following:
```html
<binder>
   <page>
      <button onclick="openPage('example')">Open Example Page</button>
   </page>
</binder>
```
Then Flexagon will peform the function on the current binder, unless you specify a different binder (i.e. `openPage('example', 'different-binder')`).

<hr />

If you write your own script for Flexagon, you need to include `flexagon()` inside a `window.onload` event, otherwise it will break:
```javascript
window.onload = function(){
   flexagon();

   //your code....
}
```

<hr />

You can include more than one function inside an HTML element, like this:
```html
<button onclick="bringToFront(); openPage('example')"></button>
```

<details>
<summary><h3>translateBinder(x, y, binderID);</h3></summary>

> __x:__ string or number (optional)
> 
> __y:__ string or number (optional)
> 
> __binderID:__ string, number or Object (optional)

Reposition a binder on the screen according to specified __X__ and __Y__ coordinates. You may format those coordinates as a string. A __%__ sign repositions a binder relative to the page.

If __X__ or __Y__ coordinate is specified as __null__, then the relative __width__ and __height__ coordinate will remain the same, for example:

```javascript
translateBinder(null, '50%'); //This will change the y position to 50%, but the x position will remain the same
```

</details>

<details>
<summary><h3>scaleBinder(width, height, binderID);</h3></summary>

> __width:__ string or number (optional)
> 
> __height:__ string or number (optional)
> 
> __binderID:__ string, number or Object (optional)

Scale a binder according to specified __width__ and __height__ coordinates. You may format those coordinates as a string. A __%__ sign scales a binder relative to the page.

If __width__ or __height__ coordinate is specified as __null__, then the relative __width__ and __height__ coordinate will remain the same, for example:

```javascript
scaleBinder(null, '50%'); //This will change the height to 50%, but the width will remain the same
```

</details>

<details>
<summary><h3>userTranslate(binderID);</h3></summary>

> __binderID:__ string, number or Object (optional)

Drag a binder around the screen based on the cursor position.

<hr />

`userTranslate()` should be used in an `onmousedown` event, like the following example:

```HTML
<img src="move.png" onmousedown="userTranslate()">
```

</details>

<details>
<summary><h3>userScale(direction, binderID);</h3></summary>

> __direction:__ string
>
> __binderID:__ string, number or Object (optional)

Scale a binder in the specified direction based on the cursor position ("left", "right", "up", or "down").

<hr />

`userScale()` should be used in an `onmousedown` event, like the following example:

```HTML
<button onmousedown="userScale('right');">Scale Right</button>
```
It's worth knowing that you can use `min-width` and `min-height` CSS style if you want your Binder to have a resize limit.

</details>

<details>
<summary><h3>openPage(pageID, binderID);</h3></summary>

> __pageID:__ string or number
>
> __binderID:__ string, number or Object (optional)

Open a specified  __pageID__ within a binder. Pages can be referred to in three ways:

```javascript
openPage('example'); //You can refer to it with its ID, "example"
openPage(0); //You can refer to it with 0, because it was the first one loaded the document
openPage('0'); //You can refer to it with 0 in quotation marks
```

<hr />

Example which opens the "cat" page in the "animals" binder:
```HTML
<a onclick="openPage('cat', 'animals')"></a>
```

</details>

<details>
<summary><h3>prevPage(binderID);</h3></summary>

> __binderID:__ string, number or Object (optional)

Opens the previous page index (the page that was loaded before the current page);

</details>

<details>
<summary><h3>nextPage(binderID);</h3></summary>

> __binderID:__ string, number or Object (optional)

Opens the next page index (the page that was loaded after the current page);

</details>

<details>
<summary><h3>getCurrentPage(binderID);</h3></summary>

> __binderID:__ string, number or Object (optional)

Returns the index of the page which is currently displayed in the binder.

</details>

<details>
<summary><h3>openBinder(binderID);</h3></summary>

> __binderID:__ string, number or Object

Opens the specified binder.

</details>

<details>
<summary><h3>closeBinder(binderID);</h3></summary>

> __binderID:__ string, number or Object (optional)

Closes the specified binder.

</details>

<details>
<summary><h3>bringToFront(binderID);</h3></summary>

> __binderID:__ string, number or Object (optional)

Display the binder above all other binders.

</details>

<details>
<summary><h3>getBinder(binderID);</h3></summary>

> __binderID:__ string, number or Object

Returns the specified binder's object instance in Javascript.

<hr />

If you want to manipulate the binder directly, then you can store the binder object as a variable:
```javascript
let myBinder = getBinder("random-binder");
```

</details>

<details>
<summary><h3>cloneBinder(binderName, binderID);</h3></summary>

> __binderName:__ string (optional)
> 
> __binderID:__ string, number or Object (optional)

Clones the specified binder with the id __binderName__. If the ID is already taken by a different binder, then it will be given a unique ID.

`cloneBinder()` returns the cloned binder, for example:

```javascript
let myBinder = getBinder("example");
let newBinder = cloneBinder(myBinder);

console.log(getBinderIndex(newBinder));
```

</details>

<details>
<summary><h3>deleteBinder(binderID);</h3></summary>

> __binderID:__ string, number or Object (optional)

Deletes the specified binder.

</details>


<details>
<summary><h3>getBinderIndex(binderID);</h3></summary>

> __binderID:__ string, number or Object (optional)

Returns the index of the specified binder.

</details>

<details>
<summary><h3>findParentBinder(srcElement);</h3></summary>

> __srcElement:__ Object (optional)

Returns the binder's index of any HTML element inside a binder.
</details>
