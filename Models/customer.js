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

const CustomerSchema = new mongoose.Schema({
  name: String,
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order' // Reference to the Order model
  }]
});

const Customer = mongoose.model('Customer', CustomerSchema);

const AddCustomer = async ()=>{
  let cust1 = new Customer({
    name: 'Parth Tiwari',
  });

  let order1 = await Order.findOne({items: "Pizza"});
  let order2 = await Order.findOne({items: "Burger"});

  cust1.orders.push(order1);
  cust1.orders.push(order2);

  let result = await cust1.save();
  console.log(result);
};

AddCustomer().then(() => console.log('Customer added with orders'));

/*const addOrders = async ()=>{
  let res = await Order.insertMany([
    {
    items: 'Pizza',
    price: 500
  }, {
    items: 'Burger',
    price: 200
  }, {
    items: 'Pasta',
    price: 300
  }
  ])
  console.log(res);
};

addOrders().then(() => console.log('Orders added'))*/