/*
- should return the initial state when action type is not recognizable
- should open the alert with a message
- should close the alert and set the message to ''
- should open an error alert with a message
*/

import alertReducer, { AlertType, closeAlert, openAlert } from '../slice';

describe('alert-slice', () => {
  test('should return the initial state when action type is not recognizable', () => {
    const initialState = alertReducer(undefined, { type: 'alert/unknown' });

    expect(initialState).toEqual({
      isOpen: false,
      message: '',
      type: 'warning',
    });
  });

  test('should open the alert with a message', () => {
    const previousState = {
      isOpen: false,
      message: '',
      type: 'warning' as AlertType,
    };

    const action = openAlert({
      message: 'alert message',
    });
    const nextState = alertReducer(previousState, action);

    expect(nextState.isOpen).toBeTruthy();
    expect(nextState.message).toEqual('alert message');
    expect(nextState.type).toEqual('warning');
  });

  test('should close the alert and set the message to ""', () => {
    const previousState = {
      isOpen: true,
      message: 'alert message',
      type: 'warning' as AlertType,
    };

    const action = closeAlert();
    const nextState = alertReducer(previousState, action);

    expect(nextState.isOpen).toBeFalsy();
    expect(nextState.message).toEqual('');
    expect(nextState.type).toEqual('warning');
  });

  test('should open an error alert with a message', () => {
    const previousState = {
      isOpen: true,
      message: 'alert message',
      type: 'warning' as AlertType,
    };

    const action = openAlert({
      message: 'alert message',
      type: 'error',
    });
    const nextState = alertReducer(previousState, action);

    expect(nextState.isOpen).toBeTruthy();
    expect(nextState.message).toEqual('alert message');
    expect(nextState.type).toEqual('error');
  });
});
