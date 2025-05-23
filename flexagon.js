//Flexagon v1.4.0 copyright (c) Jagouris (https://github.com/Jagouris/)

(function(){
   let binderList = [];
   let binderNames = [];
   let activeBinder;
   
   let zIndex = [];
 
   let dragging = false;
   let resizing = false;
   let scaleDirection = {
      left: false,
      right: false,
      up: false,
      down: false
   };

   window.onload = function(){
      init();
   };

   window.flexagon = function(){
      init();
   };
   
   function init(){
      let binderNodes = document.querySelectorAll("BINDER");

      for(let binder of binderNodes) loadBinder(binder);

      document.addEventListener('mouseup', function(){
         if(activeBinder) activeBinder.makeInactive();
         
         dragging = false;
         resizing = false;
          
         for(let i in scaleDirection)
            scaleDirection[i] = false;
      }, false);
      
      document.addEventListener('mousemove', function(e){
         if(activeBinder){
            if(dragging){
               activeBinder.x += e.movementX;
               activeBinder.translateX(activeBinder.x);
               
               activeBinder.y += e.movementY;
               activeBinder.translateY(activeBinder.y);
            }
            
            if(scaleDirection.left){
               activeBinder.width -= e.movementX;
               activeBinder.x += e.movementX;
            }
         
            if(scaleDirection.right) activeBinder.width += e.movementX;
            
            if(scaleDirection.up){
               activeBinder.height -= e.movementY;
               activeBinder.y += e.movementY;
            }
         
            if(scaleDirection.down) activeBinder.height += e.movementY;
         
            if(activeBinder.width - activeBinder.min_width > 0){
               activeBinder.translateX(activeBinder.x);
               activeBinder.scaleX(activeBinder.width);
            }
         
            if(activeBinder.height - activeBinder.min_height > 0){
               activeBinder.translateY(activeBinder.y);
               activeBinder.scaleY(activeBinder.height);
            }
         }
      }, false);
   }

   window.translateBinder = function(x = null, y = null, binderID = null){
      if(!binderID && binderID != 0) binderID = findParentBinder(event.srcElement);
      else binderID = getBinderIndex(binderID);

      binderList[binderID].readNewCSS();
      
      binderList[binderID].translateX(x);
      binderList[binderID].translateY(y);
   };

   window.bringToFront = function(binderID = null){
      if(!binderID && binderID != 0) binderID = findParentBinder(event.srcElement);
      else binderID = getBinderIndex(binderID);

      let i = zIndex.indexOf(binderID);

      zIndex.splice(i, 1);

      for(i; i < zIndex.length; i++) binderList[zIndex[i]].node.style.zIndex--;
      
      zIndex[i] = binderID;
      
      binderList[binderID].node.style.zIndex = i;
   };

   window.openBinder = function(binderID){
      if(!binderID && binderID != 0) binderID = findParentBinder(event.srcElement);
      else binderID = getBinderIndex(binderID);

      bringToFront(binderID);
      
      binderList[binderID].show();
   };

   window.closeBinder = function(binderID = null){
      if(!binderID && binderID != 0) binderID = findParentBinder(event.srcElement);
      else binderID = getBinderIndex(binderID);

      binderList[binderID].hide();
   };

   window.getBinder = function(binderID = null){
      if(!binderID && binderID != 0) binderID = findParentBinder(event.srcElement);
      else binderID = getBinderIndex(binderID);

      if(binderList[binderID]) return binderList[binderID];
   };

   window.openPage = function(pageID, binderID = null){
      if(!binderID && binderID != 0) binderID = findParentBinder(event.srcElement);
      else binderID = getBinderIndex(binderID);

      binderList[binderID].openPage(pageID);
   };

   window.prevPage = function(binderID = null){
      if(!binderID && binderID != 0) binderID = findParentBinder(event.srcElement);
      else binderID = getBinderIndex(binderID);

      let currentPage = binderList[binderID].currentPage;
      
      if(currentPage > 0) binderList[binderID].openPage(currentPage - 1);
   };

   window.nextPage = function(binderID = null){
      if(!binderID && binderID != 0) binderID = findParentBinder(event.srcElement);
      else binderID = getBinderIndex(binderID);

      let currentPage = binderList[binderID].currentPage;
      
      if(currentPage < binderList[binderID].pageList.length - 1) binderList[binderID].openPage(currentPage + 1);
   };

   window.getCurrentPage = function(binderID = null){
      if(!binderID && binderID != 0) binderID = findParentBinder(event.srcElement);
      else binderID = getBinderIndex(binderID);

      return binderList[binderID].currentPage;
   };

   window.userTranslate = function(binderID = null){
      if(!binderID && binderID != 0) binderID = findParentBinder(event.srcElement);
      else binderID = getBinderIndex(binderID);

      binderList[binderID].makeActive();
      dragging = true;
      bringToFront(binderID);
   };
   
   window.userScale = function(direction, binderID = null){
      if(!binderID && binderID != 0) binderID = findParentBinder(event.srcElement);
      else binderID = getBinderIndex(binderID);

      binderList[binderID].makeActive();
      
      for(let i of direction.split(/, /))
         scaleDirection[i] = true;
   };
   
   window.scaleBinder = function(width = null, height = null, binderID = null){
      if(!binderID && binderID != 0) binderID = findParentBinder(event.srcElement);
      else binderID = getBinderIndex(binderID);

      binderList[binderID].readNewCSS();
      
      binderList[binderID].scaleX(width);
      binderList[binderID].scaleY(height);
   };

   window.getBinderIndex = function(binderID = null){
      if(typeof binderID === "number") return binderID;
      else if(typeof binderID === "string") return binderNames[binderID];
      else if(typeof binderID === "object") return binderList.indexOf(binderID);
   };

   window.findParentBinder = function(node){
      while(node){
         if(node.tagName == "DIV"){
            let id = node.id.split(/ /);

            if(id[0] == "binder") return getBinderIndex(id[1]);
         }

         node = node.parentNode;
      }
   };
   
   window.cloneBinder = function(binderName = null, binderID = null){
      if(!binderID && binderID != 0) binderID = findParentBinder(event.srcElement);
      else binderID = getBinderIndex(binderID);

      let node = binderList[binderID].node.cloneNode(true);
      
      if(!binderNames[binderName]) node.id = binderName;
      else node.id = "";
      
      document.querySelector("body").appendChild(node);
      
      return loadBinder(node);
   };
   
   window.deleteBinder = function(binderID = null){
      if(!binderID && binderID != 0) binderID = findParentBinder(event.srcElement);
      else binderID = getBinderIndex(binderID);

      binderList[binderID].node.remove();
      binderList[binderID] = undefined;
      
      let i = zIndex.indexOf(binderID);

      zIndex.splice(i, 1);

      for(i; i < zIndex.length; i++) binderList[zIndex[i]].node.style.zIndex--;
   };
   
   function Binder(node){
      this.node = node;
      
      this.pageList = [];
      this.pageNames = [];
      this.currentPage = 0;

      this.init = function(){
         let id = this.node.id;
         if(!id) id = (binderList.length).toString();
         
         this.node.id = "binder " + id;

         this.node.style.display = "inline";
         this.node.style.boxSizing = "border-box";
         this.node.style.position = "fixed";
         
         if(this.node.tagName == "BINDER"){
            this.node = convertToDiv(this.node);
            
            let pageNodes = this.node.querySelectorAll("PAGE");

            for(let node of pageNodes) this.loadPage(convertToDiv(node));
         }else if(this.node.tagName == "DIV"){
            let divNodes = this.node.querySelectorAll("DIV");

            for(let node of divNodes)
               if(/page /.test(node.id)) 
                  this.loadPage(node);
         }

         this.openPage(0);

         this.readNewCSS();

         this.translateX(this.node.style["left"]);
         this.translateY(this.node.style["top"]);

         if(this.node.attributes["hidden"] !== undefined)
            if(this.node.attributes["hidden"] != "false")
               this.node.style.display = "none";
      };
      
      this.loadPage = function(node){
         let id = node.id;
         id = id.replace(/page /, "");
         
         let pageIndex = this.pageList.push(node) - 1;
         
         if(id) this.pageNames[id] = pageIndex;
         else id = (this.pageList.length).toString();
         
         this.pageNames[pageIndex.toString()] = pageIndex;
         
         node.id = "page " + id;
         
         node.style.display = "none";
      };

      this.makeActive = function(){
         this.readNewCSS();
         
         this.node.style.userSelect = "none";
         
         activeBinder = this;
      };

      this.makeInactive = function(){
         this.node.style.userSelect = "auto";
         
         activeBinder = null;
      };

      this.openPage = function(pageID){
         if(typeof pageID === "string") pageID = this.pageNames[pageID];

         this.pageList[this.currentPage].style.display = "none";
         
         this.pageList[pageID].style.display = "block";

         this.currentPage = pageID;
      };

      this.hide = () => this.node.style.display = "none";
      
      this.show = () => this.node.style.display = "inline";

      this.readNewCSS = function(){
         let CSS = window.getComputedStyle(this.node);
         
         this.x = parseInt(CSS["left"]);
         this.y = parseInt(CSS["top"]);
         
         this.width = parseInt(CSS["width"]);
         this.height = parseInt(CSS["height"]);
         
         this.min_width = parseInt(CSS["min-width"]);
         this.min_height = parseInt(CSS["min-height"]);
      };

      this.translateX = function(x){
         if(typeof x === "number"){
            this.node.style.left = x.toString() + "px";
         }else{
            if(/%/.test(x)){
               x = parseInt(x);
               x = (window.innerWidth * x / 100) - (this.width * x / 100);

               this.node.style.left = x.toString() + "px";
            }else if(/px/.test(x)){
                this.node.style.left = x;
            }else{
                this.node.style.left = x + "px";
            }
         }
      };

      this.translateY = function(y){
         if(typeof y === "number"){
            this.node.style.top = y.toString() + "px";
         }else{
            if(/%/.test(y)){
               y = parseInt(y);
               y = (window.innerHeight * y / 100) - (this.height * y / 100);

               this.node.style.top = y.toString() + "px";
            }else if(/px/.test(y)){
                this.node.style.top = y;
            }else{
                this.node.style.left = y + "px";
            }
         }
      };

      this.scaleX = function(width){
         if(typeof width === "number"){
            this.node.style.width = width.toString() + "px";
         }else{
            if(/%/.test(width)){
               width = window.innerWidth * parseInt(width) / 100;

               this.node.style.width = width.toString() + "px";
            }else if(/px/.test(width)){
                this.node.style.width = width;
            }else{
                this.node.style.width = width + "px";
            }
         }
      };
      
      this.scaleY = function(height){
         if(typeof height === "number"){
            this.node.style.height = height.toString() + "px";
         }else{
            if(/%/.test(height)){
               height = window.innerHeight * parseInt(height) / 100;
               
               this.node.style.height = height.toString() + "px";
            }else if(/px/.test(height)){
                this.node.style.height = height;
            }else{
                this.node.style.height = height + "px";
            }
         }
      };

      this.init();
   }

   function convertToDiv(oldNode){
      let newNode = document.createElement("DIV");

      for(let attribute of oldNode.attributes){
         newNode.attributes[attribute.name] = attribute.value;
         
         if(/\(.*?\)/.test(attribute.value)) newNode.setAttribute(attribute.name, attribute.value);
      }

      for(let child of oldNode.children) newNode.appendChild(child.cloneNode(true));

      oldNode.parentNode.insertBefore(newNode, oldNode);

      copyStyle(oldNode, newNode);
      newNode.id = oldNode.id;

      oldNode.remove();

      return newNode;
   }

   function copyStyle(oldNode, newNode){
      oldStyle = window.getComputedStyle(oldNode);
      newStyle = window.getComputedStyle(newNode);

      for(let rule of oldStyle)
         if(oldStyle[rule] != newStyle[rule])
            newNode.style[rule] = oldStyle[rule];
   }   
   
   function loadBinder(node){
      let binderName = node.id;
      let i = binderList.push(new Binder(node))-1;

      if(binderName) binderNames[binderName] = i;
      binderNames[i.toString()] = i;

      zIndex.push(i);
      binderList[i].node.style.zIndex = zIndex.length-1;
      
      return binderList[i];
   }
})();
