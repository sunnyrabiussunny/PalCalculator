var dragControl = new DragControl();

function DragControl() {
  	this.entity = null;
  	this.target = null;
  	this.origin = null;
  	this.enabled = false;
	
  	this.beginX = null;
  	this.beginY = null;

  	this.beginDrag = beginDrag;
  	this.endDrag = endDrag;
  	this.setTarget = setTarget;
  	this.setPosition = setPosition;
  	this.move = move;
  	this.reset = reset;
	document.onmousedown = checkDraggable;
}

function move(evt){
	if(evt.clientX < this.beginX - 5 || evt.clientX > this.beginX + 5  || evt.client < this.beginY - 5  || evt.clientY > this.beginY + 5) 
	{
		if (this.enabled == false)
		{	
			this.enabled = true;
			this.entity.style.position = "absolute";
			this.entity.style.filter = "alpha(opacity='50')";
			this.entity.style.MozOpacity = 0.5;
			addClass(this.entity, "dragged");
			this.entity = this.entity.parentNode.removeChild(this.entity);
			document.body.appendChild(this.entity);
			document.onmousemove = function anonymous(){ dragControl.setPosition(evt)};
			document.onmouseup = function anonymous() { dragControl.endDrag() };
		}
		this.setPosition(evt);
	}
	
}


function checkDraggable(evt) {
	
	var evt = (evt) ? evt : ((event) ? event : null);
	var obj = (evt.target)? evt.target : ((evt.srcElement)? evt.srcElement : null);
	if (obj == null) return;
	if (obj.className.search("draggable") != -1) dragControl.beginDrag(evt, obj);
}



function beginDrag(evt, obj){
	document.onmousemove = function anonymous() {dragControl.move(evt) };
	document.onmouseup = function anonymous() {dragControl.endDrag() };
	
	this.origin = obj.parentNode;
	this.entity = obj;
	//this.beginX = evt.clientX - ((this.entity.offsetLeft)? this.entity.offsetLeft: 0);
	//this.beginY = evt.clientY - ((this.entity.offsetTop)? this.entity.offsetTop: 0);
	this.beginX = evt.clientX;
	this.beginY = evt.clientY;
}




function endDrag() {
	if (this.enabled == true){
		
		this.entity.style.position = "static";
		this.entity.style.filter = "";
		this.entity.style.MozOpacity = 1;
		this.entity = this.entity.parentNode.removeChild(this.entity);
		this.origin.appendChild(this.entity);

		if (this.target){
			this.target.value = this.entity.name;
			if(this.target.id == "txtFirst"){
				document.getElementById("one").value = parseInt(this.entity.id);
			}
			if(this.target.id == "txtLast"){
				document.getElementById("two").value = parseInt(this.entity.id);
			}
		}
		this.enabled = false;
	}
	dragControl.reset();
}

function setPosition(evt) {
	this.entity.style.left = evt.clientX  + "px";
    	this.entity.style.top = evt.clientY + "px";
}

function reset() {
	removeClass(this.entity, "dragged");
	removeClass(this.entity, "target");
	
	document.onmouseup = null;
  	document.onmousemove = null;
  	
  	this.entity = null;
  	this.origin = null;
  	this.target = null;
  	this.beginX = null;
  	this.beginY = null;
}

function setTarget(obj){
	if(this.entity != null && this.entity != obj){
		this.target = obj;
		if (obj) addClass(this.entity, "target");
		else removeClass(this.entity, "target");
	}
}

function addClass(obj, strClass)
{
	if (!obj) return;
	var arClasses = new Array();
	arClasses = obj.className.split(" ");
	for (c=0; c<arClasses.length; c++) if (arClasses[c] == strClass) return;
	arClasses[arClasses.length] = strClass;
	obj.className = arClasses.join(" ");
}

function removeClass(obj, strClass)
{
	if (!obj) return;
	var arClasses = new Array();
	arClasses = obj.className.split(" ");
	for (c=0; c<arClasses.length; c++) {
		if (arClasses[c] == strClass){
			arClasses.splice(c,1);
			break;
		}
	}
	obj.className = arClasses.join(" ");
}


function switchOnOff(evt)
{
	var evt = (evt) ? evt : ((event) ? event : null);
	var elem = (evt.target)? evt.target : ((evt.srcElement)? evt.srcElement : null);
	divPerson = elem.parentNode;
	divPerson.className = (divPerson.className == "PersonOff")? "PersonOn" : "PersonOff";
}
function showInfo(evt,name,id)
{
	var evt = (evt) ? evt : ((event) ? event : null);
	var elem = (evt.target)? evt.target : ((evt.srcElement)? evt.srcElement : null);
	//var divInfo = elem.parentElement.parentElement.children[1];

	var divInfo = document.getElementById(parseInt(elem.id)+"ib");

	divInfo.className = (divInfo.className == "infoBoxOn")? "infoBoxOff" : "infoBoxOn";
	
	
	setInput(name, id);
	
	
	return false ;
	
}
function hideInfo(evt)
{
	var evt = (evt) ? evt : ((event) ? event : null);
	var elem = (evt.target)? evt.target : ((evt.srcElement)? evt.srcElement : null);
	//var divInfo = elem.parentElement.parentElement.children[1];
	var divInfo = document.getElementById(parseInt(elem.id)+"ib");
	divInfo.className = "infoBoxOff";
	return false;
}


function setInput(pname, pid)
{
    var one = document.getElementById("txtLast");
    var two = document.getElementById("txtFirst");
  
    var a = document.getElementById("two");
    var b = document.getElementById("one");
    
    var elem = null;
    var elemhidden = null;
    
    if (one.value.length<1) {elem = one;elemhidden=a;}
    else if (two.value.length<1) {elem = two;elemhidden=b;}
    else if (one.last==true) {elem = two;elemhidden=b;}
    else {elem=one;elemhidden=a;}
    
    
    one.last=false;
    two.last=false;
    
    elem.value=pname;
    elemhidden.value=pid;
    elem.last=true;
    
    
}