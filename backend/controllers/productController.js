import Product from '../models/Product.js';
import Review from '../models/Review.js';
import Category from '../models/Category.js';

export const getProducts = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (search) filter.name = new RegExp(search, 'i');
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    const products = await Product.find(filter).populate('reviews').lean();
    res.json({ products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews').lean();
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().lean();
    res.json({ categories });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;
    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required' });
    }

    const review = await Review.create({ product: productId, user: req.user.name, rating, comment });
    const product = await Product.findById(productId);
    product.reviews.push(review._id);
    product.rating = ((product.rating * (product.reviews.length - 1)) + rating) / product.reviews.length;
    await product.save();

    res.status(201).json({ review });
  } catch (error) {
    next(error);
  }
};
