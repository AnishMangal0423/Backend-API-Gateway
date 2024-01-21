const express = require("express");
const {Server_config}=require('./config')
const mountRoutes = require("./routes");
const rateLimit = require('express-rate-limit');
const {createProxyMiddleware }=require('http-proxy-middleware');
const ServerConfig = require("./config/Server-config");


const app = express();

const limiter=rateLimit({

  windowMs: 5 * 60 * 1000,
  max: 10
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.get("/", (req, res) => {
  res.json({
    name: "Anish",
    fg: "Inside API-Gateway-service",
  });
});



app.use("/api", mountRoutes);

app.use('/flightService', createProxyMiddleware({target:Server_config.FLIGHT_SERVICE , changeOrigin:true}))

app.use('/bookingService' , createProxyMiddleware({target:Server_config.BOOKING_SERVICE , changeOrigin:true}))



app.listen(5500, function exec() {
  console.log(`Starting My API-GATEWAY server at Port ${5500}`);

    // user=await User.findByPk(6);
    // role=await Role.findByPk(1);
    // console.log( user , role)
    // user.addRole(role)

});



/**
 * 
 * user(at localhost:5500 , Gateway)  -->(at localhost: 5000 , Booking)
 *          |
 *          |
 *          |
 *          
 *    (at localhost: 4000 , Flight Search Service)  
 * 
 */


/*    

// API-GATEWAY  --> 5500
// BOOKING-SERVICE  --> 5000
// Search Service   --> 4000


// */
