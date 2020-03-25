import { eq } from 'lodash';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import sanitizeFilename from 'sanitize-filename';

import { uiGp, uiA, uiVisual } from '../ui';
import { mimeTypes } from '../settings';

export const uiHiddenContainerClass = `${uiGp}js-hidden-container`;
export const uiExportContainerClass = `${uiGp}js-export-container`;

function exportImage({
  container, mimeType, fileName, visualType,
} = {}) {
  const PIXEL_SIZE_LIMIT = 3300;
  const sanitizedFileName = sanitizeFilename(fileName);
  let exportElement;
  let exportElementWidth;
  let exportElementHeight;
  const $container = $(container);
  const toImage = eq(mimeType, mimeTypes.svg) ? domtoimage.toSvg : domtoimage.toPng;
  let exportMessage;

  $('body')
    .append(`
      <div class="${uiHiddenContainerClass}" style="font-family: Source Sans Pro, Arial, sans-serif; position: fixed; left:-99900px; top:-99900px; z-index: -1;">
        <div class="${uiExportContainerClass}" style="overflow:hidden;">
        </div>
      </div>
    `);

  const $hiddenContainer = $(`.${uiHiddenContainerClass}`);
  const $exportContainer = $(`.${uiExportContainerClass}`);

  if (eq(visualType, 'TABLE')) {
    const $clonedHotContainer2 = $container.clone();
    const $clonedHot = $clonedHotContainer2.find('.handsontable.rc-pa-hands-on-table');
    const $internalSizeElement = $clonedHot.find('.ht_master .wtHider');
    const tableElementWidth = $internalSizeElement.width() || 0;
    const tableElementHeight = $internalSizeElement.height() || 0;

    if (tableElementWidth > PIXEL_SIZE_LIMIT || tableElementHeight > PIXEL_SIZE_LIMIT) {
      return 'PNG export file size is too large.';
    }

    $clonedHotContainer2
      .find(`.${uiVisual`__content`}`)
      .css({
        'margin-left': '15px',
        'margin-right': '15px',
        width: `${tableElementWidth}px`,
        height: `${tableElementHeight}px`,
      })
      .end()
      .find('.ht_master .wtHolder')
      .css({ width: `${tableElementWidth}px`, height: `${tableElementHeight}px` });

    $clonedHot.removeAttr('id').css({ width: `${tableElementWidth}px`, height: `${tableElementHeight}px` });
    $clonedHotContainer2.find(`.${uiVisual`__header`}, .${uiVisual`__info-text`}`).css({ width: `${tableElementWidth}px` });
    $exportContainer.append($clonedHotContainer2);

    $exportContainer.css({
      width(index, value) {
        return `${parseFloat(value) * 2}px`;
      },
      height(index, value) {
        return `${parseFloat(value) * 2}px`;
      },
    });

    $clonedHotContainer2.css({ width: `${tableElementWidth}px` }).addClass(uiA`transform-scale-2 transform-origin-left-top`);
    [exportElement] = $exportContainer;
  } else if (eq(visualType, 'SUMMARY')) {
    const $clonedSummary = $container.clone();
    const $visualContent = $container.find(`.${uiVisual``}`);
    $clonedSummary.addClass(uiA`transform-scale-2 transform-origin-left-top`);

    $clonedSummary.removeClass(uiA`absolute w-100% h-100%`);
    exportElementWidth = $visualContent.width();
    exportElementHeight = $visualContent.height();

    if (exportElementWidth > PIXEL_SIZE_LIMIT || exportElementHeight > PIXEL_SIZE_LIMIT) {
      return 'PNG export file sizes is too large.';
    }
    $clonedSummary.css({ width: exportElementWidth, height: exportElementHeight });
    $exportContainer.css({ width: exportElementWidth * 2, height: exportElementHeight * 2 });
    $exportContainer.append($clonedSummary);
    [exportElement] = $exportContainer;
  } else exportElement = container;

  if (!exportElement) { return 'Image Export Error.'; }

  toImage(exportElement, { bgcolor: '#ffffff' })
    .then((dataUrl) => {
      const image = new Image();
      image.src = dataUrl;
      saveAs(dataUrl, sanitizedFileName);
    }).catch((e) => {
      exportMessage = 'Image export error.';
      console.warn(exportMessage, e);
    }).finally(() => {
      $hiddenContainer.remove();
    });

  return exportMessage;
}

export default exportImage;
