const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Citizen = require('../models/citizen');

async function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

router.post('/', async (req, res, next) => {
    if (Object.keys(req.body.at).length == 8) {
        for (let i = 0; i < 8; i++) {
            if (isNumeric(req.body.at[0]) || isNumeric(req.body.at[1])) {
                return res.status(400).json({
                    message: "THe First Two Characters Of AT Must Be Types Of String"
                });
            }
            if (i > 1 && !isNumeric(req.body.at[i])) {
                return res.status(400).json({
                    message: "THe last Six Characters Of AT Must Be Types Of Integer"
                });
            }
        }
    } else {
        return res.status(400).json({
            message: "AT length must be 8!"
        });
    }

    if (req.body.at)

        if (Object.keys(req.body.name).length == 0) {
            return res.status(400).json({
                message: "Please Insert Name"
            });
        }

    if (Object.keys(req.body.surname).length == 0) {
        return res.status(400).json({
            message: "Please Insert Surname"
        });
    }

    if (Object.keys(req.body.sex).length == 0) {
        return res.status(400).json({
            message: "Please Insert Sex"
        });
    }

    if (Object.keys(req.body.birthYear).length == 0) {
        return res.status(400).json({
            message: "Please Insert Birth Year"
        });
    }
    if (req.body.afm != undefined) {
        if (Object.keys(req.body.afm).length != 9 || !isNumeric(req.body.afm)) {
            return res.status(400).json({
                message: "Please Insert Right AFM " + req.body.afm
            });
        }
    }
    if (req.body.amka != undefined) {
        if (Object.keys(req.body.amka).length != 11 || !isNumeric(req.body.amka)) {
            return res.status(400).json({
                message: "Please Insert Right AMKA " + req.body.amka
            });
        }
    }

    const user = await Citizen.exists({
        at: req.body.at
    });
    if (user) {
        return res.status(400).json({
            message: "Citizen already exists!"
        });
    } else {
        const citizen = new Citizen({
            _id: new mongoose.Types.ObjectId(),
            at: req.body.at,
            name: req.body.name,
            surname: req.body.surname,
            sex: req.body.sex,
            birthYear: req.body.birthYear,
            afm: req.body.afm,
            amka: req.body.amka,
            location: req.body.location
        });
        citizen
            .save()
            .then(result => {
                res.status(201).json({
                    message: 'Created citizen successfully',
                    createdCitizen: {
                        at: result.at,
                        name: result.name,
                        surname: result.surname,
                        sex: result.sex,
                        birthYear: result.birthYear,
                        afm: result.afm,
                        amka: result.amka,
                        location: result.location,
                        _id: result._id
                        // request: {
                        //     type: 'GET',
                        //     url: 'http://localhost:3000/citizens/' + result._id
                        // }
                    }
                });
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
});

router.patch('/:at', async (req, res, next) => {
    const at = req.params.at;
    const update = {};
    // for (const ops of req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }

    const user = await Citizen.exists({
        at: req.params.at
    });

    if (!user) {
        return res.status(400).json({
            message: "Citizen Not Found!"
        });
    }

    if (req.body.amka != undefined) {
        if (Object.keys(req.body.amka).length != 11 || !isNumeric(req.body.amka)) {
            return res.status(400).json({
                message: "Please Insert Right AMKA " + req.body.amka
            });
        }
        update.amka = req.body.amka;
    }

    if (req.body.amka != undefined) {
        update.location = req.body.location;
    }

    if (req.body.afm != undefined) {
        if (Object.keys(req.body.afm).length != 9 || !isNumeric(req.body.afm)) {
            return res.status(400).json({
                message: "Please Insert Right AFM " + req.body.afm
            });
        } else {
            Citizen.findOne({
                at: at
            }).then(result => {
                if (result.afm != null) {
                    return res.status(400).json({
                        message: "AFM Already Exists!"
                    });
                } else {
                    update.afm = req.body.afm;
                    Citizen.findOneAndUpdate({
                            at: at
                        }, {
                            $set: update
                            // name: req.body.name
                        }).exec()
                        .then(final => {
                            res.status(200).json({
                                message: 'Citizen Updated',
                                request: {
                                    type: 'GET',
                                    url: 'http://localhost:3000/citizens'
                                }
                            });
                        });
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });;
        }
    }


    // Citizen.update({
    //         at: at
    //     }, {
    //         $set: updateOps
    //     }).exec()
    //     .then(result => {
    //         res.status(200).json({
    //             message: 'Citizen Updated',
    //             result
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({
    //             error: err
    //         });
    //     });
});

router.delete('/:at', async (req, res, next) => {
    const at = req.params.at;

    const user = await Citizen.exists({
        at: at
    });
    if (!user) {
        return res.status(404).json({
            message: "Citizen Not Found!"
        });
    } else {
        Citizen.find({
                at: at
            }).deleteOne()
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Citizen Removed!',
                    // request: {
                    //     type: 'POST',
                    //     url: 'http://localhost:3000/',
                    //     body: {
                    //         name: 'String',
                    //         price: 'Number'
                    //     }
                    // }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
});

router.get('/', async (req, res, next) => {
    Citizen.find()
        .select('name surname at afm amka location _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                citizens: docs.map(doc => {
                    return {
                        name: doc.name,
                        surname: doc.surname,
                        at: doc.at,
                        afm: doc.afm,
                        amka: doc.amka,
                        location: doc.location,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/citizens/' + doc._id
                        }
                    }
                })
            }
            // if (docs.length >= 0) {
            res.status(200).json(response);
            // } else {
            //     res.status(404).json({
            //         message: 'No entries found'
            //     });
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:surname', async (req, res, next) => {
    const update = {};
    update.surname = req.params.surname;
    Citizen.find(update)
        .exec()
        .then(docs => {
            if (docs) {
                const response = {
                    count: docs.length,
                    citizens: docs.map(doc => {
                        return {
                            name: doc.name,
                            surname: doc.surname,
                            at: doc.at,
                            afm: doc.afm,
                            amka: doc.amka,
                            location: doc.location,
                            _id: doc._id,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/citizens/' + doc._id
                            }
                        }
                    })
                }
            } else {
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                });
            }
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});




module.exports = router;