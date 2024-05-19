const TicketService = require('../services/email_services');

const create = async (req, res) => {
    try {
        const response = await TicketService.createNotification(req.body);
        return res.status(201).json({
            success: true,
            data: response,
            err: {},
            message: 'Successfully registerd an email remainder'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: response,
            err: error,
            message: 'Unable registe an email remainder'
        })
    }
}

module.exports = {
    create
}