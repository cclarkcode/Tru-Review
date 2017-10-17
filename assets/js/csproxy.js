var csProxyUtils = (function () {
    function buildProxyUrl(apiKey, requestUrl) {
        return 'http://www.chrisstead.com/proxy/?apikey=' + apiKey + '&requesturl=' + requestUrl;
    }
    
    return {
        buildProxyUrl: buildProxyUrl
    }
})();