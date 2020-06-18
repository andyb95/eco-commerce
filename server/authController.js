const bcrypt = require('bcrypt')

module.exports = {

  register: async(req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body

    const existingUser = await db.check_user(email)

    if (existingUser[0]){
      return res.status(409).send('User already exists')
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




}