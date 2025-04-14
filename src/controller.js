const { v4: uuidv4 } = require('uuid');
const store = require('./dataStore');
const calculatePoints = require('./logic');
const { validateReceipt } = require('./validate');

exports.processReceipt = (req, res) => {
    const receipt = req.body;
    const validation = validateReceipt(receipt);
    if (!validation.valid) {
        return res.status(400).json({
            error: "The receipt is invalid. Please verify input."
        });
    }

    const id = uuidv4();
    console.log("Saving receipt with ID:", id);
    store.saveReceipt(id, receipt);
    res.json({ id });
};

exports.getPoints = (req, res) => {
    const id = req.params.id;
    const receipt = store.getReceipt(id);
    console.log("Looking up receipt ID:", id, "Found:", !!receipt);


    if (!receipt) {
        return res.status(404).json({ error: 'Receipt not found' });
    }

    const points = calculatePoints(receipt);
    console.log("\n points: ", points)
    res.json({ points });
};