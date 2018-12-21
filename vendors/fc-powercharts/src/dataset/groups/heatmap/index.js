import{ComponentInterface}from'../../../../../fc-core/src/component-interface';class HeatMapGroup extends ComponentInterface{constructor(){super(),this.setState('visible',!0),this.getDataLimits=null}getType(){return'group'}getName(){return'heatMapGroup'}createContainer(){let a,b,c=this,d=c.getLinkedParent(),e=c.getFromEnv('animationManager'),f=d.getChildContainer();for(a in f)b=f[a],c.getChildContainer(a)||c.addChildContainer(a,e.setAnimation({el:'group',attr:{name:'manager-'+a},container:b,component:c,label:'group'}))}getLimits(a){let b,c=this,d=+Infinity,e=-Infinity,f=0,g=function(a){e=Math.max(e,a.max),d=Math.min(d,a.min)};return c._mapChildren(c=>c.getState('removed')||!1===c.getState('visible')?void(a&&(b=c.getDataLimits(a),g(b))):void(f++,b=c.getDataLimits(a),g(b))),f?c.setState('visible',!0):c.setState('visible',!1),this.config.range||(this.config.range={},this.config.range.min=this.config.dataMin,this.config.range.max=this.config.dataMax),{max:e,min:d}}draw(){var a=this,b=a.getLimits(!0);a.addToEnv('datasetMinValue',b.min),a.addToEnv('datasetMaxValue',b.max),this.createContainer()}getAxisValuePadding(){var a=Math.max;let b={},c=-Infinity,d=-Infinity,e=-Infinity,f=-Infinity;return this._mapChildren(g=>{g.getState('removed')||(b=g.getAxisValuePadding&&g.getAxisValuePadding()||{},c=a(c,b.left||-Infinity),d=a(d,b.right||-Infinity),e=a(e,b.top||-Infinity),f=a(f,b.bottom||-Infinity))}),c===-Infinity&&(c=0),d===-Infinity&&(d=0),e===-Infinity&&(e=0),f===-Infinity&&(f=0),this.config.padding||(this.config.padding={},this.config.padding.left=c,this.config.padding.right=d,this.config.padding.top=e,this.config.padding.bottom=f),{left:c,right:d,top:e,bottom:f}}}export default HeatMapGroup;