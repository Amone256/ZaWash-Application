const express = require('express');
const washer = require('../models/washer')
const vehicle = require('../models/vehicle')
const manager = require('../models/manager')
const expense = require('../models/expense')
const router = express.Router();


//route for washer
router.get('/washer', (req, res)=> {
    res.render('register_washer', {title: "Register car washer"})
});

router.post("/washer", async (req, res) => {
    try {
        const washer = new Washer(req.body);
        await washer.save()
        res.redirect('washer?alert=success')
    }
    catch (err) {
        res.status(400).render('register_washer', { title: "Register Washer", alert: 'error' })
        console.log(err)
    }
})


// route for vehicle
router.get('/vehicle', async (req, res) =>{
    let washerlist = await washer.find();
    res.render('register_vehicle', { 
        washers: washerlist, 
        title: "register vehicle", alert:req.query.alert})
})

router.post("/vehicle", async (req, res) => {
    try{
        let data = req.body
        let timedatearrival = date.parse(data.doa + 'T' + date.toa)
        data.datetimeArrival = datetimeArrival


    // package price and washer fee
    let packageDetails = washPackages[data.package]

        data.packagePrice = packageDetails['packagePrice']
        data.washerFee = packageDetails['washerFee']

        const vehicle = new Vehicle(data);
        await vehicle.save()
        res.redirect('vehicle?alert=success')
    }
    catch (err) {
        res.status(400).render('register_vehicle', { title: "Register Vehicle", alert: 'error' })
        console.log(err)
    }
})
//route for expenses
router.get("/expenses", (req, res) => {
    res.render('register_expenses', { title: "Register Expenses", alert: req.query.alert })
})

router.post("/expenses", async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save()
        res.redirect('expenses?alert=success')
    }
    catch (err) {
        res.status(400).render('register_expenses', { title: "Register Expenses", alert: 'error' })
        console.log(err)
    }
})
// deleting a washer and reset
router.post('/delete-washer', async (req, res) => {
    try {
        await Washer.deleteOne({ _id: req.body.id })
        res.redirect('back')
    } catch (err) {
        res.status(400).send("Unable to delete item in the database");
    }
})
module.exports = router;