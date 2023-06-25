import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { MockServer } from './MockServer';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get(
    'https://jsonplaceholder.typicode.com/users/1',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          username: 'Bred dummy',
        }),
      );
    },
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Mocking API', () => {
  it('[Fetch success]Should display mocked data correctly and button disable', async () => {
    render(<MockServer />);
    const buttonEl = screen.getByRole('button');
    fireEvent.click(buttonEl);
    expect(
      await screen.findByRole('heading'),
    ).toHaveTextContent('Bred dummy');
    expect(buttonEl).toHaveAttribute('disabled');
  });
  it('[Fetch failure]Should display error msg, no heading and button abled', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/users/1',
        (req, res, ctx) => {
          return res(
            ctx.status(404),
            ctx.json({
              errorMessage: 'Not found',
            }),
          );
        },
      ),
    );
    render(<MockServer />);
    const buttonEl = screen.getByRole('button');
    fireEvent.click(buttonEl);
    expect(
      await screen.findByTestId('error'),
    ).toHaveTextContent('Fetching Failed!');
    expect(screen.queryByRole('heading')).toBeNull();
    expect(buttonEl).not.toHaveAttribute('disabled');
  });
});
