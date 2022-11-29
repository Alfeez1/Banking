import mongoose from 'mongoose';

export const Connections = () => {
  const MONGODB_URI = 'mongodb://localhost:27017/restoap';
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

  mongoose.connection.on('connected', () => {
    console.log('database connected');
  });
  mongoose.connection.on('disconnected', () => {
    console.log('database disconnected');
  });
};
export default Connections;
