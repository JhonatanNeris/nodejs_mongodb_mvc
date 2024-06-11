const User = require('../models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require("dotenv").config();


module.exports = class UserController {

    static signin(req, res) {
        res.render('users/signIn')
        // modificar função
    }
    static signup(req, res) {
        res.render('users/signUp')
        // modificar função
    }

    static signout(req, res) {
        res.clearCookie('token');
        res.redirect('/users/signin');
    }

    static async signupPost(req, res) {

        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword

        // validations
        if (!name) {
            return res.status(422).json({ msg: "O nome é obrigatório!" });
        }

        if (!email) {
            return res.status(422).json({ msg: "O email é obrigatório!" });
        }

        if (!password) {
            return res.status(422).json({ msg: "A senha é obrigatória!" });
        }

        if (password != confirmPassword) {
            return res
                .status(422)
                .json({ msg: "A senha e a confirmação precisam ser iguais!" });
        }

        // check if user exists
        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
        }

        // create password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: passwordHash })

        // await product.save()
        try {
            await user.save();

            res.redirect('/products')
        } catch (error) {
            res.status(500).json({ msg: error });
        }


    }

    static async signinPost(req, res) {
        const { email, password } = req.body;

        // validations
        if (!email) {
            return res.status(422).json({ msg: "O email é obrigatório!" });
        }

        if (!password) {
            return res.status(422).json({ msg: "A senha é obrigatória!" });
        }

        // check if user exists
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        // check if password match
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(422).json({ msg: "Senha inválida" });
        }

        try {
            const secret = process.env.SECRET;

            const token = jwt.sign(
                {
                    id: user._id,
                },
                secret,
                { expiresIn: '15m' }  // Token expira em 1 hora
            );

            res.cookie("token", token, {
                httpOnly:true,
                //secure: true,
                //maxAge: 1000000,
                //signed: true,
            
            });

            res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
        } catch (error) {
            res.status(500).json({ msg: error });
        }
    }


}
