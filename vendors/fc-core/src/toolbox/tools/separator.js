import Tool from'./tool';import{pluckNumber}from'../../lib';class Path extends Tool{__setDefaultConfig(){super.__setDefaultConfig(),this.config.isVertical=1}configureAttributes(a={}){super.configureAttributes(a);let b=this,c=b.config;c.isVertical=pluckNumber(a.isVertical,c.isVertical)}draw(){let a=this,b=a.config,{x:c,y:d,width:e,height:f}=b,g=b.isVertical?['M',c+e/2,d,'v',f]:['M',c,d,'h',e],h={path:g,stroke:b.stroke,"stroke-width":b.strokeWidth,"stroke-linecap":'round'};b.isHidden||a.addGraphicalElement({el:'path',attr:h,component:a,container:{id:'group',label:'group',isParent:!0},label:'path',id:'path'})}}export default Path;