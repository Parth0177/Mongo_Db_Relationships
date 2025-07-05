// ONE TO FEW RELATIONSHIP

const mongoose = require('mongoose');

main().then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo')
};


const userSchema = new mongoose.Schema({
  username: String,
  addresses: [
    {
      _id: false, // Disable automatic _id generation for subdocuments
      location: String,
      city: String,
    }
  ]
});

const User = mongoose.model('User', userSchema);

const addusers = async ()=>{
  let user1 = new User({
    username:'Parth Tiwari',
    addresses:[
      {location: 'Triveni Nagar 2 ',
        city: 'Lucknow'
      }]
  });
  user1.addresses.push({location: 'Triveni Nagar 3', city: 'Lucknow'});
  let result = await user1.save();
  console.log(result);
}

addusers();