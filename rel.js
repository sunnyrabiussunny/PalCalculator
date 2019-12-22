<%
/*******************************************
****  REL CALCULATOR OBJECT  ***************
********************************************/
function RelCalculator(xml)
{
	/* Private Properties */
	this.xmlDoc = xml;
	this.arPos = new Array(); 	
	this.arFirst = null;
	this.arLast = null;
	this.g = null;
	
	/* Public Methods */
	this.GetRelByID = getRelByID;
	this.GetRelByArray = getRelByArray;
	this.GelRelByDistance = gelRelByDistance;
	this.GetRelByRC = getRelByRC;
	
	/* Private Methods */
	this.TestNode = testNode;
	this.Reset = resetRel;
	Array.prototype.copy = rcCopy;
}

/*******************************************
****  GET REL FUNCTIONS  *******************
********************************************/
function getRelByID(idFirst, idLast)
{	
	if (isNaN(idFirst) || isNaN(idLast)) throw new Error("Id is not numeric");

	idFirst = parseInt(idFirst);
	idLast = parseInt(idLast);
	if (!this.xmlDoc) return false;
	this.arPos[0]=0;
	var RootNode = this.xmlDoc.documentElement.firstChild;
	if (!this.TestNode(RootNode,0,idFirst, idLast)) return false;

	return this.GetRelByArray(this.arFirst, this.arLast, this.g);
}
function getRelByArray(arF, arL, g)	
{	
	g = (g==0||g==1)? g : 2;
	var len = (arF.length<arL.length)? arF.length : arL.length;
	for (var i=0; i<len; i++){if (arF[i] != arL[i]) break;}
	var a = (arF.length - i);
	var b = (arL.length - i);
	return(this.GelRelByDistance(a,b,g));
}
function gelRelByDistance(a,b,g)
{
	a = parseInt(a);
	b = parseInt(b);
	g = (g==0||g==1)? g : 2;
	var c = ((b>=a)?  a: a - (a - b))
	var r = a - b;
	return(this.GetRelByRC(c,r,g));
}
function getRelByRC(c,r,g)
{
	var strName = "";
	var absR;	
	var g = (g==0||g==1)? g : 2;
	var arYou 	= [["same person","same person","same person"],["brother","sister","sibling"]];
	var arStatic = new Array();

	arStatic[0] = [["son ","daughter","child"],["father","mother","parent"]];
	arStatic[1] = [["nephew","neice","nephew/neice"],["uncle","aunt","uncle/aunt"]];
	if (c==0)
	{	
		absR = Math.abs(r);
		if (absR==0) strName = arYou[c][g];
		if (absR>0) strName = (r<0)? arStatic[c][0][g] : arStatic[c][1][g];
		if (absR>1) strName = "grand" + strName;
		if (absR>2) strName = " great " + strName;
		if (absR>3) strName = rcFormatPrefix(absR-2) + strName;
	}
	else if(c==1)
	{
		absR = Math.abs(r);
		if (absR==0) strName = arYou[c][g];
		if (absR>0) strName = (r<0)? arStatic[c][0][g] : arStatic[c][1][g];
		if (absR==2) strName = " great " + strName;
		else{
			if (absR>1) strName = "grand" + strName;
			if (absR>2) strName = " great " + strName;
			if (absR>3) strName = rcFormatPrefix(absR-1) + strName;
		}
	}
	else{
		var cousin =  rcFormatPrefix(c-1) + " cousin ";
		var removed = (Math.abs(r)>0)? Math.abs(r) + " times removed." : "";
		strName = cousin + removed;
	}
	return strName;
}

/*******************************************
****  TREE SEARCH FUNCTION  ****************
********************************************/
function testNode(PerNode, depth,idFirst, idLast){
	
	if (PerNode.getAttribute("id") == null) return false;
	
	var id = parseInt(PerNode.getAttribute("id"));
	
	
	depth++;
	if (id==idFirst) this.arFirst = this.arPos.copy();
	if (id==idLast){
		this.arLast = this.arPos.copy();
		var tempGend = PerNode.getElementsByTagName("gender").item(0);
		if (tempGend){
			if (tempGend.text == "m") this.g = 0;
			else if (tempGend.text == "f") this.g = 1;
		}
	}
	
	if (this.arFirst !=null && this.arLast!=null)return true;

	var ChildrenNodes = PerNode.getElementsByTagName("children");
	
	for (var p=0, k=0;p<PerNode.childNodes.length;p++){
		if (PerNode.childNodes.item(p).tagName == "children"){
			//var ChildrenNode = ChildrenNodes.item(p);
			var ChildrenNode = PerNode.childNodes.item(p);
			
			
			//var ChildrenNode = PerNode.getElementsByTagName("children").item(0);
			if(!ChildrenNode) return false;
			
			for (var c=0; c<ChildrenNode.childNodes.length; c++){
				k++;
				this.arPos.length = depth;
				this.arPos[depth] = k;
			
			
				var ret = this.TestNode(ChildrenNode.childNodes.item(c), depth, idFirst, idLast)
				if (ret == true) return true;
			}
		}
	}
	return false;
}
/*******************************************
****  REL CALC UTILITIES  ******************
********************************************/
function rcFormatPrefix(y)
{ // Accepts an integer and returns a place string (1 : "1st")
	var strAddY = (y>10 && y<14)? "th" : "";
	if (strAddY=="")
	{
		var strY = y + "";	
		strNum = strY.substring(strY.length-1);
		switch (strNum)
		{
		case "1": strAddY = "st"; break;
		case "2": strAddY = "nd"; break;
		case "3": strAddY = "rd"; break;
		default : strAddY = "th"; break;
		}
	}
	return y + strAddY;
}
function resetRel()
{
	this.arPos = new Array();
	this.arFirst = null;
	this.arLast = null;
	this.g = null;
}
function rcCopy()
{
	var temp_array = new Array();
	for (var loop = 0; loop < this.length; loop++)
		temp_array[loop] = this[loop];
	return temp_array;
}

%>