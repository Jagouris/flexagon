
# <img src="logo2.png" width="60" height="60" /> Flexagon
Flexagon is a lightweight Javascript library aimed to help create dynamic containers with custom HTML tags `<binder />` and `<page />`. When you import `flexagon.js` into your webpage, those elements will be loaded automatically as dynamic page containers, and you can manipulate them easily with Flexagon's functions. The content is converted to into natural HTML when a webpage is loaded.

### [➜ Webpage created with Flexagon](https://jagorak.github.io/Flexagon)
### [➜ Video example of Flexagon](https://www.youtube.com/watch?v=WKCQJrdRDPM)
### [➜ Documentation](https://github.com/Jagorak/flexagon/blob/main/documentation.md)

## Getting Started

### 1. Download Flexagon
Download Flexagon by using either `flexagon.js` file above (that is the most up-to-date version).

### 2. Import Flexagon into your file
Import `flexagon.js` with the following tag:
```HTML
<script type="text/javascript" src="flexagon.js"></script>
```

### 3. Create a basic page with Flexagon
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

### 4. Add some functionality to your page
- Finally, you can add some simple functionality to the binder. Anywhere within your `<binder />` tag, put the following code:
```HTML
<button onmousedown="dragBinder()">Drag Binder</button>
```
You can now click and hold this button to move the binder around the screen.

## TODO List:
A list of development tasks for Flexagon

- [x] __1.__ Load `<span />` tags in place of binder and page tags to improve compatiblity.
- [ ] __2.__ Experiment with [HTMLCustomElement](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) to improve the efficiency of flexagon
- [x] __3.__ Create functions `cloneBinder()`, `deleteBinder()`
- [x] __4.__ Transfer event listeners (`onclick=""` etc.) from binder tags to their respective span tags
