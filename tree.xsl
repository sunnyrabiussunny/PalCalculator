<?xml version="1.0" encoding="utf-8" ?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="xml" version="1.0" encoding="utf-8" indent="yes"
omit-xml-declaration="yes" />
<xsl:variable name="id" select="/familytree/person/@id" />

<xsl:template match="/">
	<div id="treeContainer">
	<div class="clear"></div>
		<xsl:apply-templates select="familytree" /> 
	<div class="clear"></div>
	</div>
</xsl:template>

<xsl:template match="person">
<div class="PersonOn"><input class="button" type="button" onclick="switchOnOff(event);" /><div class="data">
	<xsl:apply-templates select="." mode="dataBox" />	
		<xsl:apply-templates select="children/partner/person" mode="dataBox">
			<xsl:sort select="not(parent::partner/@year != '')" />
			<xsl:sort select="parent::partner/@year" data-type="number" order="ascending" />
			<xsl:sort select="parent::partner/@month" data-type="number" order="ascending" />
			<xsl:sort select="parent::partner/@date" data-type="number" order="ascending" />
		</xsl:apply-templates>
		<div class="children">
		<xsl:apply-templates select="children/person" >
			<xsl:sort select="birthDate/@year" data-type="number" order="ascending" />
				<xsl:sort select="birthDate/@month" data-type="number" order="ascending" />
				<xsl:sort select="birthDate/@date" data-type="number" order="ascending" />
		</xsl:apply-templates>
		</div>
	</div>
</div>
</xsl:template>

<xsl:template match="person" mode="dataBox">
<xsl:variable name="pid" select="@id" />
<span class="fname"><xsl:attribute name="title"><xsl:value-of select="fname" /><xsl:text> </xsl:text> <xsl:value-of select="lname" /></xsl:attribute><a href="javascript:void(0)" 
				onblur="hideInfo(event);" 
				onclick="showInfo(event,this.name,this.id);" 
				onselectstart="return false;" 
				ondragstart="return false;"
				class="draggable">
				<xsl:attribute name="id"><xsl:value-of select="@id" /></xsl:attribute>
				<xsl:attribute name="name"><xsl:value-of select="fname" /><xsl:text> </xsl:text><xsl:value-of select="lname" /></xsl:attribute>
				<xsl:if test="name(parent::*)='partner'">
				<xsl:attribute name="class">inlaw</xsl:attribute>-</xsl:if>
					<xsl:choose>
						<xsl:when test="nname!=''"><xsl:value-of select="nname" /></xsl:when>
						<xsl:otherwise><xsl:value-of select="fname" /></xsl:otherwise>
					</xsl:choose>
				</a></span><div class="infoBoxOff">
			<xsl:attribute name="id"><xsl:value-of select="@id" />ib</xsl:attribute>
			<xsl:if test="photo != ''"><div class="portrait">
			<img>
			<xsl:attribute name="src"><xsl:value-of select="photo" /></xsl:attribute>
			<xsl:attribute name="alt">Photo Of <xsl:value-of select="fname" />&#160;<xsl:value-of select="lname" /></xsl:attribute>
			</img></div></xsl:if>
			
			<ul>
			<li><label>First Name:</label><span class="datum"><xsl:value-of select="fname" /></span></li>
			<xsl:if test="mname!=''">
			<li><label>Middle Name:</label><span class="datum"><xsl:value-of select="mname" /></span></li>
			</xsl:if>
			<li><label>Last Name:</label><span class="datum"><xsl:value-of select="lname" /></span></li>
			<li><label>Born:</label><span class="datum"><xsl:if test="birthDate!=''"><xsl:value-of select="birthDate" />
					</xsl:if>
				</span>
			</li>
			<xsl:if test="deathDate!=''">
			<li><label>Dec.:</label>
			<span class="datum"><xsl:value-of select="deathDate" />
			</span>
			</li></xsl:if>
			
			<xsl:for-each select="//person[@id=$pid]/children/partner" >
				<li><label>Married:</label><span class="datum"><xsl:value-of select="person/fname" /><xsl:text> </xsl:text>
					<xsl:value-of select="person/lname" />
					<xsl:if test="@year!=''">
					on <xsl:value-of select="@month" />/<xsl:value-of select="@date" />/<xsl:value-of select="@year" />
					</xsl:if></span></li>
				<xsl:apply-templates select="divorce" />
					
			</xsl:for-each>
			
			</ul>
			</div>
		
	
</xsl:template>

<xsl:template match="divorce">
<li><label></label><span class="datum"><em>later divorced</em></span></li>
</xsl:template>
</xsl:stylesheet>

