import express from 'express'
import * as path from 'path'
import fetch from 'node-fetch'
import cors from 'cors'
import { fileURLToPath } from 'url';
import 'dotenv/config'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/")));

const apiKey = process.env.OPENWEATHERMAP_API_KEY
console.log(apiKey)
var city = ''
var country = ''

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/weather', async (req, res) => {
    try {
        city = req.body.city;
        country = req.body.country;

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=imperial`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const responseData = await response.json();
        res.send(responseData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('An error occurred trying to fetch weather data');
    }
});


app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})