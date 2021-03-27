const config = require('./config');

const Tebex = require('./lib/Tebex');
const Skins = require('./lib/Skins');

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = require('http').createServer(app);

app.get('/', async (req, res) =>
{
    if (!req.query || !req.query.reference)
    {
        return res.sendStatus(400);
    }

    let { reference } = req.query;
    let { can_proceed, payment } = await Tebex.payments.canProceedToPayment(reference);

    if (!can_proceed)
    {
        return res.redirect(config.Tebex.error_redirect);
    }

    let skins_data = await Skins.payments.ensure(reference, payment);
        
    return res.redirect(skins_data.approval_url);
});

app.get('/return', async (req, res) =>
{
    if (!req.query || !req.query.transaction_id)
    {
        return res.sendStatus(400);
    }

    let { transaction_id } = req.query;

    let payment = await Skins.payments.fetch(transaction_id);  

    if (payment.status === "Accepted")
    {
        await Tebex.payments.markPaymentAsPaid(req.query.transaction_id);
    }
    else
    {
        return res.redirect(config.Tebex.ErrorRedirect);
    }

    if (!req.query.auto)
    {
        return res.redirect(config.Tebex.complete_redirect.replace("{REFERENCE}", transaction_id));
    }
        
    return res.sendStatus(200);
})

app.get('/cancel', (req, res) => res.redirect(config.Tebex.error_redirect));

server.listen(config.Webserver.port, () => console.log(`[Express] Listening on port ${config.Webserver.port}.`));