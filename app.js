const express = require('express');

const userService = require('./services/user.service');
const userValidator = require('./validators/user.validator');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json('Hello world')
})

app.get('/users', async (req, res) => {

    const users = await userService.getUsers()

    res.json(users)
})

app.post('/users', async (req, res) => {
    const user = req.body

    const validate = userValidator.validate(user)

    if (validate.error) {
        res.status(401).json(validate.error.message)
    } else {
        const users = await userService.createUser(user);

        res.status(201).json(users)
    }


})

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const user = userService.getUserById(userId);

    if (!user) {
        return res.status(422).json('User with such id does not exist')
    }

    res.json(user)

})

app.put('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const data = req.body

    const user = userService.getUserById(userId);

    if (!user) {
        return res.status(422).json('User with such id does not exist')
    }

    const validate = userValidator.validate(data)

    if (validate.error) {
        res.status(400).json(validate.error.message)
    } else {
        const newUser = await userService.updateUserById(userId, data);
        res.json(newUser);
    }


})

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const user = userService.getUserById(userId);

    if (!user) {
        return res.status(422).json('User with such id does not exist')
    }

    await userService.deleteUserById(userId);
    res.sendStatus(204)

})

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is listened on PORT ${PORT}`)
})