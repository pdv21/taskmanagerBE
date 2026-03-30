const service = require('../services/task.service');

const createTask = async(req, res) => {
    try{
        const userId = req.user.userId;
        const {title, description, start_date, end_date, status_id, category_id} = req.body;
        const taskId = await service.createNewTask(userId, title, start_date, end_date, description, status_id, category_id);
        res.status(201).json({ message: 'Task created successfully', taskId });
    } catch(err){
        res.status(500).json({ message: err.message });
    }
}

const getTaskUser = async(req, res) => {
    try{
        const userId = req.user.userId;
        const tasks = await service.getTaskByUserId(userId);
        res.json({ data: tasks });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

const getTaskByStatus = async(req, res) => {
    try {
        const statusId = req.params.statusId;
        const userId = req.user.userId;
        
        console.log('statusId:', statusId);
        console.log('userId:', userId);
        const tasks = await service.getTaskByStatusId(userId, statusId);
        res.json({ data: tasks });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

const getTaskByCategory = async(req, res) => {
    try{
        const userId = req.user.userId;
        const categoryId = req.params.categoryId;
        const tasks = await service.getTaskByCategoryId(userId, categoryId);
        res.json({ data: tasks });
    } catch(err){
        res.status(500).json({ message: err.message });
    }
}

const getTaskByStartD = async(req, res) => {
    try{
        const userId = req.user.userId;
        const startDate = req.params.startDate;
        const tasks = await service.getTaskByStartDate(userId, startDate);
        res.json({ data: tasks });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

const getTaskByEndD = async(req, res) => {
    try{
        const userId = req.user.userId;
        const endDate = req.params.endDate;
        const tasks = await service.getTaskByEndDate(userId, endDate);
        res.json({ data: tasks });
    }catch(err){
        res.status(500).json({ message: err.message });
    }   
}

const deleteTask = async(req, res) => {
    try{
        const userId = req.user.userId;
        const taskId = req.params.taskId;
        const success = await service.deleteTask(taskId, userId);
        if(success){
            res.json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

module.exports ={
    getTaskUser,
    getTaskByStatus,
    getTaskByCategory,
    getTaskByStartD,
    getTaskByEndD,
    createTask,
    deleteTask
}