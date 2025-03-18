// pageQuery version 0.0.1
// MIT License
// Copyright (c) 2025 Jagaurus (https://github.com/Jagaurus)

var mousePos = {x: 0, y: 0};
var prevMousePos = {x: 0, y: 0};
var activeElement = null;

function init(){
	document.addEventListener('mouseup', function(){
		activeElement = null;
	}, false);

	document.addEventListener('mousemove', function(e){
		prevMousePos.x = mousePos.x;
		prevMousePos.y = mousePos.y;
		
		mousePos.x = e.clientX;
		mousePos.y = e.clientY;
		
		if(activeElement){
			activeElement.x += mousePos.x-prevMousePos.x;
			activeElement.y += mousePos.y-prevMousePos.y;
		
			activeElement.element.style.left = activeElement.x;
			activeElement.element.style.top = activeElement.y;
		}
	}, false);
}

function Window(element){
	this.element = document.querySelector(element);
	this.grip;
	this.x, this.y = 0;
	this.style;
	this.pages = [];
	this.currentPage;
	
	this.init = function(){
		this.grip = this.element.children["grip"];
		
		this.style = window.getComputedStyle(this.element);
		
		if(this.grip){
			this.grip.addEventListener("mousedown", () => {
				this.style = window.getComputedStyle(this.element);
				
				this.x = parseInt(this.style.getPropertyValue("left"));
				this.y = parseInt(this.style.getPropertyValue("top"));
					
				activeElement = this;
			}, false);
		}
		
		for(i of this.element.childNodes){
			if(i.tagName == "PAGE"){
				var name = i.getAttribute("name");
				
				if(name){
					this.pages[name] = i;
					
					if(!this.currentPage) this.currentPage = name;
				}else{
					this.pages.push(i);
					
					if(!this.currentPage) this.currentPage = 0;
				}
				
				i.style.display = "none";
			}
		}
		
		this.pages[this.currentPage].style.display = "block";
	}
	
	this.switchPage = function(id){
		if(this.pages[id]){
			this.pages[this.currentPage].style.display = "none";
			
			this.currentPage = id;
			
			this.pages[id].style.display = "block";
		}else{
			console.log("Page " + id + " doesn't exist");
		}
	}
}