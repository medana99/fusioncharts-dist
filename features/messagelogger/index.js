import MessageLogger from'./msglogger';function messageLoggerLinker(a){a.addEventListener('instantiated',function(a){'chartAPI'===a.sender.getType()&&a.sender.registerFactory('messageLogger',function(b){if(b.getChildren('messageLogger'))return void b.getChildren('messageLogger')[0].configure(b);var c=b.getFromEnv('chart-container'),d=new MessageLogger;d.configure(b),d.addToEnv('chart-container',c),b.attachChild(d,'messageLogger'),b.getFromEnv('chartInstance').showLog=function(){return d&&d.show&&d.show()},b.getFromEnv('chartInstance').hideLog=function(){return d&&d.hide&&d.hide()},b.getFromEnv('chartInstance').clearLog=function(){return d&&d.clearLog&&d.clearLog()},a.sender.addEventListener('realtimeDataUpdate',function(a){a.sender.getChildren('messageLogger')&&a.sender.getChildren('messageLogger')[0].addLog(a.data)})})})}export default{extension:messageLoggerLinker,name:'messageLoggerLinker',type:'extension',requiresFusionCharts:!0};