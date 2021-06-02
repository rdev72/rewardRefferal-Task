const express = require('express');
const router = express.Router();
const userSchema = require('../models/userSchema');
const walletSchema = require('../models/walletSchema');

//use asyn-await
//user create + wallet create + parentId
router.post('/', async (req, res) => {
  try {
    if (req.body.name == 'user1') {
      const user = await userSchema.create(req.body);
      const wallet = await walletSchema.create({ userId: user._id, userName: user.name });
      res.status(201).json({ user, wallet });
    } else {
      const refferingUser = await userSchema.findById(req.query.userId).lean(); // search from query
      console.log(refferingUser);
      const user = await userSchema.create({
        name: req.body.name,
        paren1Id: req.query.userId,
        paren2Id: refferingUser.paren1Id,
        paren3Id: refferingUser.paren2Id
      });
      const wallet = await walletSchema.create({ userId: user._id, userName: user.name });
      res.status(201).json({ user, wallet });
    }
  } catch (error) {
    console.log(error);
  }
});

// Add money in userWallet + parent1wallet + paremt2wallet + parent3wallet
router.post('/addMoney', async (req, res) => {
  const userWallet = await walletSchema.findOneAndUpdate({ userId: req.body.userId }, { $inc: { amount: req.body.money } }, { upsert: true, new: true }).lean();
  
  //step-1 find walletOwner to get his parents in earningUser
  const  earningUser = await userSchema.findById(req.body.userId).lean().select('paren1Id paren2Id paren3Id');
  //find parent 1/2/3 of walletOwner and add reward
  await walletSchema.findOneAndUpdate({ userId: earningUser.paren1Id}, { $inc: { amount: req.body.money * 0.40 } }, { upsert: true, new: true }).lean();
  await walletSchema.findOneAndUpdate({ userId: earningUser.paren2Id}, { $inc: { amount: req.body.money * 0.20 } }, { upsert: true, new: true }).lean();
  await walletSchema.findOneAndUpdate({ userId: earningUser.paren3Id}, { $inc: { amount: req.body.money * 0.10 } }, { upsert: true, new: true }).lean();

    res.status(200).json(userWallet);
});

module.exports = router;
