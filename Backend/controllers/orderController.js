

// Place Order on COD : /api/order/cod

import Order from "../models/Order.js";
import Product from "../models/product.js";

export const placeOrderCOD = async(req,res)=>{
    try {
        const {userId,address,items}= req.body;
        if(!address || items.length === 0){
          return res.json({success:false,message:"Invalid data"})
        }

     //// Calculate Amount Using Items
            let amount = await items.reduce(async(acc,item)=>{
                const product = await Product.findById(item.product);
                return (await acc) + product.offerPrice * item.quantity;
            },0)
    //// Add Tax Charge ( 2 % )

    amount += Math.floor(amount * 0.02);

    await Order.create({
        userId,
        items,
        address,
        paymentType:"COD",
        amount
    })
        return res.json({success:true,message:"Order Placed Successfully"})

    }catch (error) {
        return res.json({success:false,message:error.message})
    }
}

// Place Order Online : /api/order/online

    export const  placeOrderOnline = async (req,res)=>{
        try {
            const {userId,items,address} = req.body

            let amount = await items.reduce(async(acc,item)=>{
                const product = await Product.findById(item.product)
                return(await acc) + product.offerPrice * item.quantity
            },0)

            amount += Math.floor(amount * 0.02) 

            const order = await Order.create({
                userId,
                items,
                address,
                amount,
                paymentType:"online",
                isPaid:false
            })
                res.json({success:true,order})

        } catch (error) {
            console.log(error.message)
            res.json({success:false, message:error.message})
        }
    }

//// verify Payment : /api/order/verify 

    export const verifyPayment = async(req,res)=>{
        try {
            const {orderId} = req.body;

            await Order.findByIdAndUpdate(orderId,{isPaid:true})

            res.json({success:true,message:"Payment Succesfull"})

        } catch (error) {
            res.json({success:false,message:error.message})
        }
    }












///  Get Orders by UserId : /api/order/user

export const getUserOrders = async(req,res)=>{
    try {
        const {userId} = req.body;
        const orders= await Order.find({
            userId,
            $or:[{paymentType:"COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt:-1});
        res.json({success:true,orders})
    } catch (error) {
         return res.json({success:false,message:error.message})
    }
}

/// get all Orders for Seller/ADMIN


export const getAllOrders = async(req,res)=>{
    try {
        const orders= await Order.find({
            $or:[{paymentType:"COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt:-1});
        res.json({success:true,orders})
    } catch (error) {
         return res.json({success:false,message:error.message})
    }
}

