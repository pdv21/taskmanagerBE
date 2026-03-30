const service = require('../services/category.service');

const getAllCategories = async(req, res) => {
    try{
        const categories = await service.getAllCategories();    
        res.json({ data: categories });
    } catch(err){
        res.status(500).json({ message: err.message });
    }   
}

module.exports = {
    getAllCategories
}