require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const EmployeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  gender: String,
  address1: String,
  address2: String,
  city: String,
  postal: String,
  country: String,
  email: String,
  mobile: String,
  active: Boolean,
});

const Employee = mongoose.model('Employee', EmployeeSchema);

app.get('/employees', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

app.post('/employees', async (req, res) => {
  const newEmployee = new Employee(req.body);
  await newEmployee.save();
  res.status(201).json(newEmployee);
});

app.put('/employees/:id', async (req, res) => {
  const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedEmployee);
});

app.delete('/employees/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
