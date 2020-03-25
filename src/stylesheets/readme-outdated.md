# Envisio Design System

Last document update: Nov 28, 2019.

The **Envisio Design System (EDS)** is a collection of design tokens, style guides, standards, reusable UI components and design patterns. EDS defines UI methodological language for Envisio applications.

## Project Status
Alpha

## Architecture and Methodologies

EDS is based on a custom implementation of the following methodologies:

* **BEM - Block, Element, Modifier**. Any EDS class selector is Block, Element or Modifier (BEM Entity).
* **Utility class / Atomic CSS library**.
* Custom **ITCSS** implementation.

Read more:
* about BEM: https://en.bem.info/methodology/quick-start/
* utility class framework, Tailwind as example: https://tailwindcss.com/
* ITCSS: https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528

## CSS Classes

EDS CSS styling is defined by class selectors. The EDS class selectors have **low CSS specificity**.

Read about low CSS specificity: https://css-tricks.com/strategies-keeping-css-specificity-low/

### CSS class naming convention
Any EDS CSS Block class is named using following *kebab-case* pattern:

> <span style="font-size:1.5em; color: teal;">[general prefix]-[what]-[specification of [what]]-[state]-[value]</span>

> First two parts ([general prefix], [what]) are mandatory.

>* [general prefix] - unique prefix for all classes.
>* [what] - general name of Block.
>* [specification of [what]] - name extension details.
>* [state] - indicator for specific state only (e.g. :hover).
>* [value] - value of visual property.

Dropdown Menu Block class name:
* <span style="color: red;">Wrong: .dropdown-menu {...}</span>
* <span style="color: green;">Correct: .env-menu-dropdown {...}</span>

("env" is [general prefix], "menu" is [what], "dropdown" is [specification of [what])

Block class name for changing background color if mouse is over:
* <span style="color: red;">Wrong: .env-hover-red-bg-color {...}</span>
* <span style="color: green;">Correct: .env-color-bg-hover-red {...}</span>

("env" is [general prefix], "color" is [what], "bg" is [specification of [what]], "hover" is [state], "red" is [value]).

### EDS BEM class naming convention

* for Block: <span style="color: teal;">[block]</span>
* for Element: <span style="color: teal;">[block]__[element]</span>
* for Modifier: <span style="color: teal;">[block or element]--[modifier]</span>

Dropdown Menu HTML example:

    <ul class="env-menu-dropdown env-menu-dropdown--light">
      <li class="env-menu-dropdown__item"></li>
      <li class="env-menu-dropdown__item"></li>
      <li class="env-menu-dropdown__item env-menu-dropdown__item--selected"></li>
    </ul>

Always use any Modifier class together with dedicated Block or Element.

## EDS ACSS

**EDS ACSS** is utility/atomic CSS classes library provides pregenerated property-value class names. In terms of BEM, any utility class is Block which usually plays universal modifier role. Any ACSS Block name starts with [general prefix] following by letter "a".

    .env-a-p-25 { padding: 25px; }
    .env-a-m-y { margin-left: 10px; margin-right: 10px; }
    .env-a-color-brand-primary { color: #066a8d; }
    .env-a-f-a-content-end { align-content: flex-end; }

Most of class names have self-explanatory definition: .env-a-text-bold, .env-a-font-size-14, .env-a-top-50, .env-a-color-light-green ...

6 specific letters placed after ".env-a-" have next meaning:

* p - padding (.env-a-p...)
* m - margin (.env-a-m...)
* w - width (.env-a-w-...)
* h - height (.env-a-h-...)
* z - z-index (.env-a-z-...)
* f - property related to flexbox (.env-a-f-...)

Examples:

    .env-a-p-top-25 { padding-top: 25px; }
    .env-a-m-left-50- { margin-left: -50px; }
    .env-a-w-100% { width: 100% }
    .env-a-h-1000 { height: 1000px; }
    .env-a-f { display: flex; }
    .env-a-f-1-1-auto { flex: 1 1 auto; }

Letters "a" or "j" placed after ".env-a-f-" have next meaning:

* a - alignment (.env-a-f-a-...)
* j - justification (.env-a-f-j-...)

Examples:

    .env-a-f-j-center: { justify-content: center; }
    .env-a-f-a-start: { align-items: flex-start; }
    .env-a-f-a-content-end: { align-content: flex-end; }

EDS ACSS is designed to be organic part of general EDS BEM implementation.

## EDS BEM

Any Block has unique class name across whole EDS.

### Blocks inside Javascript / JSX

Each EDS Block has its own representation as Javascript function - **Block Function**. Template literal parameter is a list of entities dedicated to the Block. Invocation of the function returns dedicated UI descriptor (e.g. BEM entities class names):

    uiMenuDropdown``; // 'env-menu-dropdown'
    uiMenuDropdown`--light`; // 'env-menu-dropdown env-menu-dropdown--light'

    uiFormRow`__label --short`; // 'env-form-row__label env-form-row__label--short'

EDS ACSS library function receives list of class names without [general prefix] and following "a" letter:

    uiA`f`; // env-a-f
    uiA`f f-a-center w-50`; // 'env-a-f env-a-f-a-center env-a-w-50'

Template literal parameters may have operators:

* `:` - ternary operator
* `()` - grouping
* `#` - variable interpolation

Examples:

    import { uiA } from '../envisio-ui/ui';

    let v = true;
    uiA`f w-50:${v}`; // 'env-a-f env-a-w-50'

    v = false;
    uiA`f w-50:${v}`; // 'env-a-f'
    uiA`f w-100:w-50:${v}`; // 'env-a-f env-w-50'

    v = true;
    uiA`f w-100:w-50:${v}`; // 'env-a-f env-w-100'
    uiA`f (w-100 color-white):w-50:${v}`; // 'env-a-f env-a-w-100 env-a-color-white'
    uiA`f (w-100 color-white):${v}`; // 'env-a-f env-a-w-100 env-a-color-white'

    v = false;
    uiA`f (w-100 color-white):w-50:${v}`; // 'env-a-f env-a-w-50'
    uiA`f (w-100 color-white):${v}`; // 'env-a-f'

    v = 'w-50';
    uiA`f #${v}`; // 'env-a-f env-a-w-50'

### Javascript helpers functions for mixing Block descriptors

* ui([List of Block Functions]) - returns object of React props related to provided Block Function list (e.g. className)
* uiMerge([List of Block Functions]) - returns string as merged list of UI descriptors related to provided Block Function list (e.g. string of BEM entities class names)

Examples:

    import { uiA, uiMenuDropdown } from '../envisio-ui/ui';

    let v = true;
    ui([uiMenuDropdown`--light`, uiA`f h-100%`]); // { className: 'env-menu-dropdown env-menu-dropdown--light env-a-f env-a-h-100%'}
    uiMerge([uiMenuDropdown`--light`, uiA`f h-100%`]); // 'env-menu-dropdown env-menu-dropdown--light env-a-f env-a-h-100%'

### Simplified usage of helper and Block functions

Coming to future EDS library releases.

