import{priorityList}from'../../../../../fc-core/src/schedular';function scrollTo(a){let b=this.apiInstance;b.addJob('scrollToAPoint',()=>{if(0<=a&&1>=a){let c=b.getChildren&&b.getChildren(),d=c.xAxis[0],e=d.getChildren('scrollBar')&&d.getChildren('scrollBar')[0],f=e&&e.getChildren('scrollAnchor')[0],g=d.getLimit&&d.getLimit(),h=d.getVisibleConfig&&d.getVisibleConfig(),i=h.maxValue-h.minValue,j=g.max-g.min,k=a*(j-i)+g.min,l=(h.minValue-g.min)/(j-i);f.config.scrollPosition=a,b.fireChartInstanceEvent('scrollStart',{scrollPosition:l}),d.setVisibleConfig(k,k+i),b.fireChartInstanceEvent('scrollEnd',{previousScrollPosition:l,scrollPosition:a})}},priorityList.postRender)}export{scrollTo};