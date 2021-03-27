module.exports = {
    Tebex: {
        // A server's secret so we can query your store updating transactions.

        secret: "",
        
        // Hostname of your Tebex store
        
        hostname: "https://plugin.tebex.io",
        
        // Where you want users to redirect to once the transactions has successfully processed.

        complete_redirect: "",

        // Where you want users to redirect to if something went wrong (cancelled, expired)

        error_redirect: ""
    },
    Skins: {
        // Hostname of your Skins instance
        
        hostname: "https://crownskins.com",

        // Username and Password of your Skins instance
        
        auth: {
            username: "",
            password: ""
        },

        // Multiplier you want your items to be priced at, on top of custom prices defined via the panel. 
        // 0.5 would be 50% off.

        item_price_multiplier: 0.75
    },
    Webserver: {
        // Port this intergration app listens to
        
        port: 3040,

        // Hostname of this intergration app (does not need to be a domain!)

        hostname: ""
    }
};