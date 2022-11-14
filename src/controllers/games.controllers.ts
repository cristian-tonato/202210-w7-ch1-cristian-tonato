import { NextFunction, Request, Response } from 'express';
import { Games } from '../interfaces/games.js';
import importData from '../mock/data.json' assert { type: 'json' };

// eslint-disable-next-line prefer-const
let data: Array<Games> = importData.Games;

export class GamesController {
    getAll(req: Request, resp: Response) {
        resp.json(data);
        resp.end();
    }

    get(req: Request, resp: Response) {
        resp.json(data);
        resp.end();
    }

    post(req: Request, resp: Response) {
        const newGames = {
            ...req.body,
            id: data.length + 1,
        };
        data.push(newGames);
        resp.json(newGames);
        resp.end();
    }

    patch(req: Request, resp: Response) {
        const updateGames = {
            ...data.find((item) => item.id === +req.params.id),
            ...req.body,
        };
        data[data.findIndex((item) => item.id === +req.params.id)] = updateGames;
        resp.json(updateGames);
        resp.end();
    }

    delete(req: Request, resp: Response, next: NextFunction) {
        if (!data.find((item) => item.id === +req.params.id)) {
            next(new Error('Not found'));
            return;
        }
        data = data.filter((item) => item.id !== +req.params.id);
        resp.json({});
        resp.end();
    }
}
