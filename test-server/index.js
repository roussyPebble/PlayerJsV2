const Express = require('express');
const App = Express();
const Path = require('path');

App.use(Express.static('build'));

App.get('/playerjs/testPage/:type/examples', (req, res, next) => {
    res.sendFile(Path.join(__dirname, `../examples/${req.params.type}`, 'index.html'));
});

App.listen(8787, () => {
    console.log(`PlayerJs-test-server is running on 8787`);
});