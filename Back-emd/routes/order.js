const router = require("express").Router();
const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const mailer = require('../utils/mailer');

//CREATE Order
router.post("/", verifyToken, async (req, res) => {
  console.log(req.body)
  const newOrder = new Order(req.body);
    try {
      const saveOrder = await newOrder.save();
      res.status(200).json(saveOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // Get In Come of lastmonth
  router.get("/income", verifyTokenAndAdmin, async (req, res) => {

    const lastmonth = new Date(new Date().setMonth(new Date().getMonth() - 3));
    const productId = req.query.pid;
    try {
      const income = await Order.aggregate([
        { $match: { 
          createdAt: { $gte: lastmonth } ,
          ...(productId && {
            products: {
              $elemMatch: { productId }
            }
          })
        } },
        {
          $project: {
            month: { $month: "$createdAt" },
            amounts: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$amounts" },
          },
        },
        {
          $sort: {_id: -1}
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//UPDATE Order
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  console.log(req.body)
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
    mailer.sendMail('amidateri@gmail.com', "update", "Order is change" +req.body.email )
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Order
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("DELETE has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER Order
router.get("/:id", async (req, res) => {
  try {
    const order =await Order.find({userId:req.params.id});
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET All Order

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {    
    const order =await Order.find();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports =router