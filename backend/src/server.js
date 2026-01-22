const express = require("express");
const cors = require("cors");
const ss = require("simple-statistics");

const fs = require('fs');
const csv = require('csv-parser');

const app = express();

app.use(cors());
app.use(express.json());

let modelData = [];
let predict;

// Load and "Train" the model when the server starts
fs.createReadStream('Salary_Data.csv')
    .pipe(csv())
    .on('data', (row) => {
        // We convert strings from CSV to Numbers and push as [x, y]
        modelData.push([parseFloat(row.YearsExperience), parseFloat(row.Salary)]);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');

        // Train the model once the data is loaded
        const lnr = ss.linearRegression(modelData);
        predict = ss.linearRegressionLine(lnr);

        console.log("Model is ready for predictions!");
    });

app.post('/predict', (req, res) => {
    const years = parseFloat(req.body.years);

    // 3. Make a prediction for the unlabeled input
    const predictedSalary = predict(years);

    res.json({ salary: predictedSalary.toFixed(2) });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
})