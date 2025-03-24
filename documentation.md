# pageQuery Documentation
This is the documentation for the pageQuery library in Javascript.
# HTML
- ## `<binder />`
pageQuery works by using a bespoke element called the binder element:
```HTML
<binder>...content...</binder>
```
All binder elements must contain at least one `<page />` element.

### Attributes:
- __`id=""`__

> Specify a unique __id__ to refer to the binder. Specifying an __id__ makes it easier to manipulate from outside of the binder object.

- __`x=""`__ and __`y=""`__

> Specify __X__ and __Y__ attributes to define the binder's position at startup. A __%__ sign positions it relative to the page.

- __`width=""`__ and __`height=""`__

> Specify __width__ and __height__ attributes to define the binder's dimensions at startup. A __%__ sign resizes it relative to the page.

- __`visible=""`__

> Specify __visible__ as true or false to define whether the binder is visible at startup or not.

- __`class=""`__

> Specify __class__ the same as normal HTML elements to refer to the binder or to style it with CSS.

- __`style=""`__

> Specify __style__ the same as normal HTML elements to style it with CSS.

- ## `<page />`
Every binder contains at least one page element:
```HTML
<page>...content...</page>
```
Binders may contain as many pages as you wish, though only one page can be displayed at a time. Pages can contain any HTML code that you choose, and you can open a different page by using the functions `openPage()`, `prevPage()`, and `nextPage`.

### Attributes:
__`id=""`__

- Specify a unique __id__ for a page, to make it easier to refer to that page (for instance, when using the `openPage()` function).

# Javascript

- ## `translateBinder(x, y, binderID)`

Reposition a binder on the screen according to specified __X__ and __Y__ coordinates. You may format those coordinates as a string - a __%__ sign repositions a binder relative to the page.

If an __X__ or __Y__ coordinate isn't specified, then the relative __X__ and __Y__ coordinate will remain the same.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).

- ## `resizeBinder(width, height, binderID)`

Resize a binder according to specified __width__ and __height__ coordinates. You may format those coordinates as a string - a __%__ sign resizes a binder relative to the page.

If a __width__ or __height__ coordinate isn't specified, then the relative __width__ and __height__ coordinate will remain the same.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).

- ## `dragBinder(binderID)`

Drag a binder around the screen based on the cursor position.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).

Generally, `dragBinder()` should be used in an `onmousedown` event, like the following example which uses an `<img />` element:

```HTML
<img src="icon.png" onmousedown="dragBinder()">
```

- ## `openPage(pageID, binderID)`

Open a __pageID__ within in a binder. __pageID__ may be a number or a string, and it can refer to either the name defined in the `id=""` attribute, or the page's index number. The page's index number is determined by the order in which the page was loaded, and indexes starts at 0.

If __binderID__ isn't specified, then the function will be carried out on the parent binder (if there is one).

Example usage which opens the "cat" page in the "animals" binder:
```HTML
<a onclick="openPage("cat", "animals")"></a>
```
