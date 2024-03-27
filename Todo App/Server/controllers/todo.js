const taskModel = require("../models/productModel");
const mongoose = require("mongoose");

const createTask = async (req, res) => {
  try {
    const task = await taskModel.create(req.body);
    res.send(task);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const listTask = async (req, res) => {
  try {
    const taskList = await taskModel.find({});
    res.status(200).json(taskList);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const listTaskId = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findById(id);
    res.send(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findByIdAndUpdate(id, req.body);
    if (!task) {
      console.log(task);
      return res
        .status(404)
        .json({ message: `cannot find the task with ID ${id}` });
    }
    const updatedProduct = await taskModel.findById(id);
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findByIdAndDelete(id, req.body);

    if (!task) {
      console.log(task);
      return res
        .status(404)
        .json({ message: `cannot find the task with ID ${id}` });
    }
    res.status(200).json(task);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  listTask,
  createTask,
  listTaskId,
  updateTask,
  deleteTask,
};
