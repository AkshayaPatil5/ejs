// Importing the 'fs' module for file system operations and the 'path' module for handling file paths
const fs = require('fs');
const path = require('path');

// Constructing the file path where the 'products.json' file will be stored
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

// Function to read the products data from the 'products.json' file
const fileproduct = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            // If there is an error reading the file or the file doesn't exist, return an empty array
            return cb([]);
        } else {
            // If the file exists and can be read, parse the JSON content and pass it to the callback function
            cb(JSON.parse(fileContent));
        }
    });
};

// Exporting a class named 'product'
module.exports = class Product {
    // Constructor for the 'Product' class, which takes a title as an argument
    constructor(t) {
        this.title = t;
    };

    // Method to save the product data to the 'products.json' file
    save() {
        // Read the existing products from the file and add the current product to the list
        fileproduct(products => {
            products.push(this); // 'this' refers to the current instance of the 'Product' class

            // Write the updated list of products back to the 'products.json' file
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err); // Log any errors that occur during the write operation
            });
        });
    };

    // Static utility method to fetch all products from the 'products.json' file
    static fetchAll(cb) {
        // Call the 'fileproduct' function to read the products from the file and pass them to the callback function
        fileproduct(cb);
    }
};
