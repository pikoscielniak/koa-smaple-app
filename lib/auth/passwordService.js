var bcrypt = require('bcrypt');

function hash(passowrd) {
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(passowrd, salt, function (err, hash) {
                if (err) {
                    return reject(err);
                }
                return resolve(hash);
            });
        });
    });
}

function compare(password, hashedPassword) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(password, hashedPassword, function (err, res) {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}

module.exports.hash = hash;
module.exports.compare = compare;