import getBlock from '../get_block'
import test from 'tape';

// const $uiA = 'env-a-'

const assertList = [
  {
    actual: getBlock('env-a-')`f`,
    expected: 'env-a-f',
    testInfo: "f"
  },
  {
    actual: getBlock('env-a-')`f f-a-center f-0-0-50`,
    expected: 'env-a-f env-a-f-a-center env-a-f-0-0-50',
    testInfo: "f f-a-center f-0-0-50"
  },
  {
    actual: getBlock('env-a-')`f h-10:${4 === 4} z-1:${false} f-0-0-50:f-0-0-40:${4 === 3} w-100%:w-50%:${true}`,
    expected: 'env-a-f env-a-h-10 env-a-f-0-0-40 env-a-w-100%',
    testInfo: "f h-10:${4 === 4} z-1:${false} f-0-0-50:f-0-0-40:${4 === 3} w-100%:w-50%:${true}"
  }
]

test('A passing test', (assert) => {

  assert.pass('This test will pass.');

  assert.end();
});

assertList.forEach(({actual, expected, testInfo}) => {
  test(testInfo, (assert) => {
    assert.equal(
      actual,
      expected,
      expected + ' should match ' + testInfo
    );
    assert.end();
  });
});
