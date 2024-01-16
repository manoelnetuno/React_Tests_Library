import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('NotFound', () => {
  it("deve conter um heading h2 com o texto 'Page requested not found'", () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toBe('Page requested not found');
  });
  it("deve mostrar a imagem com o texto alternativo 'Clefairy pushing buttons randomly with text I have no idea what i'm doing'", () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText("Clefairy pushing buttons randomly with text I have no idea what i'm doing");
    expect(image).toBeInTheDocument();
  });
});
