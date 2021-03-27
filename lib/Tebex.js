const config = require('./../config');

const axios = require('axios');

const Axios_Tebex = axios.create();
      Axios_Tebex.defaults.headers.common["X-Tebex-Secret"] = config.Tebex.secret;
      Axios_Tebex.defaults.baseURL = config.Tebex.hostname;

async function canProceedToPayment(reference)
{
    let payment = await Axios_Tebex.get("/payments/" + reference);

    if (payment && payment.data)
    {
        payment = payment.data;

        if (payment.status !== "Pending Capture")
        {
            return { can_proceed: false };
        }

        let payment_date = new Date(payment.date).getTime();

        if (payment_date < Date.now() - 900000)
        {
            return { can_proceed: false };
        }

        if (payment.gateway.name !== "Manual Payments")
        {
            return { can_proceed: false };
        }

        return { can_proceed: true, payment };
    }

    return { can_proceed: false };
}

async function markPaymentAsPaid(reference) 
{
    await Axios_Tebex.put("/payments/" + reference, {
        status: "complete"
    });
}

module.exports = {
    payments: {
        canProceedToPayment,
        markPaymentAsPaid
    }
};