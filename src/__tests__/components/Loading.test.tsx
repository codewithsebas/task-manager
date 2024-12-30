import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '@/components/Loading';

jest.mock('lucide-react', () => ({
  LoaderCircle: jest.fn(() => <svg data-testid="loader-icon" className="animate-spin" />),
}));

describe('Loading Component', () => {
  it('Se visualiza correctamente con una rueda giratoria y texto', () => {
    render(<Loading />);

    // Verifica que el contenedor principal esté presente
    const container = screen.getByTestId('loading-container');
    expect(container).toBeInTheDocument();

    // Verifica que el icono de carga se renderiza
    const loaderIcon = screen.getByTestId('loader-icon');
    expect(loaderIcon).toBeInTheDocument();

    // Verifica que el texto "Cargando" se muestra
    const loadingText = screen.getByText(/cargando/i);
    expect(loadingText).toBeInTheDocument();
  });

  it('Aplica los estilos correctos', () => {
    const { container } = render(<Loading />);

    // Verifica la clase aplicada al contenedor principal
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass(
      'fixed flex items-center justify-center w-full h-full top-0 right-0 left-0 bottom-0 bg-black/30 dark:bg-black/50'
    );

    // Verifica las clases aplicadas al spinner
    const loaderIcon = screen.getByTestId('loader-icon');
    expect(loaderIcon).toHaveClass('animate-spin');
  });
});
