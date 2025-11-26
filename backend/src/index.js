require('dotenv').config();
const express = require('express');
const cors = require('cors');
const reviewRouter = require('./routes/review');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/review', reviewRouter);
const reportsRouter = require("./routes/reports");
app.use("/api/reports", reportsRouter);
app.use("/reports", express.static("reports"));


// Basic health check
app.get('/', (req, res) => res.send({ status: 'ok', service: 'Code Review Assistant' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
