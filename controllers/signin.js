const handleSignin = (req,res,knex,bcrypt) => {
    const { email,password} = req.body
    if(!email || !password){
        return res.status(400).json("Incorrect form submission")
    }
    knex('login').select('email','hash')
        .where({
            email: req.body.email
        })
        .then(data =>{
            const isValid = bcrypt.compareSync(password,data[0].hash)
            if(isValid){
               return  knex.select("*").from('users')
                    .where({
                        email : email
                    })
                    .then(user =>{
                        res.json(user[0])
                    })
                    .catch( err => res.status(400).json('unable to get user'))
            }else{
                
                    res.status(400).json('Wrong credentials1')
    
            }

        })
        .catch(err =>{
            res.status(400).json('Wrong credentials')
        })
}

module.exports = {
    handleSignin: handleSignin
}