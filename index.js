const express = require('express');
const DaoHelper = require('./dao/util/dao_helper');
const ItemRepository = require('./dao/item_dao');
const LogRepository = require('./dao/log_dao');
const PurposeRepository = require('./dao/purpose_dao');
const bodyParser = require('body-parser');

const app = express();

const jsonParser = bodyParser.json();

app.use(express.static(__dirname + '/frontend/views')); // html
app.use(express.static(__dirname + '/frontend/public')); // js, css, images

const dao = new DaoHelper('./database.sqlite3');
const ItemsRepo = new ItemRepository(dao);
const LogRepo = new LogRepository(dao);
const purposeRepo = new PurposeRepository(dao);
ItemsRepo.createTable().then(()=> LogRepo.createTable()).then(()=> purposeRepo.createTable())
	.catch((err)=> console.log(JSON.stringify(err)));

// endpoint
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.post('/purpose', jsonParser, (req, res) => {
	if(!req.body.name || typeof req.body.revenue === 'undefined') {
		return res.status(400).send({
    		success: 'false',
    		message: 'invalid body => ' + JSON.stringify(req.body)
    	});
	}
  res.send(purposeRepo.create(req.body.name, req.body.revenue));
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});