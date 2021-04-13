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

function loadDexfile(dexfile) {
    Java.perform(function() {
        Java.openClassFile(dexfile).load();
        //console.log("load " + dexfile);
    });
};

var loadedXRadar = false;
function loadXRadarDexfile() {
    loadedXRadar = true;
    loadDexfile('/data/user/0/com.meicai.mall/radar.dex');
};


loadXRadarDexfile();

function hasTrustManagerImpl() {
    return classExists("com.android.org.conscrypt.TrustManagerImpl");
}

function newArrayList() {
    var ArrayListClz = Java.use('java.util.ArrayList');
    return ArrayListClz.$new();
}


function processOkHttp() {
    //知道你为什么有时候用JustTrustMe失败吗，因为app代码混淆了下面这些类你改到对应的类和方法就行啦
    if (classExists("com.squareup.okhttp.CertificatePinner")) {
        var squareupOkhttp3CertificatePinnerClz = Java.use('com.squareup.okhttp.CertificatePinner');
        var squareupOkhttp3CertificatePinnerClzCheck = squareupOkhttp3CertificatePinnerClz.check.overload('java.lang.String', 'java.util.List');
        squareupOkhttp3CertificatePinnerClzCheck.implementation = function(v0, v1) {
            //什么都不做
        };
    }else{
        console.error("没找到com.squareup.okhttp.CertificatePinner类，这是android系统自带的类没找到就算求了。不同系统不一样，不用找了!!!");
    }

    if (classExists("okhttp3.CertificatePinner")) {
        try {
            var okhttp3CertificatePinnerClz = Java.use('okhttp3.CertificatePinner');
            var okhttp3CertificatePinnerClzCheck = okhttp3CertificatePinnerClz.check.overload('java.lang.String', 'java.util.List');
            okhttp3CertificatePinnerClzCheck.implementation = function(v0, v1) {
                //什么都不做
            };
        } catch (error) {
            console.error("okhttp3.CertificatePinner的check方法可能被混淆了。你可以jadx反编译下还原回来！");
        }
    }else{
        console.error("没找到okhttp3.CertificatePinner类，可能被混淆了。你可以jadx反编译下还原回来！");
    }

    if (classExists("okhttp3.internal.tls.OkHostnameVerifier")) {
        try {
            var OkHostnameVerifierClz = Java.use('okhttp3.internal.tls.OkHostnameVerifier');
            var OkHostnameVerifierClzVerify_5791 = OkHostnameVerifierClz.verify.overload('java.lang.String', 'javax.net.ssl.SSLSession');
            OkHostnameVerifierClzVerify_5791.implementation = function(v0, v1) {
                //强制返回true
                return true;
            };
            var OkHostnameVerifierVerify_8978 = OkHostnameVerifierClz.verify.overload('java.lang.String', 'java.security.cert.X509Certificate');
            OkHostnameVerifierVerify_8978.implementation = function(v0, v1) {
                //强制返回true
                return true;
            };
        } catch (error) {
            console.error("okhttp3.internal.tls.OkHostnameVerifier的verify方法可能被混淆了。你可以jadx反编译下还原回来！");
        }
    }else{
        console.error("没找到okhttp3.internal.tls.OkHostnameVerifier类，可能被混淆了。你可以jadx反编译下还原回来！");
    }

}


function processXutils() {
    if (classExists("org.xutils.http.RequestParams")) {
        //用org.xutils.http.RequestParams的比较少，暂不实现了
    }
}

function processHttpClientAndroidLib() {
    if (classExists("ch.boye.httpclientandroidlib.conn.ssl.AbstractVerifier")) {
        //用ch.boye.httpclientandroidlib.conn.ssl.AbstractVerifier的比较少，暂不实现了
    }
}

Java.perform(function() {
    var Helper = Java.use("gz.justtrustme.Helper");
    var DefaultHttpClientClass = Java.use("org.apache.http.impl.client.DefaultHttpClient");
    //被强奸的构造方法
    var DefaultHttpClientClassRapeConstructor = DefaultHttpClientClass.$init.overload('org.apache.http.conn.ClientConnectionManager', 'org.apache.http.params.HttpParams');
    DefaultHttpClientClassRapeConstructor.implementation = function(v0, v1) {
        //被强奸的构造方法被调用的话，我们替换调ClientConnectionManager参数为我们的
        var returnObj = DefaultHttpClientClassRapeConstructor.call(this, Helper.getSCCM(), v1);
        return returnObj;
    };
    var DefaultHttpClientClassInit_1602 = DefaultHttpClientClass.$init.overload();
    DefaultHttpClientClassInit_1602.implementation = function() {
        //使用DefaultHttpClientClassRapeConstructor强奸它
        var returnObj = DefaultHttpClientClassRapeConstructor.call(this, Helper.getSCCM(), null);
        return returnObj;
    };
    var DefaultHttpClientClassInit_1603 = DefaultHttpClientClass.$init.overload('org.apache.http.params.HttpParams');
    DefaultHttpClientClassInit_1603.implementation = function(v0) {
        //使用DefaultHttpClientClassRapeConstructor强奸它
        var returnObj = DefaultHttpClientClassRapeConstructor.call(this, Helper.getSCCM(), v0);
        return returnObj;
    };
    //以上DefaultHttpClient的三个构造方法逻辑全部被我们替换了
    var X509TrustManagerExtensionsClass = Java.use('android.net.http.X509TrustManagerExtensions');
    var X509TrustManagerExtensionsClassCheckServerTrusted = X509TrustManagerExtensionsClass.checkServerTrusted.overload('[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'java.lang.String');
    X509TrustManagerExtensionsClassCheckServerTrusted.implementation = function(certsArr, v1, v2) {
        return certsArr;
    };
    var NetworkSecurityTrustManagerClass = Java.use('android.security.net.config.NetworkSecurityTrustManager');
    var NetworkSecurityTrustManagerClassCheckPins = NetworkSecurityTrustManagerClass.checkPins.overload('java.util.List');
    NetworkSecurityTrustManagerClassCheckPins.implementation = function(v0) {
        //什么都不做
    };

    //替换trustmanagers参数
    var SSLSocketFactory = Java.use('org.apache.http.conn.ssl.SSLSocketFactory');
    var SSLSocketFactoryRapeConstructor = SSLSocketFactory.$init.overload('java.lang.String', 'java.security.KeyStore', 'java.lang.String', 'java.security.KeyStore', 'java.security.SecureRandom', 'org.apache.http.conn.scheme.HostNameResolver');
    SSLSocketFactoryRapeConstructor.implementation = function(v0, v1, v2, v3, v4, v5) {
        var returnObj = SSLSocketFactoryRapeConstructor.call(this, v0, v1, v2, v3, v4, v5);
        if (Helper.reInitSSLSocketFactory(returnObj, v0, v1, v2, v3, v4, v5)) {
            console.log("替换trustmanagers参数成功!");
        }else{
            console.log("替换trustmanagers参数失败!"); 
        }
        return returnObj;
    };

    var SSLSocketFactoryGetSocketFactoryMethod = SSLSocketFactory.getSocketFactory.overload();
    var SSLSocketFactoryEmptyConstructor = SSLSocketFactory.$init.overload();
    SSLSocketFactoryGetSocketFactoryMethod.implementation = function() {
        //强制用空的构造方法
        return SSLSocketFactoryEmptyConstructor.call(this);
    };

    var SSLSocketFactoryIsSecure = SSLSocketFactory.isSecure.overload('java.net.Socket');
    SSLSocketFactoryIsSecure.implementation = function(v0) {
        //强制返回true
        return true;
    };

    var TrustManagerFactory = Java.use('javax.net.ssl.TrustManagerFactory');
    var TrustManagerFactoryGetTrustManagers = TrustManagerFactory.getTrustManagers.overload();
    TrustManagerFactoryGetTrustManagers.implementation = function() {
        var ret = TrustManagerFactoryGetTrustManagers.call(this);
        //替换getTrustManagers方法逻辑
        return Helper.replaceGetTrustManagers(this, ret);
    };

    var HttpsURLConnection = Java.use("javax.net.ssl.HttpsURLConnection");
    var HttpsURLConnectionSetDefaultHostnameVerifier = HttpsURLConnection.setDefaultHostnameVerifier.overload('javax.net.ssl.HostnameVerifier');
    HttpsURLConnectionSetDefaultHostnameVerifier.implementation = function(v0) {
        //什么都不做
    };

    var HttpsURLConnectionSetHostnameVerifier = HttpsURLConnection.setHostnameVerifier.overload('javax.net.ssl.HostnameVerifier');
    HttpsURLConnectionSetHostnameVerifier.implementation = function(v0) {
        //什么都不做
    };

    var HttpsURLConnectionSetSSLSocketFactory = HttpsURLConnection.setSSLSocketFactory.overload('javax.net.ssl.SSLSocketFactory');
    HttpsURLConnectionSetSSLSocketFactory.implementation = function(v0) {
        //什么都不做
    };

    var SSLContextClz = Java.use('javax.net.ssl.SSLContext');
    var SSLContextClzInit = SSLContextClz.init.overload('[Ljavax.net.ssl.KeyManager;', '[Ljavax.net.ssl.TrustManager;', 'java.security.SecureRandom');
    SSLContextClzInit.implementation = function(v0, v1, v2) {
        //将第二个参数强制替换为我们自己构造的不安全的TrustManagers
        SSLContextClzInit.call(this, v0, Helper.getImSureTrustManagers(), v2);
    };

    var ApplicationClz = Java.use('android.app.Application');
    var ApplicationClzAttach = ApplicationClz.attach.overload('android.content.Context');
    ApplicationClzAttach.implementation = function(context) {
        ApplicationClzAttach.call(this, context);
        //注意justTrustMe使用的是afterHookedMethod，所以我们用frida也必须在原方法call完之后执行我们的代码
        var classLoader = context.getClassLoader();

    };

    if (hasTrustManagerImpl()) {
        var TrustManagerImplClz = Java.use('com.android.org.conscrypt.TrustManagerImpl');
        var TrustManagerImplCheckServerTrusted_8813 = TrustManagerImplClz.checkServerTrusted.overload('[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'java.lang.String');
        TrustManagerImplCheckServerTrusted_8813.implementation = function(v0, v1, v2) {
            return newArrayList();
        };
        var TrustManagerImplCheckServerTrusted_7015 = TrustManagerImplClz.checkServerTrusted.overload('[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'javax.net.ssl.SSLSession');
        TrustManagerImplCheckServerTrusted_7015.implementation = function(v0, v1, v2) {
            return newArrayList();
        };
        var TrustManagerImplCheckTrusted_5587 = TrustManagerImplClz.checkTrusted.overload('[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'java.lang.String', 'boolean');
        TrustManagerImplCheckTrusted_5587.implementation = function(v0, v1, v2, v3) {
            return newArrayList();
        };
        var TrustManagerImplCheckTrusted_9999 = TrustManagerImplClz.checkTrusted.overload('[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'javax.net.ssl.SSLSession', 'javax.net.ssl.SSLParameters', 'boolean');
        TrustManagerImplCheckTrusted_9999.implementation = function(v0, v1, v2, v3, v4) {
            return newArrayList();
        };
    }

    processOkHttp();
    processXutils();
    processHttpClientAndroidLib();
})