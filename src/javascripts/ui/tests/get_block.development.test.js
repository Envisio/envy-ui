import getBlock from '../get_block.development'
import test, { t } from 'tape';

// const $uiA = 'env-a-'

const iClass = 'color-red'

getBlock('env-a-')`f f-a-center f-0-0-50`;

const assertList = [
  {
    actual: getBlock('env-a-')`f`,
    expected: 'env-a-f',
    testInfo: "f"
  },
  {
    actual: getBlock('env-a-')`f:${true}`,
    expected: 'env-a-f',
    testInfo: "f:${true}"
  },
  {
    actual: getBlock('env-a-')`f:${false}`,
    expected: '',
    testInfo: "f:${false}"
  },
  {
    actual: getBlock('env-a-')`f f-a-center f-0-0-50`,
    expected: 'env-a-f env-a-f-a-center env-a-f-0-0-50',
    testInfo: "f f-a-center f-0-0-50"
  },
  {
    actual: getBlock('env-a-')`f #${iClass} f-0-0-50:${true}`,
    expected: 'env-a-f env-a-color-red env-a-f-0-0-50',
    testInfo: "f #${iClass} f-0-0-50:${true}"
  },
  {
    actual: getBlock('env-a-')`f h-10:${4 === 4} z-1:${false} f-0-0-50:f-0-0-40:${4 === 3} w-100%:w-50%:${true}`,
    expected: 'env-a-f env-a-h-10 env-a-f-0-0-40 env-a-w-100%',
    testInfo: "f h-10:${4 === 4} z-1:${false} f-0-0-50:f-0-0-40:${4 === 3} w-100%:w-50%:${true}"
  },
  {
    actual: getBlock('env-a-')`f (f-b-30 f-s-1):f-0-0-40:${4 === 4} w-100%:w-50%:${false}`,
    expected: 'env-a-f env-a-f-b-30 env-a-f-s-1 env-a-w-50%',
    testInfo: "f (f-b-30 f-s-1):f-0-0-40:${4 === 4} w-100%:w-50%:${false}"
  },
  {
    actual: getBlock('env-a-')`(f-b-30 f-s-1):f-0-0-40:${4 === 4} w-100%:w-50%:${false}`,
    expected: 'env-a-f-b-30 env-a-f-s-1 env-a-w-50%',
    testInfo: "(f-b-30 f-s-1):f-0-0-40:${4 === 4} w-100%:w-50%:${false}"
  },
  {
    actual: getBlock('env-button')`--mint-blue --inactive:${4 === 4} --disabled:${false}`,
    expected: 'env-button env-button--mint-blue env-button--inactive',
    testInfo: "--mint-blue --inactive:${4 === 4} --disabled:${false}"
  },
  {
    actual: getBlock('env-button')`--mint-blue --inactive:${4 === 4} --disabled:${false}`,
    expected: 'env-button env-button--mint-blue env-button--inactive',
    testInfo: "--mint-blue --inactive:${4 === 4} --disabled:${false}"
  },
  {
    actual: getBlock('env-button')`--mint-blue --inactive:--disabled:${4 === 3}`,
    expected: 'env-button env-button--mint-blue env-button--disabled',
    testInfo: "--mint-blue --inactive:--disabled:${4 === 3}"
  },
  {
    actual: getBlock('env-button')`__content --smart --long --inactive:--disabled:${4 === 3}`,
    expected: 'env-button__content env-button__content--smart env-button__content--long env-button__content--disabled',
    testInfo: "__content --long --inactive:--disabled:${4 === 3}"
  },
  {
    actual: getBlock('env-button')`__content --long (--inactive --disabled --ok):--disabled:${4 === 4}`,
    expected: 'env-button__content env-button__content--long env-button__content--inactive env-button__content--disabled env-button__content--ok',
    testInfo: "__content --long (--inactive --disable --ok):--disabled:${4 === 4}"
  }
];

test('A passing test', (assert) => {

  assert.pass('This test will pass.');

  assert.end();
});

assertList.forEach(({actual, expected, testInfo}) => {
  test(testInfo, (assert) => {
    // assert.comment('--------------------- ' + actual);
    assert.equal(
      actual,
      expected,
      expected + ' should match ' + testInfo
    );
    assert.end();
  });
});
