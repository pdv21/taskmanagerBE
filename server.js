require('dotenv').config();

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

try{
  const app = require('./app');

  const PORT = process.env.PORT;
  console.log("ENV PORT:", process.env.PORT);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (err) {
  console.error('Error starting server:', err);
}
