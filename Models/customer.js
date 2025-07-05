const mongoose = require('mongoose');

main().then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo')
};

const OrderSchema = new mongoose.Schema({
  items :String,
  price : Number,
});

const Order = mongoose.model('Order', OrderSchema);

const addOrders = async ()=>{
  await Order.insertMany({
    items: 'Pizza',
    price: 500
  }, {
    items: 'Burger',
    price: 200
  }, {
    items: 'Pasta',
    price: 300
  })
};

addOrders().then(() => console.log('Orders added'))