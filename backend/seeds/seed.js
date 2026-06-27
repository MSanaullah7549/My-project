import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

dotenv.config();

const categories = [
  { name: 'Electronics', description: 'Gadgets and devices' },
  { name: 'Fashion', description: 'Apparel and accessories' },
  { name: 'Home', description: 'Home essentials and decor' },
];

const products = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones for music and calls.',
    price: 79.99,
    category: 'Electronics',
    images: ['/assets/product-1.svg'],
    stock: 50,
  },
  {
    name: 'Modern Desk Lamp',
    description: 'Stylish LED desk lamp with adjustable brightness.',
    price: 34.99,
    category: 'Home',
    images: ['/assets/product-2.svg'],
    stock: 120,
  },
  {
    name: 'Running Sneakers',
    description: 'Comfortable running shoes for everyday workouts.',
    price: 59.99,
    category: 'Fashion',
    images: ['/assets/product-3.svg'],
    stock: 90,
  },
];

const seedData = async () => {
  try {
    await connectDB();
    await Category.deleteMany();
    await Product.deleteMany();

    await Category.insertMany(categories);
    await Product.insertMany(products);
    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
