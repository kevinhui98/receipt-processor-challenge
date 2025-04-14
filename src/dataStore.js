const store = {};

exports.saveReceipt = (id, receipt) => {
    store[id] = receipt;
};

exports.getReceipt = (id) => {
    return store[id];
};
