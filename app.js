if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// mailgun config
const auth = {
    auth: {
        api_key: process.env.API_KEY,
        domain: process.env.DOMAIN
    }
}

const transport = nodemailer.createTransport(mg(auth));


// routes
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/send', (req, res) => {
    const { name, subject, email, message } = req.body;
    // console.log(req.body);
    transport.sendMail({
        from: email,
        to: 'mrinmaydey48@gmail.com',
        subject,
        text: `You have a message from ${name}: ${message}`
    }, (err, info) => {
        if (err) {
            return res.status(400).json({
                error: 'your message could not be delivered'
            });
        } else {
            // console.log('message send!!!!!', info);
            return res.status(200).json({
                msg: 'Message has been sent'
            })
        }
    })
})

app.all('*', (req, res) => {
    res.send('<h3>404 page not found</h3>');
})

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app listening at ${port}`));