const order = require('../Modal/Ordermodal');
const product = require('../Modal/Prductmodal')

const handleCreateOrder = async (req, res) => {
    try {
        const data = req.body
        if (Object.keys(data).length == 0) return res.status(400).json({ error: "All fields are required" });

        const result = await order.create({
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            pincode: data.pincode,
            landmark: data.landmark,
            address: data.address,
            orders: data.order,
            totalPrice: data.totalPrice,
            delivery: data.delivery,
            city: data.city,
            createdBy: data.createdBy,
            druglcnumber: data.druglcnumber,
            foodlcnumber: data.foodlcnumber,
            remark: data.remark
        })
        // if any error 
        if (!result) return res.status(500).json({ "Error": "Somthing went wrong Try After sometime" })

        // Sucessfully created
        return res.status(201).json({ "Message": "Order Created Sucessfully" });
    } catch (e) {
        // catch block
        console.log(e);
        return res.status(400).json({ "Error": "Somthing went wrong in adding product" })
    }
}

const handleUpdateOrder = async (req, res) => {
    try {
        const id = req.params.id;
        if (!req.body && !!req.body.status) return res.status(400).json({ error: "Status Not Found" });
        const result = await order.findByIdAndUpdate(id, { OrderStatus: req.body.status });

        // inventory Management
        if (req.body.status === "Delivered") {
            const inventoryresult = await product.bulkWrite(req.body.products.map((item) => {
                return {
                    updateOne: {
                        "filter": { "_id": item.id },
                        "update": { $inc: { inventory: -(+item.quantity) } }
                    }
                }
            }))
        }


        if (!result) return res.status(500).json({ "Error": "Somthing went wrong in Updateing Status" })
        return res.status(200).json({ "Message": "Order Status Upadeted Sucessfully" });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ "Error": "Somthing went wrong in Updateing Status" })
    }
}

const handleGetOrderList = async (req, res) => {
    try {
        const param = req.query
        const result = await order.find(param)
        if (!result) return res.status(500).json({ "Error": "Error In getting Orders" });
        return res.status(200).json(
            result.map((item) => {
                const data = {
                    id: item._id,
                    name: item.name,
                    phoneNumber: item.phoneNumber,
                    address: item.address,
                    createdAt: item.createdAt,
                    total: item.totalPrice,
                    pincode: item.pincode,
                    city: item.city,
                    landmark: item.landmark,
                    OrderStatus: item.OrderStatus
                }
                return data
            }));
    } catch (e) {
        console.log(e)
        return res.status(500).json({ "Error": "Somthing Went Wrong Try after Some Time" })
    }
}

const handleGetSpecficorder = async (req, res) => {
    try {
        const param = req.params.id
        if (!param) return res.status(500).json({ "error": "Product Id is required" });

        const result = await order.findById(req.params.id).populate('orders.productId');

        if (!result) return res.status(404).json({ "error": "No Product Found" });
        return res.status(200).json(result);
    } catch (e) {
        console.log(e)
        return res.status(500).json({ "Error": "Somthing Went Wrong Try adter Some Time" })
    }
}


const handlegetordehistory = async (req, res) => {
    try {
        const id = req.query.id
        const result = await order.find({ createdBy: id }).populate('orders.productId')
        res.status(200).json(result)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ "Error": "Somthing Went Wrong Try adter Some Time" })
    }
}

const handlegettodaysorder =  async (req,res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setUTCHours(0, 0, 0, 0); // Set to the start of today in UTC (00:00:00)

        const endOfDay = new Date();
        endOfDay.setUTCHours(23, 59, 59, 999); // Set to the end of today in UTC (23:59:59)

        const result =await order.find({
            OrderStatus : "Pending"
        }).populate('orders.productId')

        let dataarr = []

        result.map((order)=>{
            order.orders.map((product)=>{
                console.log(product)
                if(dataarr.find((item) => item.id === product?.productId?._id)){
                    dataarr.map((fd)=>{
                        if(fd.id ===  product?.productId?._id){
                            fd.quantity += product?.quantity;
                        }
                    })
                }else{
                    const obj = {
                        id : product?.productId?._id,
                        name : product?.productId?.name,
                        inventory : product?.productId?.inventory,
                        ourPrice : product?.productId?.ourPrice,
                        mrp : product?.productId?.mrp,
                        quantity : product?.quantity,
                    }
                    dataarr.push(obj)
                }
            })
        })
        if(!result) return res.status(404).json({"Error" : "No record Found"})    
        return res.status(200).json(dataarr)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ "Error": "Somthing Went Wrong Try adter Some Time" })
    }
}

module.exports = {
    handleCreateOrder,
    handleUpdateOrder,
    handleGetOrderList,
    handleGetSpecficorder,
    handlegetordehistory,
    handlegettodaysorder
}