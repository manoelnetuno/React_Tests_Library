import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste no componente pokedex', () => {
  test("Verifica se contem um heading h2 com o texto 'Encountered Pokémon' ", () => {
    renderWithRouter(<App />);

    expect(screen.getByText(/Encountered Pokémon/i)).toBeInTheDocument();
  });
  test('Verifica se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    renderWithRouter(<App />, { route: '/' });
    expect(screen.getByRole('heading', { name: /encountered pokémon/i })).toBeInTheDocument();
    const skipBtn = screen.getByRole('button', { name: /Próximo Pokémon/i });
    const pokemonNames = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];
    const actions = pokemonNames.map((pokemonName) => {
      return async () => {
        await userEvent.click(skipBtn);
        expect(screen.getByText(pokemonName)).toBeInTheDocument();
      };
    });
    await Promise.all(actions);
  });
  test('Verifica se aparece apenas 01 Pokémon por vez"', () => {
    renderWithRouter(<App />, { route: '/' });
    const OnePoke = screen.getAllByTestId('pokemon-name');
    expect(OnePoke.length).toBe(1);
  });
  test('Teste se a Pokédex tem um botão de filtro para cada tipo', () => {
    renderWithRouter(<App />, { route: '/' });
    const Typebtn = screen.getAllByTestId('pokemon-type-button');
    expect(Typebtn.length).toBe(7);
  });
  test('Verifica se a pokedex tem filtros de acordo com tipo e se tem botão all sempre on', async () => {
    renderWithRouter(<App />, { route: '/' });
    expect(screen.getAllByTestId('pokemon-type-button').length).toBe(7);
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();

    const PoisonBtn = screen.getByRole('button', { name: /poison/i });
    expect(PoisonBtn).toBeInTheDocument();
    await userEvent.click(PoisonBtn);

    expect(screen.getByText(/ekans/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /all/i }));
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
