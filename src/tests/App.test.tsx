import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testando o componente App.tsx', () => {
  test('verifica se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />, { route: '/' });
    const HomeLINK = screen.getByRole('link', { name: /home/i });
    const AboutLINK = screen.getByRole('link', { name: /about/i });
    const FavPokeLINK = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(HomeLINK).toBeInTheDocument();
    expect(AboutLINK).toBeInTheDocument();
    expect(FavPokeLINK).toBeInTheDocument();
  });
  test('Verifica se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação.', async () => {
    const { user } = renderWithRouter(<App />, { route: '/about' });

    expect(screen.getByText(/About Pokédex/i)).toBeInTheDocument();

    const HomeLINK = screen.getByRole('link', { name: /Home/i });
    await user.click(HomeLINK);
    expect(screen.getByText(/Encountered Pokémon/i)).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', async () => {
    const { user } = renderWithRouter(<App />, { route: '/favorites' });

    expect(screen.getByText(/No favorite Pokémon found/i)).toBeInTheDocument();

    const AboutLINK = screen.getByRole('link', { name: /About/i });
    await user.click(AboutLINK);
    expect(screen.getByText(/About Pokédex/i)).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', async () => {
    const { user } = renderWithRouter(<App />, { route: '/' });

    expect(screen.getByText(/Encountered Pokémon/i)).toBeInTheDocument();

    const FavPokeLINK = screen.getByRole('link', { name: /Favorite Pokémon/i });
    await user.click(FavPokeLINK);
    expect(screen.getByText(/No favorite Pokémon found/i)).toBeInTheDocument();
  });
});
