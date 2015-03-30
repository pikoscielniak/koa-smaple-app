var monk = require('monk');

var db = monk(process.env.DB_CONNECTION)
var wrap = require('co-monk');

module.exports.projects = wrap(db.get('projects'));
module.exports.votes = wrap(db.get('votes'));
module.exports.users = wrap(db.get('users'));
