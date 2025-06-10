// import {express} from 'express';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import { createAdapter } from '@socket.io/redis-adapter';
// import { redis } from './redis.js';
// import { instrument } from '@socket.io/admin-ui';  
// import { createClient } from 'redis';
// import { join } from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import { config } from 'dotenv';
// config();
// const __dirname = dirname(fileURLToPath(import.meta.url));
// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: process.env.CORS_ORIGIN || '*',
//     methods: ['GET', 'POST'],
//   },
// });
// const pubClient = createClient({ url: process.env.REDIS_URL });
// const subClient = pubClient.duplicate();
// pubClient.on('error', (err) => console.error('Redis Pub Client Error', err));
// subClient.on('error', (err) => console.error('Redis Sub Client Error', err));       
// pubClient.connect().catch(console.error);
// subClient.connect().catch(console.error);
// io.adapter(createAdapter(pubClient, subClient));
// instrument(io, {
//   auth: false,
//   mode: 'development',
// });
// app.use(express.static(join(__dirname, 'public')));
// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'public', 'index.html'));
// });
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });

//   socket.on('message', (msg) => {
//     console.log('Message received:', msg);
//     io.emit('message', msg);
//   });
// });
// httpServer.listen(process.env.PORT || 3000, () => {
//   console.log(`Server is running on port ${process.env.PORT || 3000}`);
// });
// export { io }; // Export the io instance for use in other modules
// export default app; // Export the Express app for testing or other purposes
// export { pubClient, subClient }; // Export Redis clients for use in other modules
// export { redis }; // Export the Redis instance if needed
// // Export the Redis instance if needed  
// export { createClient } from 'redis'; // Export createClient for creating Redis clients
// // Export the Redis instance if needed
// export { createAdapter } from '@socket.io/redis-adapter'; // Export createAdapter for Redis adapter
// // Export the Redis instance if needed      
// export { instrument } from '@socket.io/admin-ui'; // Export instrument for admin UI
// // Export the Redis instance if needed
// export { express }; // Export express for use in other modules


import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users.js';
import { connectionDB } from './database/db.js';
import { logReqRes } from './middleware/index.js';
import urlRouter from './routes/urlShortnerRoute.js';
import authRoute from './routes/AuthRoute.js';
const app = express();
const PORT = 8000
app.use(express.urlencoded({ extends: false }))
app.use(express.json());
//
// database connection
connectionDB()

// create a new user
app.use('/user',userRouter)
app.use('/url',urlRouter)
app.use('/auth',authRoute)

// middleware plugin
app.use(logReqRes('log.txt'))
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});