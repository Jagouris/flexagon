# pageQuery Documentation
This is the documentation for the pageQuery library in Javascript.
# HTML
## Binder Element
pageQuery works by using a bespoke element called the binder element:
```HTML
<binder>...content...</binder>
```
All binder elements must contain at least one `<page />
The binder tag does not have any meaning in normal HTML, but when we import the pageQuery library, each binder tag is taken as information for the library to create dynamic content with.
### Attributes:
__`id="[string]"`__

- Specify a unique __id__ to refer to the binder. Specifying an __id__ makes it easier to manipulate from outside of the binder object.

__`x="[string or number]"`__ and __`y="[string or number]"`__

- Specify __X__ and __Y__ attributes to define the binder's position at startup. A __%__ sign positions it relative to the page.

__`width="[string or number]"`__ and __`height="[string or number]"`__

- Specify __width__ and __height__ attributes to define the binder's dimensions at startup. A __%__ sign resizes it relative to the page.

__`visible="[boolean]"`__

- Specify __visible__ as true or false to define whether the binder is visible at startup or not.

__`class="[string]"`__

- Specify __class__ the same as normal HTML elements to refer to the binder or to style it with CSS.

__`style="[string]"`__

- Specify __style__ the same as normal HTML elements to style it with CSS.
