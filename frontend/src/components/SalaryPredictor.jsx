import React, { useState } from 'react';
import axios from 'axios';

export default function SalaryPredictor() {
    const [years, setYears] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handlePredict = async () => {
        const response = await axios.post('http://localhost:5000/predict', { years });
        setPrediction(response.data.salary);
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Experience vs. Salary Predictor</h2>
            <input 
                type="number" 
                placeholder="Years of Experience" 
                value={years}
                onChange={(e) => setYears(e.target.value)}
            />
            <button onClick={handlePredict}>Predict Salary</button>
            
            {prediction && (
                <h3>Estimated Salary: ${prediction}</h3>
            )}
        </div>
    );
}