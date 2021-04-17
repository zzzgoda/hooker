//crack by com.yiche.autoeasy 10.49.0
//com.bitauto.invoice.present.InvoicePriceListPresenter:_
function loadDexfile(dexfile) {
    Java.perform(function() {
          Java.openClassFile(dexfile).load();
          //console.log("load " + dexfile);
    });
};

function checkLoadDex(className, dexfile) {
    Java.perform(function() {
        if (!classExists(className)) {
            Java.openClassFile(dexfile).load();
            //console.log("load " + dexfile);
        }
    });
};

function classExists(className) {
    var exists = false;
    try {
        var clz = Java.use(className);
        exists = true;
    } catch(err) {
        //console.log(err);
    }
    return exists;
};

function getClassName(obj) {
    if (obj.getClass) {
        return obj.getClass().getName();
    }
    var javaObject = Java.use("java.lang.Object");
    return Java.cast(obj, javaObject).getClass().getName();
}

//str1是否包含str2，str2可用正则表示
function contains(str1, str2) {
    var reg = RegExp(eval("/"+str2+"/"));
    if(str1 && str1.match && str1.match(reg)){
        return true;
    }else{
        return false;
    }
};

//创建ArrayList对象用这个方法就好了
function newArrayList() {
    var ArrayListClz = Java.use('java.util.ArrayList');
    return ArrayListClz.$new();
}

//创建HashSet对象用这个方法就好了
function newHashSet() {
    var HashSetClz = Java.use('java.util.HashSet');
    return HashSetClz.$new();
}

//创建HashMap对象用这个方法就好了
function newHashMap() {
    var HashMapClz = Java.use('java.util.HashMap');
    return HashMapClz.$new();
}

function newMethodBeat(text, executor) {
    var threadClz = Java.use("java.lang.Thread");
    var androidLogClz = Java.use("android.util.Log");
    var exceptionClz = Java.use("java.lang.Exception");
    var processClz = Java.use("android.os.Process");
    var currentThread = threadClz.currentThread();
    var beat = new Object();
    beat.invokeId = Math.random().toString(36).slice( - 8);
    beat.executor = executor;
    beat.myPid = processClz.myPid();
    beat.threadId = currentThread.getId();
    beat.threadName = currentThread.getName();
    beat.text = text;
    beat.startTime = new Date().getTime();
    beat.stackInfo = androidLogClz.getStackTraceString(exceptionClz.$new()).substring(20);
    return beat;
};

function printBeat(beat) {
    var str = ("------------pid:" + beat.myPid + ",startFlag:" + beat.invokeId + ",objectHash:"+beat.executor+",thread(id:" + beat.threadId +",name:" + beat.threadName + "),timestamp:" + beat.startTime+"---------------\n");
    str += beat.text + "\n";
    str += beat.stackInfo;
    str += ("------------endFlag:" + beat.invokeId + ",usedtime:" + (new Date().getTime() - beat.startTime) +"---------------\n");
	console.log(str);
};

function log(str) {
    console.log(str);
};

function getBaseContext() {
    var currentApplication = Java.use('android.app.ActivityThread').currentApplication();
    var context = currentApplication.getApplicationContext();
    return context; //Java.scheduleOnMainThread(fn):
};

function sleep(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};



var loadedXRadar = false;

function loadXinitDexfile(dexfile) {
    loadDexfile('/data/user/0/com.yiche.autoeasy/xinit/'+dexfile);
};

function loadXRadarDexfile() {
    loadedXRadar = true;
    loadDexfile('/data/user/0/com.yiche.autoeasy/radar.dex');
};

function fastTojson(javaObject) {
    var JSONClz = Java.use("gz.com.alibaba.fastjson.JSON");
    return JSONClz.toJSONString(javaObject);
};

function getPrettyString(javaObject) {
    var XPretty = Java.use("gz.util.XPretty");
    return XPretty.getPrettyString(javaObject);
};

function xPretty(javaObject) {
    var str = getPrettyString(javaObject);
    console.log(str);
};

function getField(javaObject, fieldName) {
    var X = Java.use("gz.util.X");
    return X.getField(javaObject, fieldName);
};

function storeObjectAndLog(javaObject) {
    var className = getClassName(javaObject);
    var ObjectsStore = Java.use("gz.radar.objects.ObjectsStore");
    var objectId = ObjectsStore.storeObject(javaObject);
    console.log(className + " ObjectsStoreId: " +objectId);
};


loadXRadarDexfile();

//com.bitauto.invoice.present.InvoicePriceListPresenter:_
Java.perform(function() {
    var com_bitauto_invoice_present_InvoicePriceListPresenter_clz = Java.use('com.bitauto.invoice.present.InvoicePriceListPresenter');
    var com_bitauto_invoice_present_InvoicePriceListPresenter_clz_init_8233 = com_bitauto_invoice_present_InvoicePriceListPresenter_clz.$init.overload('com.bitauto.invoice.view.InvoicePriceListActivity');
    com_bitauto_invoice_present_InvoicePriceListPresenter_clz_init_8233.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public com.bitauto.invoice.present.InvoicePriceListPresenter(com.bitauto.invoice.view.InvoicePriceListActivity)';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = com_bitauto_invoice_present_InvoicePriceListPresenter_clz_init_8233.call(this, v0);
        printBeat(beat);
        storeObjectAndLog(returnObj);
        return returnObj;
    };
});