import React from 'react';
import { render } from '@testing-library/react';
import { NAV_ITEMS } from '../../../app/components/Sidebar/NavItems';

describe('NAV_ITEMS Snapshot Test', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <div>
        {NAV_ITEMS.map(item => (
          <div key={item.label}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should contain correct labels and routes', () => {
    expect(NAV_ITEMS).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: 'Dashboard', route: '/dashboard' }),
        expect.objectContaining({ label: 'Settings', route: '/settings' }),
        expect.objectContaining({ label: 'Test', route: '/test' }),
      ])
    );
  });
});