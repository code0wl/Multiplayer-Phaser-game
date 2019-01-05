module.exports = (env = "dev") =>
    // you may extend to other env to produce a production build for example
    require(`./webpack.${env}.config.js`);
