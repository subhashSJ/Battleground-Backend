import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/users.js';
import languageRoutes from './routes/languages.js';
import battleRoutes from './routes/battles.js';
import singleplayergameRoutes from './routes/singleplayergames.js';
import multiplayergameRoutes from './routes/multiplayergames.js';
import usertrophiesRoutes from './routes/usertrophies.js'
import multiplaterconnectionRoutes from './routes/multiplayerconnection.js'
import categoriesRoutes from './routes/categories.js'
import accuracyRoutes from './routes/accuracy.js'
import friendRoutes from './routes/friend.js'
import authRoutes from './routes/auth.js'
import https from 'https'
https.globalAgent.options.rejectUnauthorized = false;

const app = express();

const CONNECTION_URL = 'mongodb+srv://Battleground_Project:Interns2022@cluster0.2l4xy.mongodb.net/myFirstDatabase?retryWrites=true';
const PORT = process.env.PORT || 9000;


app.use(cors())

app.use(express.json());
app.use('/users', userRoutes);
app.use('/languages', languageRoutes);
app.use('/battles', battleRoutes);
app.use('/singleplayergames', singleplayergameRoutes);
app.use('/multiplayergames', multiplayergameRoutes);
app.use('/usertrophies', usertrophiesRoutes);
app.use('/multiplayerconnection', multiplaterconnectionRoutes);
app.use('/categories', categoriesRoutes)
app.use('/accuracy', accuracyRoutes);
app.use('/friend', friendRoutes);
app.use("/api/auth", authRoutes);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true })
  .then(() => app.listen(PORT, () => console.log('Server running on port')))
  .catch((error) => console.log('Error'));
const con = mongoose.connection;

con.on('open', function () {
  console.log('connected...')
})

