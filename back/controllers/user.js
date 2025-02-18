const UsersDb = require('../models').User;

const controller = {
  add: async (req, res) => {
    //console.log(req.body);
    const { email, password, name, role } = req.body;
    let errors = [];
    if (!name) {
      errors.push('Name field must be completed!');
    }
    if (!email) {
      errors.push('Email must be completed!');
    }
    if (!password) {
      errors.push('Password must be completed!');
    }
    if (
      !email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      errors.push('Invalid email format!');
    }
    try {
      const findUser = await UsersDb.findOne({
        where: {
          email: email,
        },
      });
      if (findUser) {
        errors.push('Email is already used by somebody else!');
      }
      if (!['administrator', 'facility_owner', 'client'].includes(role)) {
        errors.push('Invalid role specified!');
      }
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      } else {
        const user = {
          email,
          password,
          name,
          role,
        };
        const newUser = await UsersDb.create(user);
        res.status(201).send(newUser);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Error upon insertion of user!' });
    }
  },

  getAll: async (req, res) => {
    await UsersDb.findAll()
      .then((users) => {
        if (users.length !== 0) {
          res.status(200).send(users);
        } else {
          res.status(404).send({ message: 'No users found!' });
        }
      })
      .catch(() => {
        res.status(500).send({ message: 'Error upon getting users!' });
      });
  },

  getById: async (req, res) => {
    try {
       
      const user = await UsersDb.findByPk(req.params.id);
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: 'User not found!' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server error!' });
    }
  },

  getByEmail: async (req, res) => {
    try {
        const userEmail = req.query.email;
        console.log(userEmail);
        if(!userEmail){
            res.status(400).send({message:'Email query parameter is missing'});
        }

      const user = await UsersDb.findOne({
        where: {
          email: userEmail,
        },
      });
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: `User ${userEmail} not found!` });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server error!' });
    }
  },

  verificareLogareUtilizator: async (req, res) => {
    const { usernameF, parolaF } = req.params;

    try {
      const utilizator = await UsersDb.findOne({
        where: {
          email: usernameF,
          password: parolaF,
        },
      });

      if (!utilizator) {
        return res.status(200).send('UserInexistent');
      }
      return res.status(200).send(utilizator);
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: 'Eroare server la verificarea logarii utilizatorului!',
      });
    }
  },
};

module.exports = controller;
