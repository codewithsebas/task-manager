import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from '../../components/TaskList';
import { TaskContext } from '../../context/TaskContext';
import { useTasks } from '../../context/TaskContext';

jest.mock('../../context/TaskContext', () => ({
    ...jest.requireActual('../../context/TaskContext'),
    useTasks: jest.fn(),
}));

describe('TaskList Component', () => {
    it('Muestra el estado de carga', () => {
        (useTasks as jest.Mock).mockReturnValue({ tasks: [], loading: true, error: null });

        render(
            <TaskContext.Provider value={{ tasks: [], loading: true, error: null }}>
                <TaskList />
            </TaskContext.Provider>
        );
        expect(screen.getByText(/cargando/i)).toBeInTheDocument();
    });


    it('Muestra un mensaje de error si se produce un error', () => {
        const errorMessage = 'Failed to fetch tasks';

        (useTasks as jest.Mock).mockReturnValue({ tasks: [], loading: false, error: errorMessage });

        render(
            <TaskContext.Provider value={{ tasks: [], loading: false, error: errorMessage }}>
                <TaskList />
            </TaskContext.Provider>
        );

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('Muestra un mensaje cuando no hay tareas disponibles', () => {
        (useTasks as jest.Mock).mockReturnValue({ tasks: [], loading: false, error: null });

        render(
            <TaskContext.Provider value={{ tasks: [], loading: false, error: null }}>
                <TaskList />
            </TaskContext.Provider>
        );

        expect(screen.getByText(/crea tus tareas del día!/i)).toBeInTheDocument();
    });

    it('Realiza las tareas cuando están disponibles', () => {
        const mockTasks = [
            { _id: '1', title: 'Task 1', description: 'Description for task 1' },
            { _id: '2', title: 'Task 2', description: 'Description for task 2' },
        ];

        (useTasks as jest.Mock).mockReturnValue({ tasks: mockTasks, loading: false, error: null });

        render(
            <TaskContext.Provider value={{ tasks: mockTasks, loading: false, error: null }}>
                <TaskList />
            </TaskContext.Provider>
        );

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
});
