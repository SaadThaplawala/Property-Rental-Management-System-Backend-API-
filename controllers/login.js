'use strict';

const models = require( '../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // if (!email || !password) {
        //     return res.status(400).json("Email and Password required.");
        // }

        const user = await models.logins.findOne({ where: { email },
            include: {
                model: models.users,
                attributes: ['id', 'name', 'role']
        } });

        if (!user) {
            return res.status(401).json("Incorrect email or password");
        }

        const confirmPassword = await bcrypt.compare(password, user.password);

        if (confirmPassword) {
            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: '12h' });

            delete user.dataValues.password;

            return res.status(200).json({
                status: 'Success',
                data: {
                    user,
                    token
                }
            });
        } else {
            return res.status(401).json("Incorrect email or password");
        }

    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error during fetching users.' });
    }
};

const signUp = async (req, res) => {
  try {
    const { name, role, email, password } = req.body;

    // if (!name || !role || !email || !password || !confirmPassword) {
    //   return res.status(400).json({ message: 'All fields are required.' });
    // }

    const userexists = await models.logins.findOne({where: { email }});
    if (userexists){
      return res.status(400).json({message: 'User with this email already exists.'});
    }

    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: 'Passwords do not match.' });
    // }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newLogin =  await models.logins.create({
        email,
        password: hashedPassword,
      });
    console.log("Login", newLogin);

     const newUser = await models.users.create({
        name,
        role,
        login_id: newLogin.dataValues.id,
      });

      console.log("User", newUser);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        role: newUser.role,
        email: newLogin.email,
        login_id: newUser.login_id,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error during user creation.' });
  }
};


module.exports = { signIn, signUp };