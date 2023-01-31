const User = require('../models/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    const {email, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        const user = new User({
            email,
            password: hash
        });
        user.save().then(() => {
            res.status(201).json({
                message: 'User added successfully.'
            })
        }).catch((err) => {
            res.status(500).json({
                error: err
            })
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })
}

exports.login = (req, res) => {
    const token = jwt.sign({ userId: user._id },'RANDOM_TOKEN_SECRET',{ expiresIn: '24h' });
    User.findOne({ email: req.body.email }).then(
      (user) => {
        if (!user) {
          return res.status(401).json({
            error: new Error('User not found!')
          });
        }
        bcrypt.compare(req.body.password, user.password).then(
          (valid) => {
            if (!valid) {
              return res.status(401).json({
                error: new Error('Incorrect password!')
              });
            }

            res.status(200).json({
              userId: user._id,
              token: token
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
  }

