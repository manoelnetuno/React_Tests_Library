import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const PikaRouter = '/pokemon/25';
describe('testando o pokemon ', () => {
  test('Verifica se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
    expect(screen.getByTestId('pokemon-weight').innerHTML).toBe('Average weight: 6.0 kg');
    expect(screen.getByRole('img', { name: /pikachu sprite/i })).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(screen.getByRole('img', { name: /pikachu sprite/i })).toHaveAttribute('alt', 'Pikachu sprite');
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon. O link deve ter a URL /pokemon/<id>, em que <id> é o id do Pokémon exibido.', async () => {
    renderWithRouter(<App />);
    const PikaLink = screen.getByRole('link', { name: /more details/i });
    expect(PikaLink).toBeInTheDocument();

    await userEvent.click(PikaLink);

    const PikaDet = screen.getByText(/Pikachu Details/i);
    expect(PikaDet).toBeInTheDocument();
    expect(window.location.pathname).toBe(PikaRouter);
  });
  test('Verifica se o card com nome e tipo corretos do Pokémon deve aparecer na tela', () => {
    renderWithRouter(<App />, { route: PikaRouter });

    const Name = screen.getByTestId('pokemon-name');
    const Type = screen.getByTestId('pokemon-type');
    expect(Name.innerHTML).toBe('Pikachu');
    expect(Type.innerHTML).toBe('Electric');
  });
  test('Os Pokémons favoritados tem um ícone de estrela', async () => {
    renderWithRouter(<App />, { route: PikaRouter });

    await userEvent.click(screen.getByRole('checkbox'));

    const favImg = screen.getByAltText(/Pikachu is marked as favorite/i);
    const srcPokeImg = '/star-icon.png';
    expect(favImg).toBeInTheDocument();
    expect(favImg).toHaveAttribute('src', srcPokeImg);
  });
});
