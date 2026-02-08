const dynamoDB = require('../config/dynamodb');
require('dotenv').config();

const TABLE_NAME = process.env.TABLE_NAME || 'Products';

const sampleProducts = [
  {
    id: 'PROD001',
    name: 'Laptop Dell XPS 13',
    price: 1299,
    url_image: 'https://via.placeholder.com/300x300?text=Laptop+Dell'
  },
  {
    id: 'PROD002',
    name: 'iPhone 15 Pro',
    price: 999,
    url_image: 'https://via.placeholder.com/300x300?text=iPhone+15'
  },
  {
    id: 'PROD003',
    name: 'Sony WH-1000XM5 Headphones',
    price: 399,
    url_image: 'https://via.placeholder.com/300x300?text=Sony+Headphones'
  },
  {
    id: 'PROD004',
    name: 'Samsung 4K Monitor',
    price: 599,
    url_image: 'https://via.placeholder.com/300x300?text=Samsung+Monitor'
  },
  {
    id: 'PROD005',
    name: 'Mechanical Keyboard RGB',
    price: 149,
    url_image: 'https://via.placeholder.com/300x300?text=Keyboard'
  }
];

async function seedDatabase() {
  try {
    console.log(`Starting to seed ${TABLE_NAME} table with ${sampleProducts.length} products...`);
    
    for (const product of sampleProducts) {
      const params = {
        TableName: TABLE_NAME,
        Item: product
      };
      
      await dynamoDB.put(params).promise();
      console.log(`✓ Inserted: ${product.id} - ${product.name}`);
    }
    
    console.log('\n✓ Successfully seeded all products!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
}

seedDatabase();
