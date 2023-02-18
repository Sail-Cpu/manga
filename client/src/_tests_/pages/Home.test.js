import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../../pages/Home';

test('should render home', () => {
    render(<Home />);
})