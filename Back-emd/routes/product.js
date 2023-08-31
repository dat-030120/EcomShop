const router = require("express").Router();
const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res) => {

  const newProduct = new Product(req.body);
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//UPDATE Product
router.put("/:id",verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Product
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All Product

router.get("/", async (req, res) => {
  const qSort = req.query.sort;
  const qCategory = req.query.category;
  let sort;
  
  switch (qSort) {
    case "newest":
      sort = { createdAt: -1 }
      break;
    case "oldest":
      sort = { createdAt: 1 }
      break;
    case "asc":
      sort = {price: 1}
      break;
    default:
      sort = { price: -1 }
      break;
  }
  try {
    let products;
    
    if(qCategory){ 
      products =await Product.find({
        category :{
          $in: [qCategory]
        }
      }).sort(sort);
    }else{
      products = await Product.find().sort(sort);
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports =router