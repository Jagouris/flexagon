
# <img src="logo2.png" width="60" height="60" /> Flexagon
## What is Flexagon?
Flexagon is a Javascript library, it is an easy and efficient way create dynamic webpages with custom HTML elements. The option is also available to expand Flexagon functionality if you choose to.

When you import `flexagon.js` into your webpage, it will run automatically, and then you can manipulate it easily with Flexagon's functions.

### [➜ Webpage created with Flexagon](https://jagorak.github.io/Flexagon)
### [➜ Video example of Flexagon](https://www.youtube.com/watch?v=WKCQJrdRDPM)
### [➜ Documentation](https://github.com/Jagorak/flexagon/blob/main/documentation.md)

## Getting Started

If you want to try Flexagon, it's easy to get started. You can follow the steps to make a functioning webpage with Flexagon (5 minutes).

### 1. Download Flexagon
Put the `flexagon.js` into your folder alongside your HTML file. (The version above is the most up-to-date).

### 2. Put Flexagon into your file
Use the following tag anywhere in the `<head />` section of your document:
```HTML
<script type="text/javascript" src="flexagon.js"></script>
```

### 3. Create a binder element
A binder is defined like any other HTML element, except it must have at least one page element inside it. Put the following HTML within your `<body />` tag:
```HTML
<binder>
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

### 4. Style it
You can give a simple design to your binder in the normal way CSS:
```HTML
<style>
   binder {
      background: #fff;
      padding: 10px;
      border: 1px solid #000;
      font-family: sans-serif;
      left: 50%;
   }
</style>
```
Afterwards, you should have a fully functioning example of Flexagon, a dynamic page container which you can manipulate with Javascript.

### 5. Add more functionality
Put the following button anywhere inside your `<binder />` tag:
```HTML
<button onmousedown="userTranslate()">Drag Binder</button>
```
This button will let you click and drag the binder around the screen.

### 6. View the documentation
The above is the most basic demonstration of Flexagon, you can view the [documentation](https://github.com/Jagorak/flexagon/blob/main/documentation.md) if you want to learn more.
