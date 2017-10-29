import express = require('express');
var router = express.Router();

import { ClientController } from '../../controllers/client.controller';

router.get('/', ClientController.getClients);
router.post('/', ClientController.createClient);
router.get('/:guid', ClientController.getClient);
router.put('/:guid', ClientController.updateClient);
router.delete('/:guid', ClientController.removeClient);

module.exports = router;