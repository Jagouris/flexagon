>[!IMPORTANT]
>pageQuery is early in development so there will likely be some bugs.
>
> [__➜ See TODO list__](#todo-list)

# pageQuery
pageQuery is a lightweight Javascript library aimed to help create dynamic containers with specialised HTML tags `<binder />` and `<page />`. When you import `pagequery.js` into your webpage, those elements will be loaded automatically as dynamic page containers, and you can manipulate them easily with pageQuery functions.

### [➜ Webpage created with pageQuery](https://jagorak.github.io/pagequery)
### [➜ Video example of pageQuery](https://www.youtube.com/watch?v=WKCQJrdRDPM)
### [➜ Documentation](https://github.com/Jagorak/pageQuery/blob/main/documentation.md)

## Getting Started
Import `pagequery.js` with the following tag:
```HTML
<script type="text/javascript" src="pagequery.js"></script>
```
Put the following HTML within your `<body />` tag:
```HTML
<binder x="50%" y="50%">
   <page>
      <p>This is intro page.</p>
      <a onclick="openPage('example-page')">Click here to open "example-page!"</a>
   </page>
   <page id="example-page">
      <p>This is example page.</p>
      <a onclick="closeBinder()">Click here to close the binder!</a>
   </page>
</binder>
```
And finally, give a simple design to your binder with CSS:
```HTML
<style>
   binder {
      background: #fff;
      padding: 10px;
      border: 1px solid #000;
      font-family: sans-serif;
   }
</style>
```
And then you should have a fully functioning binder, a dynamic page container which you can manipulate with Javascript.

Finally, add some simple functionality to the binder. Anywhere within your `<binder />` tag, put the following code:
```HTML
<button onmousedown="dragBinder()">Drag Binder</button>
```
You can now click and hold this button to move the binder around the screen.

### TODO List:
A list of development tasks for pageQuery

- [ ] __1.__ load `<span />` tags in place of binder and page tags to improve compatiblity (right now attributes are being applied directly to those
- [ ] __2.__ make `defineBinder()` work
