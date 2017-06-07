
/*
 * GET home page.
 */

exports.chart = function(req, res){
  res.render('chart/chart', { title: 'E.S.N. Charts' });
};