import { Flight } from "../models/flight.js"
import { Meal } from "../models/meals.js"

function index(req, res){
  Flight.find({})
  .then(flights => {
    console.log(flights)
    res.render("flights/index", {
      flights,
      title: "All Flights",
    })
  })
}

function newFlight(req, res){
  res.render("flights/new.ejs", {
    title: "New Flight",
  })
}

function create(req, res){
  console.log(req.body)
  Flight.create(req.body)
  .then(flight => {
    console.log(flight)
    res.redirect("/flights")
    
  })
  .catch(err => {
    console.log(err)
    res.redirect("/flights/new")
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight => {
    res.redirect("/flights")
  })
  .catch(error => {
    console.log(error)
    res.redirect("/flights")
  })
}

function show(req, res) {
  Flight.findById(req.params.flightId)
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {

      res.render('flights/show', {
        flight: flight,
        title: 'Flight Detail',
        meals: meals
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function edit(req, res){
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render("flights/edit", {
      flight,
      title: "Edit Flight"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function update(req, res){
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function createTicket(req, res){
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addMeal(req, res){
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.meals.push(req.body.mealId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit,
  update,
  createTicket,
  addMeal,
}