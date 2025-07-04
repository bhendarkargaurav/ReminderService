const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const { createChannel } = require('./utils/messageQueue');


// const { sendBasicEmail } = require('./services/email_services');
const TicketController = require('./controllers/ticket-controller');
const EmailService = require('./services/email_services');

const jobs = require('./utils/job');
const { subscribeMessage } = require('./utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('./config/serverConfig');

const setupAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // const channel = await createChannel();

    app.post('/api/v1/tickets', TicketController.create);

    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

    app.listen(PORT, () => {
        console.log(`server Started at port ${PORT}`);
        // jobs();
         

        // sendBasicEmail(
        //     'support@admin.com',
        //     'gauravbhendarkar123@gmail.com',
        //     'This is a testing email',
        //     'Hey, how are you, i hope you like the support'
        // );

    });
}

setupAndStartServer();