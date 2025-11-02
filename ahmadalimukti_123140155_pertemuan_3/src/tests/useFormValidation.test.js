import { renderHook, act } from '@testing-library/react';
import { useFormValidation } from '../hooks/useFormValidation';

describe('useFormValidation', () => {
  const initialState = { title: '', author: '', status: '' };

  test('should initialize with initial state', () => {
    const { result } = renderHook(() => useFormValidation(initialState));
    expect(result.current.values).toEqual(initialState);
    expect(result.current.errors).toEqual({});
  });

  test('should validate empty form', () => {
    const { result } = renderHook(() => useFormValidation(initialState));
    
    act(() => {
      result.current.validate