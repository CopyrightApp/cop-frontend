import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { useRouter } from 'next/navigation'; // Importa useRouter directamente
import Checker from './src/app/checker/page';

beforeEach(() => {
  fetchMock.resetMocks();
});

// Mock useRouter para las pruebas
jest.mock('next/navigation', () => ({
    useRouter: jest.fn().mockReturnValue({
      route: '/checker', // Simula la ruta del enrutador
      pathname: '/checker', // Simula la ruta del enrutador
      query: '', // Simula la query del enrutador
      asPath: '', // Simula el asPath del enrutador
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }),
  }));

test('debe hacer una petición al backend y mostrar la respuesta', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ transcription: 'Transcripción de prueba' }));

  // Renderizar el componente Checker
  const {container} = render(<Checker/>);
    console.log("soy el container",container.innerHTML)
  // Esperar a que la pantalla de carga desaparezca
  await waitFor(() => {
    expect(screen.queryByText('TranscribeButton2')).toBeNull(); // Verificar que la pantalla de carga haya desaparecido
  });

  // Esperar un momento adicional para asegurarnos de que el botón de transcripción se haya renderizado
//   await new Promise(resolve => setTimeout(resolve, 40000)); // Aumentar el tiempo de espera a 40 segundos

  // Buscar el botón de transcripción
  const button = screen.getByTestId('transcribe-button');

  // Ahora puedes hacer clic en el botón de transcripción
  fireEvent.click(button);

  // Esperar a que se realice la petición al backend
  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:4000/transcribe/audio', expect.any(Object));
  });

  // Verificar que la transcripción se muestra en la interfaz de usuario
  const transcription = await screen.findByText('Transcripción de prueba');
  expect(transcription).toBeInTheDocument();
}); // Aumentar el tiempo de espera de la prueba a 40 segundos
