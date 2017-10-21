console.log("Here I am in node");

const request = require('request');

    request({
      url:  csProxyUtils.buildProxyUrl(chrisKey, 'https://api.foursquare.com/v2/venues/explore'),
      method: 'GET',
      qs: {
        client_id: 'BHPHWV3IP2GEXGKJAUQWRQBA3MRZJMUCVZHUBSRGWLHWQSAT',
        client_secret: 'RYKN5DV53IUFZ1ZDN15NEMTPQZSL30MHTDI4FDFAWQP0VJYM',
        ll: '40.7243,-74.0018',
        query: 'coffee',
        v: '20170801',
        limit: 1
      }
    }, function(err, res, body) {
      if (err) {
        console.error(err);
      } else {
        console.log(body);
      }
    });