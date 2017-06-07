
/*
 * GET home page.
 */

exports.monitor = function(req, res){
  res.render('monitor/monitor', { title: 'E.S.N. Table' });
};