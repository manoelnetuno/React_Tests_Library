import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('testes na pagina favorite pokemon', () => {
  test('', () => {
    renderWithRouter(<FavoritePokemon />, { route: '/FavoritePokemon' });
    const NoFav = screen.getByText('No favorite Pokémon found');
    expect(NoFav).toBeInTheDocument();
  });
  test('Apenas são exibidos os Pokémon favoritados', async () => {
    renderWithRouter(<App />, { route: '/pokemon/23' });

    await userEvent.click(screen.getByRole('checkbox'));
    await userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémon' }));
    expect(screen.getByText('Ekans')).toBeInTheDocument();
  });
});
