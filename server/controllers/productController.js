const Product = require('../models/Product');
const { Op } = require('sequelize');

const SEED_PRODUCTS = [
  {
    name: '12x6 Inch Round Grow Bag Pack of 4 | Wide Flat HDPE Plant Bag for Herbs & Terrace Garden',
    description: `Introducing the 12x6 Inch Wide Flat Round Grow Bags – Pack of 4, specially designed for gardeners who want maximum planting area in compact spaces. The unique wide and shallow shape is ideal for herbs like mint, coriander, and basil, as well as leafy greens like spinach, methi, and lettuce that thrive in shallow soil beds.

Built with premium dual-layer HDPE non-woven fabric — green on the outside, orange on the inside — these grow bags offer exceptional durability, UV protection, and moisture retention while allowing excess water to drain freely. The breathable fabric promotes natural air pruning for stronger, healthier root systems.

Perfect for terrace gardens, balconies, windowsills, and kitchen gardens, these wide planters let you grow multiple plants in a single bag, maximizing your yield per square foot. Lightweight, foldable, and easy to store when not in use.`,
    points: [
      "✅ Size: 12 x 6 Inches (Wide & Flat) | Pack of 4",
      "✅ Material: Premium Dual-Layer HDPE Non-Woven Fabric (Green + Orange)",
      "✅ Wide Design: Grow multiple plants in a single bag",
      "✅ Best For: Mint, coriander, spinach, methi & shallow-root herbs",
      "✅ Air Pruning: Healthier roots, faster growth",
      "✅ Superior Drainage: Prevents waterlogging & root rot",
      "✅ Reusable & UV Resistant: Built for Indian climate, lasts seasons",
      "✅ Ideal For: Terrace, balcony, kitchen garden & windowsill gardening"
    ],
    price: 599,
    images: [
      "http://localhost:8000/images/growbag12x6.jpg",
      "https://images.unsplash.com/photo-1599598425947-5202edd56fde?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=400&h=400&fit=crop"
    ],
    category: 'grow bag',
    featured: true,
  },
];

// Seed the DB if empty
const seedProducts = async () => {
  try {
    const count = await Product.count();
    if (count === 0) {
      await Product.bulkCreate(SEED_PRODUCTS);
      console.log('🌱 Products seeded successfully');
    }
  } catch (err) {
    console.error('Seed error:', err);
  }
};

const getProducts = async (req, res) => {
  try {
    await seedProducts();
    const { search, category } = req.query;
    let where = {};
    if (search) {
  where.name = { [Op.like]: `%${search}%` };
}
    if (category && category !== 'all') where.category = category;
    const products = await Product.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching product', error: err.message });
  }
};

module.exports = { getProducts, getProductById, seedProducts };
