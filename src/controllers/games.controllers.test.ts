import { GamesController } from './games.controllers';
import { Request, Response } from 'express';

describe('Given GamesController', () => {
    const gamesController = new GamesController();
    const req = {};
    const resp = {
        json: jest.fn(),
        end: jest.fn(),
    };
    test('Then ... getAll', () => {
        gamesController.getAll(req as Request, resp as unknown as Response);
        expect(resp.json).toHaveBeenCalled();
        expect(resp.end).toHaveBeenCalled();
    });
});
