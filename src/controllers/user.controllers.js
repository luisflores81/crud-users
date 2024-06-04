const catchError = require('../utils/catchError');
const User = require('../models/user')

const getAll = catchError(async (req, res) => {
    const users = await User.findAll();
    return res.json(users);
});

const create = catchError(async (req, res) => {
    const user = req.body
    const createUser = await User.create(user);
    return res.status(201).json(createUser);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
    return res.json(user);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params
    const removeUser = await User.destroy({ where: { id } })
    if (!removeUser) return res.status(404).json({ message: "Usuario no encontrado" })
    return res.sendStatus(204)
})

const update = catchError(async (req, res) =>{
    const { id } = req.params
    const user = req.body
    const userUpdate = await User.update(user, { where: { id }, returning: true })
    if (userUpdate[0] === 0) return res.status(404).json({ message: "Usuario no encontrado" })
    return res.json(userUpdate[1][0])
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
};