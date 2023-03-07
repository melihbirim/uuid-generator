const express = require('express');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const app = express();

const API_KEY = process.env.API_KEY || "APIKEY";
const JWT_SECRET = 'your-jwt-secret';

app.use(express.json());

// Generate JWT token with a username and password
app.post('/token', (req, res) => {
  const { username, password } = req.body;
  const token = jwt.sign({ username, password }, JWT_SECRET);
  res.json({ token });
});

// Generate UUIDs with a given number and type
app.post('/uuid', (req, res) => {
  const { type, count } = req.body;

  // Verify API key and JWT token
  const apiKey = req.get('API-Key');
  const authHeader = req.get('Authorization');
  if (apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid JWT token' });
  }

  // Generate UUIDs
  const uuids = [];
  for (let i = 0; i < count; i++) {
    switch (type) {
      case 'uuid':
        uuids.push(uuid.v4());
        break;
      case 'namespace':
        uuids.push(uuid.v5(uuid.v4(), uuid.v5.DNS));
        break;
      default:
        return res.status(400).json({ error: 'Invalid UUID type' });
    }
  }

  res.json({ uuids });
});

module.exports = app;
