const bcrypt = require('bcrypt')

module.exports = {

  register: async(req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body

    const existingUser = await db.check_user(email)

    if (existingUser[0]){
      return res.status(409).send('There is already an account associated with this email')
    } 

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = await db.register_user([email, hash])

    req.session.user = {
      user_id: newUser[0].user_id,
      email: newUser[0].email
      // name: newUser[0].name,
      // points: newUser[0].points
    }

    res.status(200).send(req.session.user)
  },

  login: async(req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body

    const user = await db.check_user(email)
    if (!user[0]){
      return res.status(404).send('user does not exist')
    } else {
      const authenticated = bcrypt.compareSync(password, user[0].password)
      if (authenticated) {
        req.session.user = {
          user_id: user[0].user_id,
          email: user[0].email,
          password: user[0].password,
          name: user[0].name,
          address: user[0].address,
          points: user[0].points
        }
        
        res.status(200).send(req.session.user)
        console.log(req.session.user)
      } else {
          res.status(403).send('incorrect email or password')
        }
    }
  },

  getUser: (req, res) => {
    if (req && req.session && req.session.user){
      return res.status(200).send(req.session.user)
    }
  },

  editUser: async(req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.params
    const {name, email, password, address} = req.body

    const update = await db.update_user([user_id, name, email, password, address])

    if(update[0]){
      res.status(200).send(update)
    } else {
      res.sendStatus(404)
    }
  },

  
  logout: async(req, res) => {
    req.session.destroy()
    res.sendStatus(200)
    console.log(req.session)
  }


}