module.exports = function(env) {
    // you may extend to other env to produce a production build for example
    return require(`./webpack.${env}.config.js`);
};
