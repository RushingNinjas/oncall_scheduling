const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(express.json());

// Serve the main HTML page for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for provider profiles
app.get('/api/providers', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'providers.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading providers:', err);
            return res.status(500).json({ error: 'Failed to load providers' });
        }
        try {
            const providers = JSON.parse(data).providers;
            console.log('Providers data:', providers);
            res.json(providers);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Failed to parse providers data' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 