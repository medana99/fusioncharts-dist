import{copyScale}from'../../../fc-core/src/axis/scales/continuous';import{timeMillisecond,timeSecond,timeMinute,timeHour,timeDay,timeWeek,timeMonth,timeYear}from'../time-intervals';import ScaleCalendar from'./calendar';import{tickFormat}from'../time-intervals/ticks';class ScaleTime extends ScaleCalendar{constructor(){super(timeYear,timeMonth,timeWeek,timeDay,timeHour,timeMinute,timeSecond,timeMillisecond),this.formatters={millisecond:this._localeConverter.formatter('.%L'),second:this._localeConverter.formatter(':%S'),minute:this._localeConverter.formatter('%I:%M'),hour:this._localeConverter.formatter('%I %p'),day:this._localeConverter.formatter('%a %d'),week:this._localeConverter.formatter('%b %d'),month:this._localeConverter.formatter('%B'),year:this._localeConverter.formatter('%Y')},this.setDomain([new Date(2e3,0,1),new Date(2e3,0,2)])}tickFormat(a){return a?b=>this._localeConverter.formatter(a).format(b):a=>tickFormat(this.timeIntervals,this.formatters,a)}copy(){return copyScale(this,new ScaleTime)}}export default ScaleTime;