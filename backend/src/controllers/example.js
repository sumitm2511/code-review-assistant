// Example JS File for Testing Code Review Assistant

function calculateTotal(items) {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
    }

    return total;
}

function greetUser(name) {
    console.log("Hello " + name);  // Potential improvement: use template literals
}

const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 5 }
];

console.log("Total:", calculateTotal(items));
greetUser("Sumit");
