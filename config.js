module.exports = {
    Tebex: {
        // A server's secret so we can query your store updating transactions.

        Secret: "",
        
        // Hostname of your Tebex store
        
        Hostname: "https://plugin.tebex.io",
        
        // Where you want users to redirect to once the transactions has successfully processed.

        CompleteRedirect: "",

        // Where you want users to redirect to if something went wrong (cancelled, expired)

        ErrorRedirect: ""
    },
    Skins: {
        // Hostname of your Skins instance
        
        Hostname: "https://crownskins.com",

        // Username and Password of your Skins instance
        
        Auth: {
            Username: "",
            Password: ""
        }
    },
    Webserver: {
        // Port this intergration app listens to
        
        Port: 3040,

        // Hostname of this intergration app (does not need to be a domain!)

        Hostname: ""
    }
};