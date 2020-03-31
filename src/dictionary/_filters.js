exports.filterForCategory = (categoryNames) => (prop) => (
  categoryNames.find(categoryName => prop.path[0] === categoryName)
);

exports.filterForFragmentAndUnits = (fragment, that) => {
  if (fragment.content !== that.filterForClassFragment) {
    return false;
  }

  if (fragment.unit === that.filterForClassFragmentUnit) {
    return true;
  }

  if (fragment.unit === '%' && that.filterForClassFragmentUnit === 'percent') {
    return true;
  }

  if ((fragment.unit === '' || fragment.unit === undefined) && (that.filterForClassFragmentUnit === '' || that.filterForClassFragmentUnit === undefined)) {
    return true;
  }

  return false;
};

