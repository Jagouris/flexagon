// pageQuery v0.0.8
// MIT License
// Copyright (c) 2025 Jagaurus (https://github.com/Jagaurus)

let mousePos = {x: 0, y: 0};
let prevMousePos = {x: 0, y: 0};
let activeBinder = null;
let binders = [];
let zIndex = [];

function init(){
	document.addEventListener('mouseup', function(){
		if(activeBinder) activeBinder.makeInactive();
	}, false);

	document.addEventListener('mousemove', function(e){
		prevMousePos = {
			x: mousePos.x,
			y: mousePos.y
		};
		
		mousePos = {
			x: e.clientX,
			y: e.clientY
		};
		
		if(activeBinder){
			activeBinder.pos.x += mousePos.x-prevMousePos.x;
			activeBinder.pos.y += mousePos.y-prevMousePos.y;
		
			activeBinder.translate(activeBinder.pos);
		}
	}, false);
	
	let binderElements = document.getElementsByTagName("BINDER");
	
	for(let srcElement of binderElements){
		loadBinder(srcElement, srcElement.id);
	}
	
	for(let i of zIndex){
		let a = window.getComputedStyle(binders[i].srcElement);
	}
}

function Binder(srcElement){
	this.srcElement = srcElement;
	this.pos = {x: 0, y: 0};
	this.pages = [];
	this.currentPage = undefined;
	
	this.init = function(){
		this.srcElement.style.position = "fixed";
		
		let pageElements = this.srcElement.getElementsByTagName("PAGE");
		
		for(let srcElement of pageElements){
			let id = srcElement.getAttribute("id");
			
			if(id){
				this.pages[id] = srcElement;
				
				if(this.currentPage === undefined) this.currentPage = id;
			}else{
				id = this.pages.push(srcElement)-1;
				
				if(this.currentPage === undefined) this.currentPage = id;
			}
			
			srcElement.style.display = "none";
		}
		
		if(this.currentPage === undefined){
			console.log(this.srcElement.id);
			
			return false;
		}
		
		this.srcElement.style.top = parseInt(this.srcElement.getAttribute("top"));
		this.srcElement.style.right = parseInt(this.srcElement.getAttribute("right"));
		this.srcElement.style.bottom = parseInt(this.srcElement.getAttribute("bottom"));
		this.srcElement.style.left = parseInt(this.srcElement.getAttribute("left"));
		
		this.pages[this.currentPage].style.display = "block";
		
		return true;
	};
	
	this.gotoPage = function(id){
		if(this.pages[id]){
			this.hidePage(this.currentPage);
			this.showPage(id);
			this.currentPage = id;
		}else{
			console.log("Page doesn't exist.");
		}
	};
	
	this.makeActive = function(){
		this.updateCurrentPosition();
		this.srcElement.style.userSelect = "none";
		
		activeBinder = this;
	};
	
	this.makeInactive = function(){
		this.srcElement.style.userSelect = "auto";
		
		activeBinder = null;
	};
	
	this.updateCurrentPosition = function(){
		let currentStyle = window.getComputedStyle(this.srcElement);
		
		this.pos = {
			x: parseInt(currentStyle.getPropertyValue("left")),
			y: parseInt(currentStyle.getPropertyValue("top"))
		};
	};
	
	this.translate = function(pos){
		this.srcElement.style.left = pos.x;
		this.srcElement.style.top = pos.y;
	};
	
	this.hide = function(){
		this.srcElement.style.display = "none";
	};
	
	this.show = function(){
		this.srcElement.style.display = "block";
	};
	
	this.hidePage = function(id){
		this.pages[id].style.display = "none";
	};
	
	this.showPage = function(id){
		this.pages[id].style.display = "block";
	};
}

function bringToFront(id){
	let i = zIndex.indexOf(id);
	
	if(i == -1) i = zIndex.indexOf(parseInt(id));
	
	zIndex.splice(i, 1);
	
	for(i; i < zIndex.length; i++){
		binders[zIndex[i]].srcElement.style.zIndex--;
	}
	
	zIndex[i] = id;
	binders[id].srcElement.style.zIndex = i;
}

function loadBinder(srcElement, id){
	if(id){
		binders[id] = new Binder(srcElement);
	}else{
		id = binders.push(new Binder(srcElement))-1;
	}

	success = binders[id].init(id);
	
	if(!success){
		console.log("You must include at least one <page> tag in your binder.");
		
		binders.splice(id, 1);
	}
	
	zIndex.push(id);
	binders[id].srcElement.style.zIndex = zIndex.length-1;
}

function defineBinder(srcElement, id = null){
	if(srcElement.tagName != "BINDER"){
		console.log("To load a new binder you must send a <binder> element.");
		
		return;
	}
	
	loadBinder(srcElement, id);
}

function findParentBinder(srcElement){
	let parentNode = srcElement.parentNode;
		
	while(parentNode){
		if(parentNode.tagName == "BINDER"){
			if(parentNode.id){
				return parentNode.id;
			}else{
				for(let id in binders){
					if(binders[id].srcElement == parentNode){
						return id;
					}
				}
			}
		}
		
		parentNode = parentNode.parentNode;
	}
	
	console.log("This element is not part of a binder object.");
}

function getBinder(id){
	if(binders[id]){
		return binders[id];
	}else{
		console.log("That binder doesn't exist.");
		
		return;
	}
}

function hideBinder(id = null){
	if(!id) id = findParentBinder(event.srcElement);
	
	binders[id].hide();
}

function showBinder(id){
	if(!id){
		console.log("Please specify a binder that you'd like to show.");
		
		return;
	}
	
	binders[id].show();
	bringToFront(id);
}

function dragBinder(id = null){
	if(!id) id = findParentBinder(event.srcElement);

	binders[id].makeActive();
	bringToFront(id);
}

function translateBinder(x, y, id = null){
	if(!id) id = findParentBinder(event.srcElement);
	
	binders[id].updateCurrentPosition();
	binders[id].translate({x: x, y: y});
}

function prevPage(id = null){
	if(!id) id = findParentBinder(event.srcElement);
	
	let currentPage = binders[id].currentPage;
	
	if(typeof binders[id].currentPage === "number"){
		if(binders[id].currentPage == 0){
			console.log("There are no earlier pages.");
		}else{
			binders[id].gotoPage(currentPage-1);
		}
	}else{
		console.log("The page index is not a number.");
	}
}

function nextPage(id = null){
	if(!id) id = findParentBinder(event.srcElement);
	
	let currentPage = binders[id].currentPage;
	
	if(typeof binders[id].currentPage === "number"){
		currentPage++;
		
		if(!binders[id].pages[currentPage]){
			console.log("There are no later pages.");
		}else{
			binders[id].gotoPage(currentPage);
		}
	}else{
		console.log("The page index is not a number.");
	}
}

function turnPage(page, id = null){
	if(!id) id = findParentBinder(event.srcElement);
	
	binders[id].gotoPage(page);
}

function getCurrentPage(id = null){
	if(!id) id = findParentBinder(event.srcElement);
	
	return binders[id].currentPage;
}