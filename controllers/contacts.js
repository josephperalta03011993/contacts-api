const { ObjectId } = require('mongodb');
const { connectDb } = require('../db/connect');

const getAllContacts = async (req, res) => {
  try {
    const db = await connectDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const db = await connectDb();
    const contact = await db
      .collection('contacts')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllContacts, getContactById };
