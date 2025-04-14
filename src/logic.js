function calculatePoints(receipt) {
    let points = 0;

    points += getRetailerPoints(receipt.retailer);
    points += getRoundTotalPoints(receipt.total);
    points += getQuarterTotalPoints(receipt.total);
    points += getItemCountPoints(receipt.items);
    points += getDescriptionBonusPoints(receipt.items);
    points += getOddDayPoints(receipt.purchaseDate);
    points += getAfternoonBonusPoints(receipt.purchaseTime);

    return points;
}

function getRetailerPoints(retailer) {
    return (retailer.match(/[a-z0-9]/gi) || []).length;
}

function getRoundTotalPoints(total) {
    return total.endsWith('.00') ? 50 : 0;
}

function getQuarterTotalPoints(total) {
    return parseFloat(total) % 0.25 === 0 ? 25 : 0;
}

function getItemCountPoints(items) {
    return Math.floor(items.length / 2) * 5;
}

function getDescriptionBonusPoints(items) {
    let total = 0;
    for (const item of items) {
        const desc = item.shortDescription.trim();
        if (desc.length % 3 === 0) {
            const price = parseFloat(item.price);
            total += Math.ceil(price * 0.2);
        }
    }
    return total;
}

function getOddDayPoints(purchaseDate) {
    const day = parseInt(purchaseDate.split('-')[2], 10);
    return day % 2 !== 0 ? 6 : 0;
}

function getAfternoonBonusPoints(purchaseTime) {
    const [hour, minute] = purchaseTime.split(':').map(Number);
    return hour === 14 || (hour === 15 && minute < 60) ? 10 : 0;
}

module.exports = calculatePoints;
