let t0=new Date,t1=new Date,ie8Satisfier=0;const isNil=a=>'undefined'==typeof a||null===a;class TimeInterval{constructor(a,b,c,d,e){this._name=a,this._floori=b,this._offseti=c,this._count=d,this._field=e}name(){return this._name}floor(a){const b=new Date(+a);return this._floori(b),b}ceil(a){const b=new Date(a-1);return this._floori(b),this._offseti(b,1),this._floori(b),b}round(a){const b=this.floor(a),c=this.ceil(a);return a-b<c-a?b:c}offset(a,b){const c=new Date(+a);return this._offseti(c,isNil(b)?1:Math.floor(b)),c}range(a,b,c){const d=[],e=this.ceil(a),f=isNil(c)?1:Math.floor(c);let g;if(!(e<b)||!(0<f))return d;do g=new Date(+e),d.push(g),this._offseti(e,f),this._floori(e);while(g<e&&e<b);return d}filter(a){var b=Number.isNaN;return new TimeInterval(this.name(),c=>{if(!b(+c))for(;this._floori(c),!a(c);)c.setTime(c-1)},(c,d)=>{let e=d;if(!b(+c))if(0>e)for(;0>=++e;){ie8Satisfier++;do this._offseti(c,-1);while(!a(c))}else for(;0<=--e;)do this._offseti(c,1);while(!a(c))})}count(a,b){let c=0;return this._count&&(t0.setTime(+a),t1.setTime(+b),this._floori(t0),this._floori(t1),c=Math.floor(this._count(t0,t1))),c}every(a){const b=Math.floor(a);let c=null;return c=this._count&&Number.isFinite(b)&&0<b?1<b?this.filter(this._field?a=>0==this._field(a)%b:a=>0==this.count(0,a)%b):this:null,c}}export default TimeInterval;