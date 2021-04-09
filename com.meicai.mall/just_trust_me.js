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


function getSCCM() {
    return Java.use("gz.justtrustme.Helper").getSCCM();
}

Java.perform(function() {
    if (classExists("org.apache.http.impl.client.DefaultHttpClient")) {
        var DefaultHttpClientClass = Java.use("org.apache.http.impl.client.DefaultHttpClient");
        //被强奸的构造方法
        var DefaultHttpClientClassRapeConstructor = DefaultHttpClientClass.$init.overload('org.apache.http.conn.ClientConnectionManager', 'org.apache.http.params.HttpParams');
        DefaultHttpClientClassRapeConstructor.implementation = function(v0, v1) {
            //被强奸的构造方法被调用的话，我们替换调ClientConnectionManager参数为我们的
            var returnObj = DefaultHttpClientClassRapeConstructor.call(this, getSCCM(), v1);
            return returnObj;
        };
        var org_apache_http_impl_client_DefaultHttpClient_clz_init_1602 = org_apache_http_impl_client_DefaultHttpClient_clz.$init.overload();
        org_apache_http_impl_client_DefaultHttpClient_clz_init_1602.implementation = function() {
            //使用DefaultHttpClientClassRapeConstructor强奸它
            var returnObj = DefaultHttpClientClassRapeConstructor.call(this, getSCCM(), null);
            return returnObj;
        };
        var org_apache_http_impl_client_DefaultHttpClient_clz_init_2794 = org_apache_http_impl_client_DefaultHttpClient_clz.$init.overload('org.apache.http.params.HttpParams');
        org_apache_http_impl_client_DefaultHttpClient_clz_init_2794.implementation = function(v0) {
            //使用DefaultHttpClientClassRapeConstructor强奸它
            var returnObj = DefaultHttpClientClassRapeConstructor.call(this, getSCCM(), v0);
            return returnObj;
        };
        //以上DefaultHttpClient的三个构造方法逻辑全部被我们替换了
    }
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
    
})