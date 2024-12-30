import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskForm from '../../components/TaskForm';
import { TaskContext } from '../../context/TaskContext';

describe('Componente TaskForm', () => {
    const mockAddTask = jest.fn().mockResolvedValueOnce(undefined);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderComponent = () => {
        render(
            <TaskContext.Provider value={{ addTask: mockAddTask, loading: false }}>
                <TaskForm />
            </TaskContext.Provider>
        );
    };

    it('Cierra el modal cuando se pulsa el botón de cierre', () => {
        renderComponent();

        const openModalButton = screen.getByRole('button', { name: /nueva tarea/i });
        fireEvent.click(openModalButton);

        const closeModalButton = screen.getByRole('button', { name: '' });
        fireEvent.click(closeModalButton);

        waitFor(() => {
            const modalTitle = screen.queryByText(/crear tarea/i);
            expect(modalTitle).not.toBeInTheDocument();
        });
    });
});
