import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Home Page');
});
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
