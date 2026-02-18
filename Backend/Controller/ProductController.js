const { request } = require('express');
const product = require('../Modal/Prductmodal');
const { upload } = require('../Storage/Storage')


const handleaddproduct = async (req, res) => {
    try {
        const data = req.body
        if (Object.keys(data).length == 0) return res.status(400).json({ error: "All fields are required" });

        const range = JSON.parse(data.range)
        let img = []
        if (req.files && req.files.length > 0) {
            img = req.files.map((file) => ({
                imageurl: `http://api.medicinewholesale.in/public/${file.filename}`,
            }));
        }
        const result = await product.create({
            category: data.category,
            subcategory: data.subcategory,
            companyName: data.companyName,
            name: data.name,
            ourPrice: data.ourPrice,
            mrp: data.mrp,
            itemtype: data.itemtype,
            size: data?.size,
            composition: data?.composition,
            inventory: data?.inventory,
            productimage: img,
            range: range
        });

        
        if (!result) return res.status(500).json({ "Error": "Somthing went wrong Try After sometime" })

        // Sucessfully created
        return res.status(201).json({ "Message": "Producta added Sucessfully" });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ "Error": "Somthing went wrong in adding product" })
    }
}


const handleupdateproduct = async (req, res) => {
    try {
        const id = req.params.id
        const range = JSON.parse(req.body.range)
        let img = []

        console.log(req.files)

        if (req.files && req.files.length > 0) {
            
            img = req.files.map((file) => ({
                imageurl: `http://api.medicinewholesale.in/public/${file.filename}`,
            }));
        }
        
        const data = {...req.body , productimage : img , range: range};

        0 === img.length ? delete data.productimage : "";

        const result = await product.findByIdAndUpdate(id, data)

        if (!result) return res.status(404).json({ "error": "Error in deleting the Product" });
        return res.status(200).json({ "Message": "Product Updated Sucesfully" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ "Error": "Somthing went wrong in uploading" })
    }
}

const handledeleteproduct = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await product.findByIdAndUpdate(id, { isDeleted: true })
        if (!result) return res.status(404).json({ "error": "Error in deleting the Product" });
        return res.status(200).json({ "Message": "Product Deleted Sucessfully" });
    } catch (e) {
        console.log(e);
        return res.status(404).json({ "Error": "Product not found" });
    }
}

const handlGetProductList = async (req, res) => {
    try {
        const matchedCondition = {}
        if(req.query?.category){
            matchedCondition.category = req.query.category
        }
        if(req.query?.subcategory){
            matchedCondition.subcategory = req.query.subcategory
        }
        
        console.log(matchedCondition)
        let result = []
        if (req.query.type === "feature"){
            result = await product.find({featured : true , isDeleted : false}).limit(12)
        }else{
            result = await product.find({...matchedCondition , isDeleted : false})
        }
        if (!result) return res.status(404).json({ "error": "No Product Found" });

        return res.status(200).json(
            result.map((item) => {
                const data = {
                    companyName: item.companyName,
                    id: item._id,
                    name: item.name,
                    mrp: item.mrp,
                    ourPrice: item.ourPrice,
                    imageurl: item.productimage,
                    itemtype: item.itemtype,
                    inventory: item.inventory,
                    category : item.category,
                    subcategory : item.subcategory,
                    size : item.size,
                    range : item.range,
                    composition : item.composition
                }
                return data;
            })
        );
    } catch (e) {
        console.log(e)
        return res.status(500).json({ "Error": "Somthing Went Wrong Try adter Some Time" })
    }
}


const handleGetSpecficProduct = async (req, res) => {
    try {
        const param = req.params.id
        if (!param) return res.status(500).json({ "error": "Product Id is required" });

        const result = await product.findById(req.params.id);

        if (!result) return res.status(404).json({ "error": "No Product Found" });
        return res.status(200).json(result);
    } catch (e) {
        console.log(e)
        return res.status(500).json({ "Error": "Somthing Went Wrong Try adter Some Time" })
    }
}


const handlesearchlist = async (req,res)=>{
    try {
        const  result = await product.find({isDeleted : false})
        if (!result) return res.status(404).json({ "error": "No Product Found" });
        return res.status(200).json(
            result.map((item) => {
                return {
                    name : item.name,
                    id : item._id
                }
            })
        );
    } catch (e) {
        console.log(e)
        return res.status(500).json({ "Error": "Somthing Went Wrong Try adter Some Time" })
    }
}



module.exports = {
    handleaddproduct,
    handledeleteproduct,
    handleupdateproduct,
    handlGetProductList,
    handleGetSpecficProduct,
    handlesearchlist
}