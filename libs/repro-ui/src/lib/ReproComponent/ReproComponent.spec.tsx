import React from 'react';
import { render } from '@testing-library/react-native';

import ReproComponent from './ReproComponent';

describe('ReproComponent', () => {
  it('should render successfully', () => {
    const { container } = render(< ReproComponent />);
    expect(container).toBeTruthy();
  });
});
