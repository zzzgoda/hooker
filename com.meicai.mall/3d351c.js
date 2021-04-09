//crack by com.meicai.mall 3.2.1
//java.lang.String:_
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
    loadDexfile('/data/user/0/com.meicai.mall/xinit/'+dexfile);
};

function loadXRadarDexfile() {
    loadedXRadar = true;
    loadDexfile('/data/user/0/com.meicai.mall/radar.dex');
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



//java.lang.String:_
Java.perform(function() {
    var java_lang_String_clz = Java.use('java.lang.String');
    var java_lang_String_clz_init_0923 = java_lang_String_clz.$init.overload('int', 'int', '[C');
    java_lang_String_clz_init_0923.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'java.lang.String(int,int,char[])';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = java_lang_String_clz_init_0923.call(this, v0, v1, v2);
        printBeat(beat);
        return returnObj;
    };
    var java_lang_String_clz_init_4516 = java_lang_String_clz.$init.overload('[B', 'int', 'int');
    java_lang_String_clz_init_4516.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String(byte[],int,int)';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = java_lang_String_clz_init_4516.call(this, v0, v1, v2);
        printBeat(beat);
        return returnObj;
    };
    var java_lang_String_clz_init_6217 = java_lang_String_clz.$init.overload('[B', 'int', 'int', 'java.lang.String');
    java_lang_String_clz_init_6217.implementation = function(v0, v1, v2, v3) {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String(byte[],int,int,java.lang.String) throws java.io.UnsupportedEncodingException';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = java_lang_String_clz_init_6217.call(this, v0, v1, v2, v3);
        printBeat(beat);
        return returnObj;
    };
    var java_lang_String_clz_init_9541 = java_lang_String_clz.$init.overload('[B', 'java.nio.charset.Charset');
    java_lang_String_clz_init_9541.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String(byte[],java.nio.charset.Charset)';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = java_lang_String_clz_init_9541.call(this, v0, v1);
        printBeat(beat);
        return returnObj;
    };
    var java_lang_String_clz_init_0302 = java_lang_String_clz.$init.overload('[B', 'java.lang.String');
    java_lang_String_clz_init_0302.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String(byte[],java.lang.String) throws java.io.UnsupportedEncodingException';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = java_lang_String_clz_init_0302.call(this, v0, v1);
        printBeat(beat);
        return returnObj;
    };
    var java_lang_String_clz_init_8585 = java_lang_String_clz.$init.overload('java.lang.StringBuffer');
    java_lang_String_clz_init_8585.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String(java.lang.StringBuffer)';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = java_lang_String_clz_init_8585.call(this, v0);
        printBeat(beat);
        return returnObj;
    };
    var java_lang_String_clz_init_8328 = java_lang_String_clz.$init.overload('[C');
    java_lang_String_clz_init_8328.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String(char[])';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = java_lang_String_clz_init_8328.call(this, v0);
        printBeat(beat);
        return returnObj;
    };
    var java_lang_String_clz_init_1282 = java_lang_String_clz.$init.overload();
    java_lang_String_clz_init_1282.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String()';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = java_lang_String_clz_init_1282.call(this);
        printBeat(beat);
        return returnObj;
    };
    var java_lang_String_clz_init_9071 = java_lang_String_clz.$init.overload('java.lang.String');
    java_lang_String_clz_init_9071.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String(java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = java_lang_String_clz_init_9071.call(this, v0);
        printBeat(beat);
        return returnObj;
    };
    var java_lang_String_clz_init_7892 = java_lang_String_clz.$init.overload('[B', 'int');
    java_lang_String_clz_init_7892.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String(byte[],int)';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = java_lang_String_clz_init_7892.call(this, v0, v1);
        printBeat(beat);
        return returnObj;
    };
    var java_lang_String_clz_init_1928 = java_lang_String_clz.$init.overload('[B', 'int', 'int', 'int');
    java_lang_String_clz_init_1928.implementation = function(v0, v1, v2, v3) {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String(byte[],int,int,int)';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = java_lang_String_clz_init_1928.call(this, v0, v1, v2, v3);
        printBeat(beat);
        return returnObj;
    };
    var java_lang_String_clz_init_4099 = java_lang_String_clz.$init.overload('java.lang.StringBuilder');
    java_lang_String_clz_init_4099.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String(java.lang.StringBuilder)';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = java_lang_String_clz_init_4099.call(this, v0);
        printBeat(beat);
        return returnObj;
    };
    var java_lang_String_clz_init_5573 = java_lang_String_clz.$init.overload('[B');
    java_lang_String_clz_init_5573.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String(byte[])';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = java_lang_String_clz_init_5573.call(this, v0);
        printBeat(beat);
        return returnObj;
    };
    var java_lang_String_clz_init_5687 = java_lang_String_clz.$init.overload('[I', 'int', 'int');
    java_lang_String_clz_init_5687.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String(int[],int,int)';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = java_lang_String_clz_init_5687.call(this, v0, v1, v2);
        printBeat(beat);
        return returnObj;
    };
    var java_lang_String_clz_init_4611 = java_lang_String_clz.$init.overload('[C', 'int', 'int');
    java_lang_String_clz_init_4611.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String(char[],int,int)';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = java_lang_String_clz_init_4611.call(this, v0, v1, v2);
        printBeat(beat);
        return returnObj;
    };
    var java_lang_String_clz_init_6003 = java_lang_String_clz.$init.overload('[B', 'int', 'int', 'java.nio.charset.Charset');
    java_lang_String_clz_init_6003.implementation = function(v0, v1, v2, v3) {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String(byte[],int,int,java.nio.charset.Charset)';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = java_lang_String_clz_init_6003.call(this, v0, v1, v2, v3);
        printBeat(beat);
        return returnObj;
    };
});