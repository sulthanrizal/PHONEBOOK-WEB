const models = require('../models');
const { Op } = require('sequelize')

const getPhonebooks = ({ page = 1, limit = 60, keyword = '', sort = 'asc' }) => {
    return models.Phonebooks.findAndCountAll({
        where: {
            [Op.or]: [
                { name: { [Op.iLike]: `%${keyword}%` } },
                { phone: { [Op.like]: `%${keyword}%` } }
            ]
        },
        order: [['name', sort]],
        limit,
        offset: (page - 1) * limit
    })
}

const getPhonebook = (id) => models.Phonebooks.findOne({ where: { id } })

const createPhonebook = (input) => models.Phonebooks.create(input, { returning: true, plain: true })

const updatePhonebook = (id, input) => models.Phonebooks.update(input, {
    where: { id }, returning: true, plain: true
})

const deletePhonebook = (id) => models.Phonebooks.destroy({ where: { id } })

    module.exports = { getPhonebooks, getPhonebook, createPhonebook, updatePhonebook, deletePhonebook }