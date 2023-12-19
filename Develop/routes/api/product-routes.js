const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category }, // Include associated Category
        { model: Tag, through: ProductTag }, // Include associated Tags using ProductTag as the through model
      ],
    });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category }, // Include associated Category
        { model: Tag, through: ProductTag }, // Include associated Tags using ProductTag as the through model
      ],
    });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // Check if tagIds are provided and not empty
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });

        // Bulk create associations in the ProductTag model
        return ProductTag.bulkCreate(productTagIdArr).then(() => product);
      }

      // If no product tags, just respond with the created product
      res.status(201).json(product);
    })
    .then((result) => res.status(201).json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});


// update product
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      // Check if any rows were affected (product updated)
      if (result[0] === 0) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      if (req.body.tagIds && req.body.tagIds.length) {
        // ... (your existing code for updating tags)
      }

      // Fetch the updated product with associated tags
      return Product.findByPk(req.params.id, {
        include: [Tag], // Include associated tags
      });
    })
    .then((updatedProduct) => res.json(updatedProduct))
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});


router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      // Check if any rows were affected (product deleted)
      if (result === 0) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      // Respond with a success message
      res.status(200).json({ message: 'Product deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
