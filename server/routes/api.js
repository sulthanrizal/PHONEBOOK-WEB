var express = require('express');
var router = express.Router();
const models = require('../models')
const path = require("path")
const fs = require('fs');
const { error } = require('console');
const { getPhonebooks, createPhonebook, updatePhonebook, getPhonebook, deletePhonebook } = require('../services/phonebooks');

/* GET home page. */
router.get('/phonebooks', async function (req, res, next) {
    const { page = 1, limit = 10, keyword = '', sort = 'ASC' } = req.query

    try {
        const { count, rows } = await getPhonebooks({ page, limit, keyword, sort })
        const pages = Math.ceil(count / limit)
        res.status(200).json({ phonebooks: rows, page, limit, pages, total: count })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/phonebooks', async function (req, res, next) {
    try {
        const { name, phone } = req.body
        if (!name && !phone) throw Error.message = "name and phone don't be empty"
        const phonebooks = await createPhonebook({ name, phone })
        res.status(201).json(phonebooks)
    } catch (Error) {
        res.status(500).json({ Error })
    }
});

router.put('/phonebooks/:id', async function (req, res, next) {
    try {
        const { name, phone } = req.body
        if (!name && !phone) throw Error.message = "name and phone don't be empty"
        const phonebooks = await updatePhonebook(req.params.id, { name, phone })
        res.status(201).json(phonebooks[1])
    } catch (Error) {
        res.status(500).json({ Error })
    }
});

router.delete('/phonebooks/:id', async function (req, res, next) {
    try {
        const phonebooks = await getPhonebook(req.params.id)
        if (phonebooks.avatar) {
            const filePath = path.join(__dirname, '..', 'public', 'images', phonebooks.avatar);
            try { fs.unlinkSync(filePath) } catch {
                const deletephone = await deletePhonebook(req.params.id)
                if (deletephone) {
                    return res.status(200).json(phonebooks)
                } else throw res.status(500).json(err)
            }
        }
        const deletephone = await deletePhonebook(req.params.id)
        if (deletephone) {
            res.status(200).json(phonebooks)
        } else throw res.status(500).json(err)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.put('/phonebooks/:id/avatar', async function (req, res, next) {
    let avatar;
    let uploadPath;


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }

    avatar = req.files.avatar;
    let fileName = Date.now() + '_' + avatar.name
    uploadPath = path.join(__dirname, '..', 'public', 'images', fileName);

    avatar.mv(uploadPath, async function (err) {
        if (err)
            return res.status(500).send(err);
        try {
            const profile = await models.Phonebooks.findOne({ where: { id: req.params.id } });
            if (profile.avatar) {
                const filePath = path.join(__dirname, '..', 'public', 'images', profile.avatar);
                try { fs.unlinkSync(filePath) } catch {
                    const phonebooks = await models.Phonebooks.update({ avatar: fileName }, {
                        where: {
                            id: req.params.id
                        },
                        returning: true,
                        plain: true
                    });
                    return res.status(201).json(phonebooks[1])
                }
            }
            const phonebooks = await models.Phonebooks.update({ avatar: fileName }, {
                where: {
                    id: req.params.id
                },
                returning: true,
                plain: true
            });
            res.status(201).json(phonebooks[1])
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    });
});

module.exports = router;
