import { ClientController } from '../../controllers/client.controller';
import express = require('express');
var router = express.Router();

router.get('/', ClientController.getClients);
router.post('/', ClientController.createClient);
router.get('/:guid', ClientController.getClient);
router.put('/:guid', ClientController.updateClient);
router.delete('/:guid', ClientController.removeClient);

module.exports = router;
