import { Flight } from "../models/flight.js"

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

function show(req, res){
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render("flights/show", {
      title: "Flight Details",
      flight,
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect("/")
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

export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit,
  update,
}