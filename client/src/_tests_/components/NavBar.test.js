import { fireEvent, render, screen } from '@testing-library/react';
import NavBar from '../../components/navigation/NavBar';
import Tabs from '../../components/navigation/Tabs';

test('should open NavBar component', () => { 
    render(<NavBar />);
    const navBarIcon = document.querySelector('.nav-bar-menu-icon');
    const navBar = document.querySelector('.nav-bar');

    expect(navBar.getAttribute('class')).toBe('nav-bar ');
    expect(navBarIcon.getAttribute('style')).toBe(null);

    fireEvent.click(navBarIcon);

    expect(navBar.getAttribute('class')).toBe('nav-bar active');
    expect(navBarIcon.getAttribute('style')).toBe('transform: rotate(-90deg);');
})

test('should open subMenu', () => {
    render(<Tabs name='MANGAS' submenu={["TYPE", "CATEGORY", "NOUVEAUTES"]} />);
    const tabsIcon = document.querySelector('.tabs-header .more-icon');
    const tabsName = document.querySelector('.tabs-header > h1');
    const subMenu = document.querySelector('.submenu');

    expect(tabsName.textContent).toBe('MANGAS');
    expect(subMenu.getAttribute('style')).toBe('display: none;');

    fireEvent.click(tabsIcon);

    expect(subMenu.getAttribute('style')).toBe('display: block;');
    expect(subMenu.innerHTML).toBe('<li class=\"sub-tabs\">TYPE</li><li class=\"sub-tabs\">CATEGORY</li><li class=\"sub-tabs\">NOUVEAUTES</li>');
})