const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");

connectDB();

app.use(express.json({extended: false}));

app.use('/api/users', require("./routers/api/users"));
app.use('/api/login', require("./routers/api/login"));
app.use('/api/profile', require("./routers/api/profile"));
app.use('/api/item', require("./routers/api/item"));
app.use('/api/note', require("./routers/api/note"));
app.use('/api/email', require("./routers/api/emailer"));
app.use('/api/password', require("./routers/api/password"));



//set static for production
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



const PORT = process.env.PORT || 1000;
app.listen(PORT, (req, res, error) => console.log(`server start on port ${PORT}`))