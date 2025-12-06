import { eq, split, without, isEmpty, memoize, values } from 'lodash';

import { $uiA } from '../../from-dictionary/javascripts/block_raw_name';

const _getAcssClasses = (block, predicates, fragment, i) => {

  let thisBlock = block;
  let isRawClasses = false;
  const classNames = fragment.split(/(?!\(.*)\s(?![^(]*?\))/g).reduce((acc, el) => {
    let classFragment = el;
    let classFragmentArr = [];
    let classesString = '';

    if (eq(classFragment.substr(-1), ':')) {
      classFragment = classFragment.slice(0, -1);
      classFragmentArr = without(split(classFragment, ':', 2), '') || [];

      if (isEmpty(classFragmentArr)) {
        classFragmentArr[0] = classFragment;
      }

      if (!predicates.shift()) {
        if (classFragmentArr.length < 2) {
          return acc;
        }

        [, classFragment] = classFragmentArr;
      } else {
        [classFragment] = classFragmentArr;
      }
    } else if (eq(classFragment.substr(-1), '#')) {
      classFragment = predicates.shift();

      if (!classFragment) {
        return acc;
      }
    }

    const classFragmentsInBrackes = classFragment.match(/\(([^)]+)\)/);

    if (classFragmentsInBrackes) {
      // console.log('this fragments in brackets ', classFragmentsInBrackes[1]);

      classFragment = _getAcssClasses(block, [], classFragmentsInBrackes[1], 1);
      isRawClasses = true;
    }

    classesString = !isRawClasses ? `${thisBlock}${classFragment} ` : `${classFragment} `;

    if (eq(classesString, `${$uiA} `)) {
      classesString = '';
    }

    return `${acc}${classesString}`;
  }, '');

  return classNames;
};

const _getBlockClasses = (block, predicates, fragment, i, useElementAsBlock = false, element = '') => {
  // console.log('block ', block);
  let thisBlock = block;
  let thisElement = element;
  const classNames = fragment.split(/(?!\(.*)\s(?![^(]*?\))/g).reduce((acc, el) => {
    let classFragment = el;
    let classFragmentArr = [];
    let classesString = '';

    if (eq(classFragment.substr(-1), ':')) {
      classFragment = classFragment.slice(0, -1);
      classFragmentArr = without(split(classFragment, ':', 2), '') || [];

      if (isEmpty(classFragmentArr)) {
        classFragmentArr[0] = classFragment;
      }

      if (!predicates.shift()) {
        if (classFragmentArr.length < 2) {
          return acc;
        }

        [, classFragment] = classFragmentArr;
      } else {
        [classFragment] = classFragmentArr;
      }
    } else if (eq(classFragment.substr(-1), '#')) {
      classFragment = predicates.shift();

      if (!classFragment) {
        return acc;
      }
    }

    const classFragmentsInBrackes = classFragment.match(/\(([^)]+)\)/);

    if (classFragmentsInBrackes) {
      // console.log('this fragments in brackets ', classFragmentsInBrackes[1]);

      classFragment = _getBlockClasses(block, [], classFragmentsInBrackes[1], 1, thisElement ? true : false, thisElement);
    }

    switch (classFragment.substr(0, 2)) {
      case ('__'):
        classesString = `${classFragment}`;
        thisBlock = `${thisBlock}${classesString}`;
        thisElement = thisBlock;
        break;
      case ('--'):
        if (useElementAsBlock) {
          thisBlock = thisElement;
        }
        classesString = ` ${thisBlock}${classFragment}`;
        break;
      default:
        classesString = `${classFragment} `;
    }

    return `${acc}${classesString}`;
  }, (i === 0) ? thisBlock : '');

  return classNames;
};

// TODO: Eugene should consider another function with auto key and memoization limit
const getBlock = blockName => memoize(
  (elements, ...predicates) => {
    // console.log('I am running...------------------------------------------------------');
    const thisBlock = blockName;

    const classProcessor = (eq(blockName, $uiA)) ? _getAcssClasses : _getBlockClasses;

    return elements.reduce((acc, el, i) => `${acc} ${classProcessor(thisBlock, predicates, el, i)}`, '').trim().replace(/\s+/g, ' ');
  },
  (...args) => {
    // console.log(`${blockName}|${values(args).join('|')}`);
    return `${blockName}|${values(args).join('|')}`;
  },
);

export default getBlock;
