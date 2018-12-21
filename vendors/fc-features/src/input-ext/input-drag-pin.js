import Base from'./input-base';import{getPosition,pluckNumber,isIE,hasSVG}from'../../../fc-core/src/lib';import{priorityList}from'../../../fc-core/src/schedular';import{getDep}from'../../../fc-core/src/dependency-manager';let UNDEF,math=Math,mathMin=math.min,mathMax=math.max,mathAbs=math.abs,TRACKER_FILL='rgba(255,0,0,'+(isIE?.002:1e-6)+')';class InputDragPin extends Base{constructor(){super();var a=this;a.controlArr=[{nativeInteraction:['fc-dragstart'],callback:a.dragstart.bind(a),component:a},{nativeInteraction:['fc-dragmove'],callback:a.dragmove.bind(a),component:a},{nativeInteraction:['fc-dragend'],callback:a.dragend.bind(a),component:a}],a.toggle=a.toggle.bind(a)}getName(){return'dragPin'}configure(){super.configure();var a=this,b=a.getFromEnv('chartConfig'),c=a.getFromEnv('dataSource').chart,d=a.getLinkedParent(),e=a.config;e.attr=e.attr||{stroke:'#3399ff',fill:'#b9d5f1',"stroke-width":0},e.pinAttr=e.pinAttr||{"stroke-width":0,stroke:'none',fill:'#b9d5f1',"shape-rendering":'crisp'},e.borderWidth=b.borderWidth||(b.borderWidth=pluckNumber(c.showborder,1)?pluckNumber(c.borderthickness,1):0),a.config.skipGraphics||a.setLinkedItem('button',a.createButton({icon:'pinModeIcon',tooltext:a.config.tooltext||'Pin mode',handlers:{click:a.toggle},state:'activated'})),d.registerDependancy([{derivedInteraction:['zoomin','zoomout'],callback:a.dependancyFn,component:a}]),a.disable(UNDEF,!1)}enable(a,b){var c=this,d=c.config;!0!==d.enabled&&(d.enabled=!0,d.state='pressed',c.fireEvent('pinenabled'),c.setControl(),!b&&c.getFromEnv('chart').fireChartInstanceEvent('zoommodechanged',{pinModeActive:!0},a&&a.originalEvent))}dependancyFn(a){('zoomin'===a.type||'zoomout'===a.type)&&this.disable(a)}draw(){var a,b=this,c=b.config;b.createPin(),b.config.pinElemVisible&&b.addJob('resizePinElem',function(){a=b.getFromEnv('xAxis')[0],b.pinRangePixels(a.getPixel(c.boxStartValue),a.getPixel(c.boxEndValue))},priorityList.postRender)}_setConfig(){var a=this,b=a.getFromEnv('chart'),c=a.getFromEnv('chartConfig'),d=a.config,e=Object.assign({},d.attr||{}),f=e['stroke-width']=pluckNumber(e.strokeWidth,e['stroke-width'],1),g=b.getFromEnv('chart-container'),h=getPosition(g,b);d.zoomX='horizontal'===d.orientation||'both'===d.orientation,d.zoomY='vertical'===d.orientation||'both'===d.orientation,d.canvasY=c.canvasTop,d.canvasX=c.canvasLeft,d.canvasW=c.canvasWidth,d.canvasH=c.canvasHeight,d.canvasX2=c.canvasLeft+c.canvasWidth,d.canvasY2=c.canvasTop+c.canvasHeight,d.strokeWidth=f,d.chartPosLeft=h.left,d.chartPosTop=h.top}disable(a,b){var c=this,d=c.config,e=c.getContainer('pingroup'),f=c.getGraphicalElement('pintracker');!1!==d.enabled&&(d.enabled=!1,d.state='activated',e&&e.hide(),f&&f.hide(),c.fireEvent('pindisabled'),!b&&c.getFromEnv('chart').fireChartInstanceEvent('zoommodechanged',{pinModeActive:!1},a&&a.originalEvent),c.setControl(),d.pinElemVisible=!1)}setControl(){var a=this,b=a.getLinkedParent(),c=a.controlArr,d=a.getLinkedItem('button');b.releaseControl(c),a.isEnabled()&&b.getControl(c),d&&d.setCurrentState(a.config.state)}createPin(){var a,b,c,d,e,f=this,g=f.config,h=f.getFromEnv('chart'),i=f.getFromEnv('chartConfig'),j=f.getFromEnv('animationManager'),k=i.canvasTop,l=i.canvasBottom,m=i.canvasHeight,n=i.canvasLeft,o=g.borderWidth,p=i['clip-pinrect'],q=f.getContainer('pingroup'),r=f.getContainer('pinElemGroup'),s=f.getGraphicalElement('pinrect'),t=f.getGraphicalElement('pintracker');d=i._visw=i.canvasWidth,e=i._visx=i.canvasLeft,a=getDep('redraphael','plugin').crispBound(0,k-l,0,m,o),p=i['clip-pinrect']=[a.x,k,a.width,a.height],q||f.addContainer('pingroup',q=j.setAnimation({el:'group',finalAttr:{name:'zoompin'},component:f,label:'group'}).insertBefore(h.getChildContainer('plotGroup')).hide()),q.transform(i._pingrouptransform=['T',e,l]),r||f.addContainer('pinElemGroup',r=j.setAnimation({el:'group',attr:{name:'zoompinelements'},component:f,container:q,label:'group'})),f.config.pinAttr.x=0,f.config.pinAttr.y=k-l,f.config.pinAttr.width=d,f.config.pinAttr.height=m,b=j.setAnimation({el:s||'rect',attr:f.config.pinAttr,container:q,component:f}),s||f.addGraphicalElement('pinrect',b),c=j.setAnimation({el:t||'rect',attr:{transform:q.transform(),x:0,y:k-l,width:0,height:m,stroke:'none',fill:TRACKER_FILL,cursor:hasSVG&&'ew-resize'||'e-resize'},container:h.getChildContainer('trackerGroup'),component:f}).hide(),t||f.addGraphicalElement('pintracker',c),c.undrag(),c.drag(function(a){var b=a.data[0],d=e+b+this.__pindragdelta,g=this.__pinboundleft,h=this.__pinboundright,i=this.data('cliprect').slice(0);d<g?d=g:d>h&&(d=h),q.transform(['T',d,l]),c.transform(q.transform()),hasSVG||(i[0]=i[0]+d-e-this.__pindragdelta,j.setAnimation({el:q,attr:{"clip-rect":i},component:f})),this.__pindragoffset=b},function(){this.__pinboundleft=0-p[0]+e+n,this.__pinboundright=this.__pinboundleft+d-p[2],this.data('cliprect',q.attr('clip-rect')),q._.clipispath=!0},function(){q._.clipispath=!1,this.__pindragdelta+=this.__pindragoffset,delete this.__pindragoffset,delete this.__pinboundleft,delete this.__pinboundright})}pinRangePixels(a,b,c){var d,e,f,g,h,j,k=Math.abs,l=Math.round,m=this,n=m.getFromEnv('chart'),o=n.config,p=o.canvasLeft,q=m.getFromEnv('xAxis')[0],r=q.getLimit(),s=r.max,t=r.min,u=m.getContainer('pingroup'),v=m.getGraphicalElement('pinrect'),w=m.getContainer('pinElemGroup'),x=o['clip-pinrect'],y=m.getFromEnv('animationManager'),z=o._pingrouptransform,A=[],B=b-a,C=m.getGraphicalElement('pintracker');if(n.iterateComponents(a=>{a.getType&&'dataset'===a.getType()&&A.push(a)}),u&&v){for(a===b&&(u.hide(),C.hide()),j=A.length;j--;)d=A[j],d.fireEvent('createpinelements',{group:w});x[0]=a+p,x[2]=B,y.setAnimation({el:u,attr:{"clip-rect":x,transform:z},component:m}).show(),C.__pindragdelta=0,C.show(),y.setAnimation({el:C,attr:{transform:z,x:a,width:B},component:m}),m.config.pinElemVisible=!0,e=l(q.getValue(a+p,{wrtVisible:!0})),f=l(q.getValue(b+p,{wrtVisible:!0})),e=e<t?t:e,f=f>s?s:f,g=q.getLabel(e).label,h=q.getLabel(f).label,c&&n.fireChartInstanceEvent('pinned',{startIndex:e||k(e),endIndex:f||k(f),startLabel:g,endLabel:h},c.originalEvent)}}dragstart(a){this._setConfig();var b,c,d=this,e=d.getFromEnv('chart'),f=d.getFromEnv('animationManager'),g=d.getFromEnv('chart-container'),h=d.config,i=h.attr,j=d.getGraphicalElement('resizeBox'),k=a.originalEvent,l=h.layerX=(k.pageX||k.data[0])-h.chartPosLeft,m=h.layerY=(k.pageY||k.data[1])-h.chartPosTop,n=h.canvasY,o=h.canvasX,p=h.canvasX2,q=h.canvasY2;b=getPosition(g),h.chartPosLeft=b.left,h.chartPosTop=b.top,h.oy=m,h.ox=l,h.allowMove=!1,i.x=0,i.y=0,i.width=0,i.height=0,c=f.setAnimation({el:j||'rect',attr:i,container:e.getChildContainer('trackerGroup'),component:d,callback:function(){this.show()}}),j||d.addGraphicalElement('resizeBox',c),l>o&&l<p&&m>n&&m<q&&(h.allowMove=!0),h.dragstartFn&&'function'==typeof h.dragstartFn&&h.dragstartFn(a)}dragmove(a){this._setConfig();var b=this,c=b.config,d=b.getFromEnv('animationManager'),e=b.getGraphicalElement('resizeBox'),f=a.originalEvent,g=f.pageX||f.data[2],h=f.page||f.data[3],i=c.layerX=g-c.chartPosLeft,j=c.layerY=h-c.chartPosTop,k=i-c.ox,l=j-c.oy,m=c.ox,n=c.oy,o=c.zoomX,p=c.zoomY,q=c.strokeWidth,r=c.canvasW,s=c.canvasH,t=c.canvasY,u=c.canvasX,v=c.canvasX2,w=c.canvasY2;d.setAnimationState('dragMove');c.allowMove&&(!c.isDragged&&(c.isDragged=1),k=-(m-mathMin(m-(m-mathMax(m+k,u)),v)),l=-(n-mathMin(n-(n-mathMax(n+l,t)),w)),d.setAnimation({el:e,attr:{x:(o?mathMin(m,m+k):u)+.5*q,y:(p?mathMin(n,n+l):t)+.5*q,width:o?mathAbs(k):r,height:p?mathAbs(l):s},component:b}),c.dragmoveFn&&'function'==typeof c.dragmoveFn&&c.dragmoveFn(a))}dragend(a){this._setConfig();var b,c,d,e=this,f=e.getFromEnv('chart'),g=f.config,h=e.config,i=e.getFromEnv('xAxis')[0],j=e.getGraphicalElement('resizeBox'),k=h.bBox;f.getFromEnv('animationManager').setAnimationState('dragEnd'),k=j.getBBox(),d={chart:f,selectionLeft:k.x,selectionTop:k.y,selectionHeight:k.height,selectionWidth:k.width,originalEvent:a.originalEvent},h.isDragged&&(h.dragendFn&&'function'==typeof h.dragendFn&&h.dragendFn(a,d),h.isDragged=0),j.hide(),delete h.oy,delete h.ox,b=k.x-g.canvasLeft,c=b+k.width;b==c||(h.boxStartValue=i.getValue(b),h.boxEndValue=i.getValue(c),e.pinRangePixels(b,c,a))}}export default InputDragPin;