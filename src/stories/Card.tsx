import React from 'react';

import './card.css';

export type CardTone = 'neutral' | 'info' | 'success' | 'warning';

export interface CardProps {
  title: string;
  description?: string;
  badge?: string;
  tone?: CardTone;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  badge,
  tone = 'neutral',
  children,
  footer,
}) => {
  const toneClass = `storybook-card--${tone}`;

  return (
    <article className={['storybook-card', toneClass].join(' ')}>
      {badge && <span className="storybook-card__badge">{badge}</span>}

      <div className="storybook-card__body">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        {children && <div className="storybook-card__content">{children}</div>}
      </div>

      {footer && <footer className="storybook-card__footer">{footer}</footer>}
    </article>
  );
};
