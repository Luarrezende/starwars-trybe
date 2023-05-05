import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Provider from '../Context/Provider';
import App from '../App';
import mockData from '../tests/helpers/mockData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('testando app', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(mockData)
    });
    render(
      <Provider>
        <App />
      </Provider>
    )
  });
  test('verifica se o input de texto funciona', async () => {
    const input = screen.getByTestId('name-filter')
    userEvent.clear(input)
    userEvent.type(input, 'T')

    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /Tatooine/i })).toBeInTheDocument();
    })
  })
  test('Verifique se renderiza os elementos conforme os filters', async () => {
    const column = screen.getByTestId('column-filter')
    expect(column).toBeInTheDocument();

    const compare = screen.getByTestId('comparison-filter')
    expect(compare).toBeInTheDocument();

    const filter = screen.getByRole('spinbutton');
    expect(filter).toBeInTheDocument();

    const addFilter = screen.getByRole('button', {  name: /addFiltro/i});
    expect(addFilter).toBeInTheDocument();

    const removeAll = await screen.findByRole('button', {  name: /Remover todas filtragens/i});
    expect(removeAll).toBeInTheDocument();

    userEvent.selectOptions(column, 'diameter');
    expect(column).toHaveValue('diameter');

    userEvent.selectOptions(compare, 'menor que');
    expect(compare).toHaveValue('menor que');

    userEvent.clear(filter);
    userEvent.type(filter, '8900');
    expect(filter).toHaveValue(8900);

    act(() => {
      userEvent.click(addFilter);
    });

    await waitFor(() => {
      expect(screen.queryByRole('cell', {  name: /Tatooine/i})).not.toBeInTheDocument();
      expect(screen.getByRole('cell', {  name: /Endor/i})).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(removeAll);
    });

    userEvent.selectOptions(column, 'population');
    expect(column).toHaveValue('population');

    userEvent.selectOptions(compare, 'maior que');
    expect(compare).toHaveValue('maior que');

    userEvent.clear(filter);
    userEvent.type(filter, '100000000000');
    expect(filter).toHaveValue(100000000000);

    act(() => {
      userEvent.click(addFilter);
    });

    await waitFor(() => {
      expect(screen.queryByRole('cell', {  name: /Tatooine/i})).not.toBeInTheDocument();
      expect(screen.getByRole('cell', {  name: /Coruscant/i})).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(removeAll);
    });

    userEvent.selectOptions(column, 'population');
    expect(column).toHaveValue('population');

    userEvent.selectOptions(compare, 'igual a');
    expect(compare).toHaveValue('igual a');

    userEvent.clear(filter);
    userEvent.type(filter, '1000000000000');
    expect(filter).toHaveValue(1000000000000);

    act(() => {
      userEvent.click(addFilter);
    });

    await waitFor(() => {
      expect(screen.queryByRole('cell', {  name: /Tatooine/i})).not.toBeInTheDocument();
      expect(screen.getByRole('cell', {  name: /Coruscant/i})).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(removeAll);
    });

    await waitFor(() => {
      expect(screen.getAllByRole('cell')).toHaveLength(130);
      expect(column.children).toHaveLength(5);
    });

    userEvent.selectOptions(column, 'diameter');
    userEvent.selectOptions(compare, 'maior que');
    userEvent.clear(filter);
    userEvent.type(filter, '8900');

    act(() => {userEvent.click(addFilter)})

    await waitFor(() => {
      expect(column.children).toHaveLength(4);
      expect(screen.getAllByRole('cell')).toHaveLength(91);
      const removeBtn = screen.getAllByTestId('rmv');
      expect(removeBtn).toHaveLength(1);
    });

    userEvent.selectOptions(column, 'population');
    userEvent.selectOptions(compare, 'menor que');
    userEvent.clear(filter);
    userEvent.type(filter, '1000000');

    act(() => {userEvent.click(addFilter)})

    await waitFor(() => {
      expect(column.children).toHaveLength(3);
      expect(screen.getAllByRole('cell')).toHaveLength(26);
      const removeBtn = screen.getAllByTestId('rmv');
      expect(removeBtn).toHaveLength(2);
    });

    userEvent.selectOptions(column, 'orbital_period');
    userEvent.selectOptions(compare, 'igual a');
    userEvent.clear(filter);
    userEvent.type(filter, '4818');

    act(() => {userEvent.click(addFilter)})

    await waitFor(() => {
      expect(column.children).toHaveLength(2);
      expect(screen.getAllByRole('cell')).toHaveLength(13);
      const removeBtn = screen.getAllByTestId('rmv');
      expect(removeBtn).toHaveLength(3);
    });

    userEvent.selectOptions(column, 'surface_water');
    userEvent.selectOptions(compare, 'maior que');
    userEvent.clear(filter);
    userEvent.type(filter, '6');

    act(() => {userEvent.click(addFilter)})

    await waitFor(() => {
      expect(column.children).toHaveLength(1);
      expect(screen.getAllByRole('cell')).toHaveLength(13);
      const removeBtn = screen.getAllByTestId('rmv');
      expect(removeBtn).toHaveLength(4);
    });

    const rmv = await screen.findAllByTestId('rmv');

    userEvent.click(rmv[3]);

    await waitFor(() => {
      expect(column.children).toHaveLength(2);
      expect(screen.getAllByRole('cell')).toHaveLength(13);
      const removeBtn = screen.getAllByTestId('rmv');
      expect(removeBtn).toHaveLength(3);
    });
  });
});
