const express = require("express");
// const { PORT } = require("./config");
const {Server_config}=require('./config')
const mountRoutes = require("./routes");
const rateLimit = require('express-rate-limit');

const app = express();


const limiter=rateLimit({

  windowMs: 5 * 60 * 1000,
  max: 10
})


app.get("/", (req, res) => {
  res.json({
    name: "Anish",
    fg: "Pranu Bhandari",
  });
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

app.use("/api", mountRoutes);



app.listen(parseInt(Server_config.PORT), function exec() {
  console.log(`Starting My server at Port ${parseInt(Server_config.PORT)}`);

});

