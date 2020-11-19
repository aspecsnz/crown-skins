const axios = require('axios');

async function convert(amount, fromCurrency, toCurrency)
{
    if (fromCurrency === "USD")
    {
        return amount;
    }

    let data = (await axios.get("https://api.exchangeratesapi.io/latest?base=USD")).data;

    amount = amount * data.rates[toCurrency];

    return amount;
}

module.exports = {
    converter: {
        convert
    }
};