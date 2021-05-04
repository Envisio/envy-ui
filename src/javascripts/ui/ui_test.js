const uiTest = (classFragment) => {

  if (!classFragment || process.env.NODE_ENV !== 'development') {
    return '';
  }

  return `test-${classFragment}`;
};

export default uiTest;
