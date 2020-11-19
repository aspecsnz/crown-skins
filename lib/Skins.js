const Currency = require('./Currency');

const config = require('./../config');

const axios = require('axios');

const Axios_Skins = axios.create();

Axios_Skins.defaults.headers.post['Content-Type'] = 'application/json';
Axios_Skins.defaults.baseURL = config.Skins.Hostname;

let auth = {
    username: config.Skins.Auth.Username,
    password: config.Skins.Auth.Password
}

async function ensure(transaction_id, payment) 
{
    let price = await Currency.converter.convert(payment.amount, payment.currency.iso_4217, "USD");

    console.log(payment.player.uuid);

    return (await Axios_Skins.post("/api/create", 
        {
            auth,
            steamid: payment.player.uuid,
            price,
            success_url: config.Webserver.Hostname + "/return/",
            cancel_url: config.Webserver.Hostname + "/cancel/",
            description: payment.packages.map(x => x.name).join(", "),
            transaction_id,
            gift: false,
            payout_trade_url: config.Skins.PayoutTradeURL
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