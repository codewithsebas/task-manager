import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskFilter from '@/components/TaskFilter';
import { useTasks } from '@/context/TaskContext';

jest.mock('../../context/TaskContext', () => ({
    useTasks: jest.fn(),
}));

describe('TaskFilter Component', () => {
    const mockGetTasks = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useTasks as jest.Mock).mockReturnValue({
            getTasks: mockGetTasks,
        });
    });

    it('Muestra todos los botones con los estilos iniciales correctos', () => {
        render(<TaskFilter />);

        const allButton = screen.getByRole('button', { name: /todos/i });
        const pendingButton = screen.getByRole('button', { name: /pendientes/i });
        const completedButton = screen.getByRole('button', { name: /completadas/i });

        expect(allButton).toBeInTheDocument();
        expect(pendingButton).toBeInTheDocument();
        expect(completedButton).toBeInTheDocument();

        // Verifica estilos iniciales
        expect(allButton).toHaveClass('bg-gray-500 text-white border-gray-500');
        expect(pendingButton).not.toHaveClass('bg-orange-500 text-white');
        expect(completedButton).not.toHaveClass('bg-green-500 text-white');
    });

    it('Actualiza el filtro activo y llama a getTasks al pulsar el botón', () => {
        render(<TaskFilter />);

        const allButton = screen.getByRole('button', { name: /todos/i });
        const pendingButton = screen.getByRole('button', { name: /pendientes/i });
        const completedButton = screen.getByRole('button', { name: /completadas/i });

        // Click en "Pendientes"
        fireEvent.click(pendingButton);
        expect(mockGetTasks).toHaveBeenCalledWith('pending');
        expect(pendingButton).toHaveClass('bg-orange-500 text-white border-orange-500');
        expect(allButton).not.toHaveClass('bg-gray-500 text-white');

        // Click en "Completadas"
        fireEvent.click(completedButton);
        expect(mockGetTasks).toHaveBeenCalledWith('completed');
        expect(completedButton).toHaveClass('bg-green-500 text-white border-green-500');
        expect(pendingButton).not.toHaveClass('bg-orange-500 text-white');

        // Click en "Todos"
        fireEvent.click(allButton);
        expect(mockGetTasks).toHaveBeenCalledWith(undefined);
        expect(allButton).toHaveClass('bg-gray-500 text-white border-gray-500');
        expect(completedButton).not.toHaveClass('bg-green-500 text-white');
    });

    it('Gestiona correctamente los clics múltiples', () => {
        render(<TaskFilter />);

        const allButton = screen.getByRole('button', { name: /todos/i });
        const pendingButton = screen.getByRole('button', { name: /pendientes/i });

        fireEvent.click(pendingButton);
        fireEvent.click(pendingButton);
        expect(mockGetTasks).toHaveBeenCalledTimes(1); // Llamado una sola vez porque el filtro no cambió

        fireEvent.click(allButton);
        expect(mockGetTasks).toHaveBeenCalledTimes(2); // Ahora cambia el filtro
    });
});
