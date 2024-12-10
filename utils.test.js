// Importar las funciones
const { random, askQuestion } = require('./utils.js');

// Mock para evitar la interacción real del usuario en askQuestion
jest.mock('readline', () => {
    return {
        createInterface: jest.fn(() => ({
            question: jest.fn((query, callback) => callback('42')),
            close: jest.fn(),
        })),
    };
});

describe('random', () => {
    test('devuelve un número menor que el máximo', () => {
        const max = 10;
        for (let i = 0; i < 100; i++) {
            const result = random(max);
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThan(max);
        }
    });

    test('devuelve 0 cuando el máximo es 1', () => {
        expect(random(1)).toBe(0);
    });

    test('no debe devolver números negativos', () => {
        const max = 100;
        for (let i = 0; i < 100; i++) {
            expect(random(max)).toBeGreaterThanOrEqual(0);
        }
    });
});

describe('askQuestion', () => {
    test('devuelve el número ingresado por el usuario', async () => {
        const response = await askQuestion('What is the answer to life?', []);
        expect(response).toBe(42);
    });

    test('devuelve null si la opción no es válida', async () => {
        jest.spyOn(global.console, 'log').mockImplementation(() => {});
        jest.mocked(require('readline').createInterface).mockReturnValueOnce({
            question: jest.fn((query, callback) => callback('invalid')),
            close: jest.fn(),
        });
        const response = await askQuestion('Choose a number:', [1, 2, 3]);
        expect(response).toBe(null);
    });
});
