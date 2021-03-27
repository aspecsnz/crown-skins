# Crown Skins

Accept Rust items via Steam in your Tebex store

# Why is this app necessary? What does it do?

This app acts as middleware for your Tebex store, so you don't have to share your secrets with us!  Secrets in the wrong hands can result in your cookies being stolen (and your money!).  This app also converts currency using a Foreign exchange rates API (https://exchangeratesapi.io/) if your store currency is not USD.

# What are the requirements?

- A server with a open port to handle HTTP Requests
- NodeJS > 7

# How do I get started?

Firstly, register for an API key on https://crownskins.com/ and keep it in a safe place.  You will need it for later.

Next, clone this GitHub Repo to the server you want to use for your middleware.  
**Note:** You do not need a domain for this app.  It's purpouse is to redirect users and act as a middleman for the Tebex Store and Skins API.

Once you have cloned the repo, execute the command ``npm i`` to install all the necessary packages, and fill in the blanks in the **config.js** file.  
**Note:** The Tebex Secret is a servers secret - not an API Key!

Once all the blanks have been filled in, you can run using the **node** command or a NodeJS Runtime.  A good one to use is PM2.

# How do I the option to the Tebex store?

We will add the Skins option under the Payment Gateway 'Manual Gateway'.
If you do not have the option 'Manual Gateway' under your Payment Gateways, head to https://server.tebex.io/gateways/create/22

Once here, set all your options for how you want the Skins option to look.  The only thing we want you to set it the JavaScript. 

Set the JavaScript box contents to ``window.location = "http://ip-address-of-mw?reference={REFERENCE}";`` , making sure to change ``ip-address-of-mw`` to the hostname where this app is running!
You can now accept payments for Skins under your Tebex Store.

# How are items priced?

Item are by default priced by the Steam Market price.  You can % discount the items by changing the 'item_price_multiplier' in the config, and you can define custom prices via the Crown Skins Panel.

# How do I get paid?

You can view all your transactions on the crown skins website.
Once a client accepts the trade, the transaction gets listed in the withdrawals page.  You can withdraw 10 transactions at a time due to Steam trade size limits.