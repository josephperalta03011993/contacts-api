const { ObjectId } = require('mongodb');
const { connectDb } = require('../db/connect');

const collectionName = 'contacts';

// GET ALL
const getAllContacts = async (req, res) => {
  try {
    const db = await connectDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BY ID
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

// POST
const createContact = async (req, res) => {
  try {
    const db = await connectDb();
    const result = await db.collection(collectionName).insertOne(req.body);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT
const updateContact = async (req, res) => {
  try {
    const db = await connectDb();
    const result = await db.collection(collectionName).updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
const deleteContact = async (req, res) => {
  try {
    const db = await connectDb();
    const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };