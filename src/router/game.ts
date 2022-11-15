import { GamesController } from './../controllers/games.controllers.js';
import { GamesFileData } from './../data/games.file.data.js';
import { Router } from 'express';

export const gamesRouter = Router();

const controller = new GamesController(new GamesFileData());

gamesRouter.get('/', controller.getAll.bind(controller));

gamesRouter.get('/:id', controller.get.bind(controller));
gamesRouter.post('/', controller.post.bind(controller));
gamesRouter.patch('/:id', controller.patch.bind(controller));
gamesRouter.delete('/:id', controller.delete.bind(controller));
