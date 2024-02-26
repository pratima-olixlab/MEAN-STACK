const express = require("express");
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var {Employee} = require('../models/employee');

router.get('/', (req, res) => {
    Employee.find()
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            console.log('Error in Retrieving Employees: ' + JSON.stringify(err, undefined, 2));
            res.status(500).send('Internal Server Error');
        });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id: ${req.params.id}`);

    Employee.findById(req.params.id).then( (doc) =>{
      res.send(doc)
    }).catch(err => {
        console.log('Error in Retrieving Employee'  + JSON.stringify(err, undefined, 2));
    })
});

router.post('/',(req,res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    emp.save()
    .then(docs => {
        res.send(docs);
    })
    .catch(err => {
        console.log('Error in Retrieving Employees: ' + JSON.stringify(err, undefined, 2));
        res.status(500).send('Internal Server Error');
    })
});

router.put('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id: ${req.params.id}`);

    var emp =({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });

    Employee.findByIdAndUpdate(req.params.id, { $set: emp },{ new: true})
    .then(docs => {
       res.send(docs);
    })
    .catch(err=>{
        console.log('Error in Retrieving Employee'  + JSON.stringify(err, undefined, 2));
    })
})

router.delete('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

    Employee.findByIdAndDelete(req.params.id)
    .then(docs => {
       res.send(docs);
    })
    .catch(err=>{
        console.log('Error in Retrieving Employee'  + JSON.stringify(err, undefined, 2));
    })
})

module.exports = router;