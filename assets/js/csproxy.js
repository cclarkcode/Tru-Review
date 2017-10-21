var csProxyUtils = (function () {
    function buildProxyUrl(apiKey, requestUrl) {
        var hostUri = 'https://www.chrisstead.com/proxy/';
        return hostUri + '?apikey=' + apiKey + '&requesturl=' + requestUrl;
    }
    
    function buildJsonpProxyUrl(apiKey, requestUrl) {
        var hostUri = 'https://www.chrisstead.com/proxy/jsonp.php';
        return hostUri + '?apikey=' + apiKey + '&requesturl=' + requestUrl;
    }
    
    return {
        buildProxyUrl: buildProxyUrl,
        buildJsonpProxyUrl: buildJsonpProxyUrl
    }
})();