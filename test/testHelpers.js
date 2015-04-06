var db = require('../lib/db');

function registerUser(request, user) {
    return new Promise(function (resolve, reject) {
        request.post('/register')
            .send(user)
            .end(function (err, res) {
                if (err) return reject(err);
                resolve(res.body.token);
            });
    });
}

function * clearEnvironment() {
    yield db.users.remove({});
    yield db.projects.remove({});
    yield db.votes.remove({});
}

module.exports.registerUser = registerUser;
module.exports.clearEnvironment = clearEnvironment;