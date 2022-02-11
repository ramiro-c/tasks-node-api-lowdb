import { getConnection } from "../database.js";
import { v4 as uuid } from "uuid";

export const getTasks = (req, res) => {
  let { data: { tasks } } = getConnection();
  res.send(tasks);
}

export const getTask = (req, res) => {
  let { data: { tasks } } = getConnection();
  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {
    res.send({});
    return;
  }

  res.send(task);
}

export const createTask = async (req, res) => {
  const newTask = {
    id: uuid(),
    title: req.body.title,
    description: req.body.description,
    done: req.body.done
  };

  let { data: { tasks } } = getConnection();
  tasks.push(newTask);

  await getConnection().write();
  res.send(newTask);
}

export const updateTask = async (req, res) => {
  let { data } = getConnection();

  let updatedTask = data.tasks.find(t => t.id === req.params.id);

  if (!updatedTask) {
    res.send({});
    return;
  }

  let index = data.tasks.indexOf(updatedTask);

  data.tasks[index] = { ...updatedTask, ...req.body };

  await getConnection().write();
  res.send(data.tasks[index]);
}

export const deleteTask = async (req, res) => {
  let { data } = getConnection();

  const deletedTask = data.tasks.find(t => t.id === req.params.id);

  if (!deletedTask) {
    res.send({});
    return;
  }

  data.tasks = data.tasks.filter(t => t.id !== deletedTask.id);

  await getConnection().write();
  res.send(deletedTask);
}