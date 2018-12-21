import AnnotationShape from'./annotation-shape';import{getValidValue,pluckNumber,pluck}from'../../../../fc-core/src/lib';var getComputedImagePosition=a=>{let{height:b,width:c,vAlign:d,align:e,x:f,y:g}=a,h={x:f,y:g};return'center'===e?h.x=f-c/2:'right'===e?h.x=f-c:void 0,'middle'===d?h.y=g-b/2:'bottom'===d?h.y=g-b:void 0,h};class ImageAnnotation extends AnnotationShape{constructor(){super(),this._listener=function(a){var b=this,c=this.config,d=a.originalEvent.target,e=d.height,f=d.width,g=b._getConfig('align'),h=b._getConfig('vAlign'),i=b._getConfig('xScale'),j=b._getConfig('yScale'),k=e*j,l=f*i,m=getComputedImagePosition({x:c.derivedX,y:c.derivedY,height:k,width:l,align:g,vAlign:h});c=Object.assign(b.rawConfig,{x:m.x,y:m.y,width:l,height:k,autoScale:0}),b.setData(c),b.rawConfig.onload&&b.rawConfig.onload.call(b,{width:l,height:k}),a.detachHandler()}}getName(){return'image'}configureAttributes(a={}){super.configureAttributes(a);let b=this,c=b.rawConfig,d=b.config,e=b.groupConfig.scaleX||1,f=b.groupConfig.scaleY||1;d.url=getValidValue(c.url),d.xScale=pluckNumber(c.xScale,100)/100,d.yScale=pluckNumber(c.yScale,100)/100,d.width=pluckNumber(c.width),d.height=pluckNumber(c.height),d.align=pluck(c.align,'left'),d.vAlign=pluck(c.vAlign,'top'),d.xScale*=e,d.yScale*=f,d.elementType='image','undefined'==typeof d.width&&'undefined'==typeof d.height&&b.addEventListener('load',b._listener)}updateAttr(){let a=this,b=a.config,c=b.calculatedAttrs;a._setConfig('attr',{x:pluckNumber(c.x,a.getScaledVal(b.x,!0)),y:pluckNumber(c.y,a.getScaledVal(b.y,!1))})}_getAnnotationAttrs(){let a=this,b=a.config,c=pluckNumber(a.rawConfig.autoscale,a.rawConfig.autoScale,1),d=b.attr,e=b.url,f=pluckNumber(b.attr.x,b.x),g=pluckNumber(b.attr.y,b.y);return c||(d={x:f,y:g}),b.derivedX=d.x='undefined'==typeof d.x?a.getScaledVal(f,!0):d.x,b.derivedY=d.y='undefined'==typeof d.y?a.getScaledVal(g,!1):d.y,d.src=e,d.opacity=pluckNumber(b.rawAlpha,100)/100,'undefined'!=typeof b.width&&(d.width=b.width),'undefined'!=typeof b.height&&(d.height=b.height),d}}export default ImageAnnotation;