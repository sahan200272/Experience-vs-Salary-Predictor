const express = require("express");
const cors = require("cors");
const ss = require("simple-statistics");

const app = express();

app.use(cors());
app.use(express.json());

const data = [
    [1, 50000], [1.5, 60000], [2, 85000], 
    [3, 110000], [4, 150000], [5, 200000],
    [6, 240000], [8, 350000]
];

// 2. Train the Linear Regression Model
const lnr = ss.linearRegression(data);
const predict = ss.linearRegressionLine(lnr);

app.post('/predict', (req, res) => {
    const years = parseFloat(req.body.years);
    
    // 3. Make a prediction for the unlabeled input
    const predictedSalary = predict(years);
    
    res.json({ salary: predictedSalary.toFixed(2) });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
})