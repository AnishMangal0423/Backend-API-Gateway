const express = require("express");
// const { PORT } = require("./config");
const {Server_config}=require('./config')
const mountRoutes = require("./routes");
const rateLimit = require('express-rate-limit');
const {createProxyMiddleware }=require('http-proxy-middleware')

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

app.use('/flightService', createProxyMiddleware({target:Server_config.FLIGHT_SERVICE , changeOrigin:true}))

app.use('/bookingService' , createProxyMiddleware({target:Server_config.BOOKING_SERVICE , changeOrigin:true}))



app.use("/api", mountRoutes);



app.listen(5000, function exec() {
  console.log(`Starting My server at Port ${5000}`);

});




/**
 * 
 * user(at localhost:6000 , Gateway)  -->(at localhost: 5000 , Booking)
 *          |
 *          |
 *          |
 *          
 *    (at localhost: 3000 , Flight Search Service)  
 * 
 */