'use strict';

var minify = require('html-minifier').minify;

/**
 * Function minify HTML response
 * @method  minifyHTML
 */
function minifyHTML(html) {
  return minify(html, {
    collapseWhitespace: true,
    minifyJS: true,
    minifyCSS: true
 });
}


//Display signin page
exports.signin = function(req, res, next) {

  res.render('signin', { title: 'Register', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display dashboard page
exports.dashboard = function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display monitoring page
exports.monitor = function(req, res, next) {
  res.render('monitor', { title: 'Sensor Monitor', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Displaying metering page
exports.metering = function(req, res, next) {
  res.render('metering', { title: 'Sensor Metering', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Displaying loadbalancig page
exports.loadbalancing = function(req, res, next) {
  // console.log('Load balancing displaying...');
  // var arr = (!!req.headers.url) ? req.headers.url.split(',') : [];
  // var server1 = req.headers._server1;
  // console.log(req.headers);
  // var server2 = req.headers._server2;
  // console.log(server1);
  res.render('loadbalance', { title: 'Load Balancing', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display dashboard page
exports.sensors = function(req, res, next) {
  res.render('instances', { title: 'Dashboard | Instance', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

exports.vsensors = function(req, res, next) {
  res.render('virtual_sensor', { title: 'Dashboard | VSensor', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Create sensor page
exports.create = function(req, res, next) {
  res.render('create_sensor', { title: 'Dashboard | Create sensor', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Create sensor page
exports.create_vsensor = function(req, res, next) {
  res.render('create_vsensor', { title: 'Dashboard | Create vSensor', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display all hosts
exports.hosts = function(req, res, next) {
  res.render('hosts', { title: 'Dashboard | Hosts', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display all hubs
exports.hubs = function(req, res, next) {
  res.render('hubs', { title: 'Dashboard | Hubs', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Account management
exports.account = function(req, res, next) {
  res.render('account', { title: 'Dashboard | Account', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Billings management
exports.billings = function(req, res, next) {
  res.render('billings', { title: 'Dashboard | Billings', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Payment registration
exports.payment = function(req, res, next) {
  res.render('payment', { title: 'Dashboard | Payment', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};
