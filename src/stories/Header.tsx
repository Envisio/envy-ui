import React from 'react';

import { Button } from './Button';
import { envisioLogoMarkup } from './assets/envisio-logo-markup';
import './header.css';

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
  <header>
    <div className="storybook-header">
      <a className="storybook-header__brand" href="./" title="Envisio Design System">
        <span
          className="storybook-header__logo"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: envisioLogoMarkup }}
        />
        <div className="storybook-header__title-block">
          <h1>Envisio Design System</h1>
          <p>React Aria + envy-ui building blocks</p>
        </div>
      </a>
      <div>
        {user ? (
          <>
            <span className="welcome">
              Welcome, <b>{user.name}</b>!
            </span>
            <Button size="small" onClick={onLogout} label="Log out" />
          </>
        ) : (
          <>
            <Button size="small" onClick={onLogin} label="Log in" />
            <Button primary size="small" onClick={onCreateAccount} label="Sign up" />
          </>
        )}
      </div>
    </div>
  </header>
);
