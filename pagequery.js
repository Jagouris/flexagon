// pageQuery v0.0.5
// MIT License
// Copyright (c) 2025 Jagaurus (https://github.com/Jagaurus)

let mousePos = {x: 0, y: 0};
let prevMousePos = {x: 0, y: 0};
let activeWindow = null;
let windows = [];

function init(){
	document.addEventListener('mouseup', function(){
		if(activeWindow){
			activeWindow.element.style.userSelect = "auto";
			
			activeWindow = null;
		}
	}, false);

	document.addEventListener('mousemove', function(e){
		prevMousePos.x = mousePos.x;
		prevMousePos.y = mousePos.y;
		
		mousePos.x = e.clientX;
		mousePos.y = e.clientY;
		
		if(activeWindow){
			activeWindow.x += mousePos.x-prevMousePos.x;
			activeWindow.y += mousePos.y-prevMousePos.y;
		
			activeWindow.element.style.left = activeWindow.x;
			activeWindow.element.style.top = activeWindow.y;
		}
	}, false);
	
	let windowElements = document.getElementsByTagName("WINDOW");
	
	for(element of windowElements){
		if(element.id){
			windows[element.id] = new Window(element);
			windows[element.id].init();
		}else{
			let i = windows.push(new Window(element));
			windows[i-1].init();
		}
	}
}

function Window(element){
	this.element = element;
	this.x = 0;
	this.y = 0;
	this.pages = [];
	this.currentPage;
	
	this.init = function(){
		this.element.style.position = "fixed";
		this.element.style.zIndex = 0;
		
		for(element of this.element.getElementsByTagName("PAGE")){
			let id = element.getAttribute("id");
			
			if(id){
				this.pages[id] = element;
				
				if(this.currentPage === undefined) this.currentPage = id;
			}else{
				id = this.pages.push(element);
				
				if(this.currentPage === undefined) this.currentPage = id-1;
			}
			
			element.style.display = "none";
		}
		
		this.pages[this.currentPage].style.display = "block";
	}
	
	this.gotoPage = function(id){
		if(this.pages[id]){
			this.pages[this.currentPage].style.display = "none";
			
			this.currentPage = id;
			
			this.pages[id].style.display = "block";
		}else{
			console.log('"'+id+'"');
			console.log("That page doesn't exist.");
		}
	}
	
	this.makeActive = function(){
		let currentStyle = window.getComputedStyle(this.element);
				
		this.x = parseInt(currentStyle.getPropertyValue("left"));
		this.y = parseInt(currentStyle.getPropertyValue("top"));
		
		for(id in windows){
			windows[id].element.style.zIndex = 0;
		}
		
		this.element.style.zIndex = 1;
		this.element.style.userSelect = "none";
		
		activeWindow = this;
	}
}

function findParentWindow(srcElement){
	let parentNode = srcElement.parentNode;
		
	while(parentNode){
		if(parentNode.tagName == "WINDOW"){
			if(parentNode.id){
				return parentNode.id;
			}else{
				for(id in windows){
					if(windows[id].element == parentNode){
						return id;
					}
				}
			}
		}
		
		parentNode = parentNode.parentNode;
	}
	
	console.log("This element is not part of a window object");
}

function getWindow(id){
	if(windows[id]) return windows[id];
}

function dragWindow(id = null){
	if(!id) id = findParentWindow(event.srcElement);
	
	windows[id].makeActive();
}

function turnPage(page, id = null){
	if(!id) id = findParentWindow(event.srcElement);
	
	windows[id].gotoPage(page);
}