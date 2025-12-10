import React, { useState } from 'react';
import { ui, uiCard, uiCheckbox, uiA } from 'envy-ui';

export interface ReportPagesSetupProps {
  /** Custom class name */
  className?: string;
  /** Initial checked state for each page option */
  initialChecked?: {
    cover?: boolean;
    overallSummary?: boolean;
    departmentSummary?: boolean;
    details?: boolean;
  };
  /** Callback when checkbox states change */
  onChange?: (checkedPages: {
    cover: boolean;
    overallSummary: boolean;
    departmentSummary: boolean;
    details: boolean;
  }) => void;
}

export const ReportPagesSetup: React.FC<ReportPagesSetupProps> = ({
  className,
  initialChecked = {
    cover: true,
    overallSummary: true,
    departmentSummary: true,
    details: true,
  },
  onChange
}) => {
  const [checkedPages, setCheckedPages] = useState({
    cover: initialChecked.cover ?? true,
    overallSummary: initialChecked.overallSummary ?? true,
    departmentSummary: initialChecked.departmentSummary ?? true,
    details: initialChecked.details ?? true,
  });

  const handleCheckboxChange = (pageType: keyof typeof checkedPages) => {
    const newCheckedPages = {
      ...checkedPages,
      [pageType]: !checkedPages[pageType],
    };
    setCheckedPages(newCheckedPages);
    onChange?.(newCheckedPages);
  };

  const pageOptions = [
    { key: 'cover' as const, label: 'Cover' },
    { key: 'overallSummary' as const, label: 'Overall Summary' },
    { key: 'departmentSummary' as const, label: 'Department Summary' },
    { key: 'details' as const, label: 'Details' },
  ];

  return (
    <div
      {...ui([
        uiCard``,
        className
      ])}
      data-name="Report Pages Setup"
    >
      <div
        {...ui([
          uiA`p-10 f f-column f-gap-10`
        ])}
      >
        <div
          {...ui([
            uiA`text-16 --medium-gray`
          ])}
        >
          Report Pages
        </div>
        
        {pageOptions.map(({ key, label }) => (
          <label
            key={key}
            {...ui([
              uiA`f f-a-center f-gap-10 cursor-pointer`
            ])}
          >
            <input
              type="checkbox"
              checked={checkedPages[key]}
              onChange={() => handleCheckboxChange(key)}
              {...ui([
                uiCheckbox`--check`
              ])}
            />
            <span
              {...ui([
                uiA`text-14 color-default`
              ])}
            >
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};