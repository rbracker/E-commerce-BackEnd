const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes); // added rb

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;