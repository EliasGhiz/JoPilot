import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Sidebar from '../../../app/components/Sidebar/Sidebar';

// Mock all imports
jest.mock('../../../app/utils/version', () => ({
  appVersion: '1.0.0',
}));

jest.mock('../../../app/components/Sidebar/SidebarItem', () => ({
  SidebarItem: () => <div>Mocked SidebarItem</div>,
}));

jest.mock('../../../app/components/Sidebar/NavItems', () => ({
  NAV_ITEMS: [
    { label: 'Dashboard', route: '/dashboard', icon: <div>MockedIcon</div>, group: 'top' },
    { label: 'Settings', route: '/settings', icon: <div>MockedIcon</div>, group: 'bottom' },
  ],
}));

jest.mock('../../../app/theme/colorSystem', () => ({
  getThemeColor: () => '#000',
}));

describe('Sidebar Snapshot Test', () => {
  it('should match the snapshot', () => {
    const theme = createTheme({
      layout: {
        appBarHeight: 64,
        expandedSidebarWidth: 200,
        collapsedSidebarWidth: 56,
      },
    } as any); // Bypass TypeScript error by asserting as `any`

    const { asFragment } = render(
      <ThemeProvider theme={theme}>
        <Sidebar open={true} themeVariant="red" colorMode="light" />
      </ThemeProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});