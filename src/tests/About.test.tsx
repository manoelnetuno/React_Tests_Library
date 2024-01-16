import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Verifica se a pagina contem as informações sobre a pokedex', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />, { route: '/about' });
    const heading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />, { route: '/about' });

    const P1 = screen.getByText(/This application simulates/i);
    const P2 = screen.getByText(/One can filter Pokémon by type/i);
    expect(P1).toBeInTheDocument();
    expect(P2).toBeInTheDocument();
  });
  test('Teste se a página contém uma imagem de Pokédex com o endereço de src especificado no projeto', () => {
    renderWithRouter(<About />, { route: '/about' });

    const imgPoke = screen.getByAltText(/Pokédex/i);
    const pokeUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imgPoke).toBeInTheDocument();
    expect(imgPoke).toHaveAttribute('src', pokeUrl);
  });
});
