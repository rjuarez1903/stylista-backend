import express from "express";
import outfitRouter from "./routes/outfit.route.js";

const app = express();
const PORT = 4000;


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} http://localhost:${PORT}`);
});

app.use(express.json({ limit: '50mb' })); 
app.use("/api/outfit", outfitRouter);