const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const contactsRoutes = require('./routes/contacts');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/contacts', contactsRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Contacts API is running...');
});

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;