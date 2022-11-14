import { GamesController } from '../controllers/games.controllers.js';
import { Router } from 'express';

export const gamesRouter = Router();

const controller = new GamesController();

gamesRouter.get('/', controller.getAll);
gamesRouter.get('/:id', controller.get);
gamesRouter.post('/', controller.post);
gamesRouter.patch('/:id', controller.patch);
gamesRouter.delete('/:id', controller.delete);
