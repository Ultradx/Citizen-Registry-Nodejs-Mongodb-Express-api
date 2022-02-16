const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Citizen = require('../models/citizen');

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

router.get('/find_citizen/:id', async (req, res, next) => {
    try {
        const find_citizen = await Citizen.findById(req.params.id);
        res.render('citizens/update_citizen', {
            citizen: find_citizen
        });

    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.patch('/find_citizen/:id', async (req, res, next) => {
    try {
        const find_citizen = await Citizen.findById(req.params.id);
        const update = {};

        if (req.body.amka != '') {
            if (Object.keys(req.body.amka).length != 11 || !isNumeric(req.body.amka)) {
                console.log("Please Insert Right AMKA ");
            } else {
                console.log("Nice AMKA ");
                update.amka = req.body.amka;
            }
        }

        if (req.body.location != '') {
            update.location = req.body.location;
        }

        if (find_citizen.afm == undefined) {
            if (req.body.afm != '') {
                if (Object.keys(req.body.afm).length != 9 || !isNumeric(req.body.afm)) {
                    console.log("Please Insert Right AFM ");
                } else {
                    const user_afm = await Citizen.exists({
                        afm: req.body.afm
                    });
                    if (user_afm) {
                        console.log("This AFM Is Already Used From Another Citizen!");
                    } else {
                        update.afm = req.body.afm;
                    }

                }
            }
        }

        console.log(Object.keys(update).length);
        if (Object.keys(update).length != undefined) {
            await Citizen.updateOne({
                _id: find_citizen._id
            }, {
                $set: update,
                $currentDate: {
                    lastModified: true
                }
            });
            res.redirect('/');
        } else {
            res.redirect('/');
        }

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new_citizen', async (req, res, next) => {
    try {
        res.render('citizens/new_citizen');

    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.post('/new_citizen', async (req, res, next) => {
    let checker = 0;
    try {
        console.log("Im Creating Citizen");
        if (Object.keys(req.body.at).length == 8) {
            for (let i = 0; i < 8; i++) {
                if (i <= 1 && isNumeric(req.body.at[i])) {
                    console.log(req.body.at[i]);
                    checker = 1;
                    console.log("THe First Two Characters Of AT Must Be Types Of String");
                }
                if (i > 1 && !isNumeric(req.body.at[i])) {
                    checker = 1;
                    console.log("THe last Six Characters Of AT Must Be Types Of Integer");
                }
            }

        } else {
            console.log("AT length must be 8!");
        }

        if (Object.keys(req.body.firstname).length == 0) {
            checker = 1;
            console.log("Please Insert Name");
        }

        if (Object.keys(req.body.lastname).length == 0) {
            checker = 1;
            console.log("Please Insert Surname");
        }

        if (Object.keys(req.body.gender).length == 0) {
            checker = 1;
            console.log("Please Insert Sex");
        }

        if (Object.keys(req.body.birth_date).length == 0) {
            checker = 1;
            console.log("Please Insert Birth Year");
        }

        if (req.body.afm != '') {
            if (Object.keys(req.body.afm).length != 9 || !isNumeric(req.body.afm)) {
                checker = 1;
                console.log("Please Insert Right AFM ");
            }
        }
        if (req.body.amka != '') {
            if (Object.keys(req.body.amka).length != 11 || !isNumeric(req.body.amka)) {
                checker = 1;
                console.log("Please Insert Right AMKA ");
            }
        }

        const user_at = await Citizen.exists({
            at: req.body.at
        });
        const user_afm = await Citizen.exists({
            afm: req.body.afm
        });
        console.log(user_afm);

        if (user_at) {
            checker = 1;
            console.log("Citizen already exists With That AT!");
        }
        if (user_afm != null && req.body.afm != '') {
            checker = 1;
            console.log("Citizen already exists With That AFM!");
        }
        if (checker == 0) {
            // console.log(checker);
            const citizen = new Citizen({
                _id: new mongoose.Types.ObjectId(),
                at: req.body.at,
                name: req.body.firstname,
                surname: req.body.lastname,
                sex: req.body.gender,
                birthYear: req.body.birth_date,
                afm: req.body.afm,
                amka: req.body.amka,
                location: req.body.location
            });
            await citizen.save()
            res.redirect('/');
        }

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/find_citizen', async (req, res, next) => {
    let query = Citizen.find();
    let test = {};
    if (req.query.at != null && req.query.at != '') {
        query = query.regex('at', new RegExp(req.query.at, 'i'))
        const atReg = new RegExp(["^", req.query.at, "$"].join(""), "i");
        test['at'] = atReg;
    }
    if (req.query.name != null && req.query.name != '') {
        query = query.regex('name', new RegExp(req.query.name, 'i'))
        const atReg = new RegExp(["^", req.query.name, "$"].join(""), "i");
        test['name'] = atReg;
    }
    if (req.query.surname != null && req.query.surname != '') {
        query = query.regex('surname', new RegExp(req.query.surname, 'i'))
        const atReg = new RegExp(["^", req.query.surname, "$"].join(""), "i");
        test['surname'] = atReg;
    }
    if (req.query.afm != null && req.query.afm != '') {
        query = query.regex('afm', new RegExp(req.query.afm, 'i'))
        test['afm'] = req.query.afm;
    }
    if (req.query.amka != null && req.query.amka != '') {
        query = query.regex('amka', new RegExp(req.query.amka, 'i'))
        test['amka'] = req.query.amka;
    }
    if (req.query.location != null && req.query.location != '') {
        query = query.regex('location', new RegExp(req.query.location, 'i'))
        var atReg = new RegExp(["^", req.query.location, "$"].join(""), "i");
        test['location'] = atReg;
    }
    try {
        let citizens;
        console.log(test);
        // const citizens = await query.exec()
        citizens = await Citizen.find(test)

        // console.log(query);
        res.render('citizens/find_citizen', {
            citizens: citizens,
            searchOptions: req.query
        })

    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.get('/delete_citizen', async (req, res, next) => {
    let query = Citizen.find();
    let test = {};
    if (req.query.afm != null && req.query.afm != '') {
        query = query.regex('afm', new RegExp(req.query.afm, 'i'))
        test['afm'] = req.query.afm;
    }
    try {
        let citizens;
        console.log(test);
        // const citizens = await query.exec()
        citizens = await Citizen.find(test)

        // console.log(query);
        res.render('citizens/delete_citizen', {
            citizens: citizens,
            searchOptions: req.query
        })

    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

// Delete Book Page
router.delete('/delete_citizen/:id', async (req, res) => {
    let citizen;
    try {
        citizen = await Citizen.findById(req.params.id)
        console.log("Im Going To Delete Him");
        console.log(citizen);
        await citizen.remove()
        res.redirect('/')
    } catch {
        res.redirect('/')
    }
})




module.exports = router;