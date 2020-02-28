const express = require('express');

const Plants = require('./plantsHelper.js');

const router = express.Router();

// get all plants 
    // for now have it set up as it's own route, not attached to a user id. to have it work and have seed data.
router.get('/all', (req, res) => {
    Plants.find()
        .then(allPlants => {
            res.status(200).json(allPlants);
        })
        .catch(error => {
            console.log('error', error);
            res.status(500).json({ message: 'Plants could not be retrieved. '})
        })
});

// new plant 
router.post('/new', (req, res) => {
    const plant = req.body; // raw JSN species_name, nickname
    console.log(plant);
    Plants.add(plant)
    .then(plant => {
        if(plant) {
            res.status(201).json(plant);
        } else {
            res.status(400).json({ message: ' Please provide a speices name and nickname for a new plant.'
        })
        }
    }) 
    .catch(error => {
        console.log('error', error);
        res.status(500).json({ message: ' There was an error while saving your new plant to the database.'}); 
    });
});

// //editplant
router.put('/edit/:id', (req, res) => {
    const changes = req.body;
    const {id} = req.params; 
    if(!changes.species_name && !changes.nickname) {
        res.status(400).json({ message: ' You must specify the species_name and nickname.'})
    } else {
        Plants.update(id, changes) 
            .then(updated => {
                if (updated === null) {
                    res.status(400).json({ message: ` A plant with id ${id} was not found.`})
                } else {
                    res.status(200).json(updated);
                }
            })
            .catch(error => {
                console.log('error', error);
                res.status(500).json({ message: ' We were unable to update species_name or nickname.'})
            })
    }
}); 


// delete a plant 
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log(id); 
    
    Plants.remove(id)
        .then(deletedPlant => {
            if (!id) {
                res.status(400).json({ message: `The plant with id #${id} was not found.` });
            } else {
                res.status(200).json({ deletedPlant });
            }
        })
        .catch(error => {
            console.log('error', error);
            res.status(500).json({ message: ' The plant could not be removed.'})
        })
});

module.exports = router; 