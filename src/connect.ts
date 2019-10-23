import mongoose from 'mongoose';

export default (db: string) => {
  const connect = async () => {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).catch(error => {
      console.error('Error connecting to database: ', error);
      return process.exit(1);
    });
  };

  connect();
  mongoose.connection.on('disconnected', connect);
};
