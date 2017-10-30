import { SessionController } from '../../controllers/session.controller';
import express = require('express');
var router = express.Router();

router.get('/', SessionController.getSessions);
router.post('/', SessionController.createSession);
router.get('/:id', SessionController.getSession);
router.put('/:id', SessionController.updateSession);
router.delete('/:id', SessionController.removeSession);

module.exports = router;
