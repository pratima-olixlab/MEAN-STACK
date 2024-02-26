const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = (req,res,next) => {
    console.log('Inside register function');
    var user= new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save().then((docs) => {
        res.send(docs)
    }).catch((err)=> {
        console.log(err);
    })
}

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;
    // User.findOne(email,password).then((docs) =>{
    //     res.status(500).send(docs);
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // res.status(200).json({ message: 'Login successful' });

    User.findOne({ email: email }).exec()
        .then((user) => {
            if (!user || !user.verifyPassword(password)) {
                return res.status(401).send('Invalid email or password');
            }

            // Successful login
            res.status(200).json({ message: 'Login successful' });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
};
