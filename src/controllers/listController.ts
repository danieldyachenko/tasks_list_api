import tasksModel from '../models/taskModel'
import { Controller, Task } from '../types/list';

export default class ListController {

    getList: Controller = async (req, res) => {

        const taskObj = new tasksModel()
        console.log(taskObj)

        const tasks = await tasksModel.find()
        res.send(tasks)
    }

    getTask: Controller = (req, res) => {
        tasksModel.findOne({_id: req.params.id}, (err, task) => {
            if (err) console.log(err)
            res.send(task);
        })
    }

    addTask: Controller = async (req, res) => {
        const tasks = new tasksModel({
            text: req.body.text,
            isPerformed: req.body.isPerformed,
            isTagged: req.body.isTagged,
            date: req.body.date
        })

        await tasks.save(err => {
            if (err) console.log(err);
            res.send(tasks)
        })
    }
    
    deleteTask: Controller = (req, res) => {
        const id = req.params.id
        tasksModel.findByIdAndDelete(id, (err, tasks) => {
            if (err) console.log(err)
            res.send(tasks)
        })
    }
    
    updateTask: Controller = (req, res) => {
        if (!req.body) return res.sendStatus(400)
        const newTask: Task = {
            text: req.body.text,
            isPerformed: req.body.isPerformed,
            isTagged: req.body.isTagged,
            date: req.body.date
        }
        tasksModel.findByIdAndUpdate(req.body.id, newTask, {new: true}, (err, task) => {
            if (err) console.log(err);
            res.send(task);
        })
    }
}

