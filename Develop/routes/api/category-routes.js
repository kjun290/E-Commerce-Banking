const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: ["id","product_name", "price", "stock", "category_id"]
      }
    }
  )
  // be sure to include its associated Products
  .then(catergoryData => res.json(catergoryData))

  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
 
 Category.findOne (
   {
     where: {
       id: req.paramds.id
     },
     include: {
       model:Product,
       attributes: ["id", "product_name", "price", "stock", "category_id"]
     }
   }
 )
  // be sure to include its associated Products

   .then(catergoryData => res.json(categoryData))
   .catch(err => {
     console.log(err);
     res.status(500).json(err);
   })
});

router.post('/', (req, res) => {
  // create a new category

  Catergory.create(
    {
      catergory_name: req.body.category_name
    }
  )
  .then(catergoryData => res.json(categoryData))
  .cath(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      catergory_name: req.body.category_name
    },

    {
      where: {
        id:req.params.id
      }
    }
  )

  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({message: "CANNOT FIND CATEGORY WITH THAT ID"})
    return;
    }
    
    res.json(categoryData);

  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value

Category.destroy(
  {
    where:{
      id:req.params.id
    }
  }
)

  .then(categoryData => {
    if(!categoryData) {
      res.status(404).json({message: "CANNOT FIND CATEGORY WITH THAT ID"})
      return;
    }
    res.json(categoryData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

module.exports = router;
