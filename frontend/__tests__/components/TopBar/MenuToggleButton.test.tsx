import React from 'react';
import { render } from '@testing-library/react';
import MenuToggleButton from '../../../app/components/TopBar/MenuToggleButton';

// Mock all imports
jest.mock('../../../app/theme/colorSystem', () => ({
  getThemeColor: () => '#000',
}));

jest.mock('../../../app/components/CircularHighlight', () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div>Mocked CircularHighlight {children}</div>,
  }));

describe('MenuToggleButton Snapshot Test', () => {
  it('should match the snapshot when open', () => {
    const { asFragment } = render(
      <MenuToggleButton
        open={true}
        onClick={() => {}}
        hamburgerWhite={false}
        colorMode="light"
        themeVariant="blue"
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should match the snapshot when closed', () => {
    const { asFragment } = render(
      <MenuToggleButton
        open={false}
        onClick={() => {}}
        hamburgerWhite={false}
        colorMode="light"
        themeVariant="blue"
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});