# pageQuery
pageQuery is a lightweight Javascript library aimed to help create dynamic containers with custom HTML tags `<binder />` and `<page />`. When you import `pagequery.js` into your webpage, those elements will be loaded automatically as dynamic page containers, and you can manipulate them easily with pageQuery functions.

### [➜ Webpage created with pageQuery](https://jagorak.github.io/pagequery)
### [➜ Video example of pageQuery](https://www.youtube.com/watch?v=WKCQJrdRDPM)
### [➜ Documentation](https://github.com/Jagorak/pageQuery/blob/main/documentation.md)

## Getting Started

### 1. Download pageQuery
Download pageQuery by using either `pagequery.js` file above (that is the most up-to-date version).

### 2. Import pageQuery into your file
Import `pagequery.js` with the following tag:
```HTML
<script type="text/javascript" src="pagequery.js"></script>
```

### 3. Create a basic page with pageQuery
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
- Then, give a simple design to your binder with CSS:
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

### 4. Add some functionality to pageQuery
- Finally, you can add some simple functionality to the binder. Anywhere within your `<binder />` tag, put the following code:
```HTML
<button onmousedown="dragBinder()">Drag Binder</button>
```
You can now click and hold this button to move the binder around the screen.

## TODO List:
A list of development tasks for pageQuery

- [x] __1.__ Load `<span />` tags in place of binder and page tags to improve compatiblity.
- [ ] __2.__ Experiment with [HTMLCustomElement](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) to improve the efficiency of pageQuery
- [ ] __3.__ Create functions `newBinder()`, `duplicateBinder()`, `deleteBinder()`
- [x] __4.__ Try to transfer event listeners (`onclick=""` etc.)from binder tags to their respective span tags
