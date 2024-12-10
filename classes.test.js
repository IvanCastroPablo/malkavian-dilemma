const {
    random,
} = require('./utils.js')

const { 
    ActivePlayer, 
    NonActivePlayer 
} = require('./classes.js');

// Mock para `random` y `askQuestion` para tener resultados controlados
jest.mock('./utils', () => ({
    random: jest.fn(),
    askQuestion: jest.fn(),
}));

describe('ActivePlayer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('constructor inicializa correctamente las propiedades', () => {
        const player = new ActivePlayer({ name: 'prey', pool: 10 });
        expect(player.name).toBe('prey');
        expect(player.pool).toBe(10);
        expect(player.previousMod).toBeNull();
        expect(player.victoryPoints).toBe(0);
        expect(player.chosenStrategy).toBeNull();
    });

    test('estrategia optimist genera guess 3 o 4', () => {
        random.mockReturnValueOnce(0).mockReturnValueOnce(1);
        const player = new ActivePlayer();
        player.optimist();
        expect(player.guess).toBe(3);
        player.optimist();
        expect(player.guess).toBe(4);
    });

    test('selectActiveStrategy asigna correctamente la estrategia', async () => {
        const player = new ActivePlayer();
        require('./utils').askQuestion.mockResolvedValue(2);
        await player.selectActiveStrategy();
        expect(player.chosenStrategy).toBe(player.delusional);
    });
});

describe('NonActivePlayer', () => {
    beforeEach(() => {
        NonActivePlayer.nonActiveRegistry = []; // Limpia el registro
        jest.clearAllMocks();
    });

    test('constructor agrega jugadores al registro estático', () => {
        const player1 = new NonActivePlayer({ name: 'acting player' });
        const player2 = new NonActivePlayer({ name: 'cosa' });
        expect(NonActivePlayer.nonActiveRegistry).toContain(player1);
        expect(NonActivePlayer.nonActiveRegistry).toContain(player2);
    });

    test('estrategia clever ajusta la choice según pool', () => {
        const player = new NonActivePlayer({ pool: 2 });
        random.mockReturnValueOnce(0).mockReturnValueOnce(1);
        player.clever();
        expect(player.choice).toBe(1); // pool < 5
        player.pool = 1;
        player.clever();
        expect(player.choice).toBe(3); // pool == 1
    });

    test('selectNonActiveStrategy asigna correctamente la estrategia', async () => {
        const player = new NonActivePlayer({ name: 'Eve' });
        require('./utils').askQuestion.mockResolvedValue(1);
        await player.selectNonActiveStrategy();
        expect(player.chosenStrategy).toBe(player.conservative);
    });

    test('selectStrategyAllNonActive llama a las funciones de estrategia', async () => {
        const player1 = new NonActivePlayer({ name: 'Player 1' });
        const player2 = new NonActivePlayer({ name: 'Player 2' });
        jest.spyOn(player1, 'selectNonActiveStrategy').mockResolvedValue();
        jest.spyOn(player2, 'selectNonActiveStrategy').mockResolvedValue();

        await NonActivePlayer.selectStrategyAllNonActive();
        expect(player1.selectNonActiveStrategy).toHaveBeenCalled();
        expect(player2.selectNonActiveStrategy).toHaveBeenCalled();
    });
});