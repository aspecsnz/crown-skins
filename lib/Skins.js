const Currency = require('./Currency');

const config = require('./../config');

const axios = require('axios');

const Axios_Skins = axios.create();

Axios_Skins.defaults.headers.post['Content-Type'] = 'application/json';
Axios_Skins.defaults.baseURL = config.Skins.hostname;

const auth = { ...config.Skins.auth };

async function ensure(transaction_id, payment) 
{
    let price = await Currency.converter.convert(payment.amount, payment.currency.iso_4217, "USD");

    return (await Axios_Skins.post("/api/create", 
        {
            auth,
            steamid: payment.player.uuid,
            price,
            success_url: config.Webserver.hostname + "/return/",
            cancel_url: config.Webserver.hostname + "/cancel/",
            description: payment.packages.map(x => x.name).join(", "),
            item_price_multiplier: config.Skins.item_price_multiplier,
            transaction_id
        })
    ).data;
}
      
async function fetch(transaction_id) 
{
    return (await Axios_Skins.post("/api/", { auth, transaction_id })).data;
}

module.exports = {
    payments: {
        ensure,
        fetch
    }
};