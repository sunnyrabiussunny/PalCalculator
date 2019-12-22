<%@LANGUAGE="JAVASCRIPT"%><!-- #include file="rel.js" --><%

var one = Request.QueryString("one").Item;
var two = Request.QueryString("two").Item;
var nameLast = Request.QueryString("nameLast").Item;
var nameFirst = Request.QueryString("nameFirst").Item;

var Root = 100;

var xmlURL = Server.MapPath("tree.xml");
var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
xmlDoc.async = false;
xmlDoc.setProperty("ServerHTTPRequest", true);
xmlDoc.load(xmlURL)

var xslDoc = new ActiveXObject("Msxml2.DOMDocument");
xslDoc.async = false;
xslDoc.load(Server.MapPath("tree.xsl"));

if(one && two){
	var relObj = new RelCalculator(xmlDoc);
	var strRel = (relObj.GetRelByID(one,two));
}

%>
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <title>Tree Relationship Calculator</title>
	<script type="text/javascript" src="drag.js"></script>
    <link rel="stylesheet" type="text/css" href="tree.css" />
    <script type="text/javascript">
        function collapse(){
            var divs = document.getElementsByTagName("div");
            for (var i=0;i<divs.length;i++){
                if (divs[i].className=="PersonOn") divs[i].className="PersonOff";
            }
        }
        function expand(){
            var divs = document.getElementsByTagName("div");
            for (var i=0;i<divs.length;i++){
                if (divs[i].className=="PersonOff") divs[i].className="PersonOn";
            }
        }
        function setPerson(id)
        {
            alert(id);
            document.getElementById("one").value = id;
        }
        </script>
</head>
<body style="background-color:#eee;font-family:Verdana;font-size:12px;">

<div style="width:auto;margin:10px 50px;background-color:#fff;padding:30px;border:1px solid black;">
<h1 style="font-family:Georgia;font-size:20pt;">Tree Relationship Calculator</h1>
<p style="font-family:Verdana;font-size:10pt;color:#999;">Drag or click the highlighted names over the textbox to calculate relationships.</p>
	<div id="calcRelation">
	<form action="" method="get" >

	<fieldset style="border:0px;">
		<input id="txtLast" name="nameLast" type="text" value="<%=nameLast%>" onmouseover="dragControl.setTarget(this);" onmouseout="dragControl.setTarget();" readonly="readonly" />
		is
		<input id="txtFirst" name="nameFirst" type="text" value="<%=nameFirst%>" onmouseover="dragControl.setTarget(this);" onmouseout="dragControl.setTarget();" readonly="readonly" /><span style="margin:0px 10px 0px 0px">'s</span>
		
		: 
		
		<span id="relResults" style="padding:10px 20px;font-weight:bold;"><%=strRel%></span>
		
		<input type="submit" value="Calculate" />
		
		<input type="hidden" name="root" value="<%=Root%>" />
		<input id="one" type="hidden" name="one" value="<%=one%>" />
		<input id="two" type="hidden" name="two" value="<%=two%>" />
	</fieldset>

	</form>
	
	<a href="javascript: void(0)" onclick="collapse()"> Collapse All</a> : 
	<a href="javascript: void(0)" onclick="expand()"> Expand All</a>
	</div>
	<div id="cast" 	style="width:100%;overflow:hidden;padding-bottom:50px;overflow-x:auto;font-size:12px;">
		<%=xmlDoc.transformNode(xslDoc)%>
	</div>
	<p>&nbsp;</p>
</div>
</body>
</html>