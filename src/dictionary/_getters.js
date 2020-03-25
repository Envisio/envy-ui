exports.getFragmentIterator = (mainFragmentObject, fragmentObject) => (
  fragmentObject.iterator || mainFragmentObject['default-iterator']
);

exports.getMarkupFile = (mainFragmentObject, fragmentObject) => (
  fragmentObject['markup-file'] || mainFragmentObject['markup-file']
);

exports.getFragmentUnit = (mainFragmentObject, fragmentObject) => (
  fragmentObject.unit || mainFragmentObject['default-unit'] || ''
);

exports.getUnitNameFromAlias = (alias) => (
  `${alias ? `-${alias.split('.').slice(-1)[0].slice(0, -1)}` : ''}`
);

/* exports.getFragmentUnit = (mainFragmentObject, fragmentObject) => {

  const defaultUnit = mainFragmentObject['default-unit'];
  const { unit } = fragmentObject;

  if (!defaultUnit && !unit) {
    return '';
  }

  return `${unit || defaultUnit}`;
}; */
