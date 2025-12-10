import React from 'react';
import { useReactiveVar, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ui, uiA, uiButton, uiFormRow, uiTable } from 'envy-ui';
import AssessmentCycleList from './assessmentCycleList';
import { deletePopupOpen, popupData } from '../globalVars';
import DeletePopup from './deletePopup';
import { DESTROY_ASSESSMENT_CYCLE, CORPORATION } from '../graphqls';
import { fxSuccess } from '../../util/notification_fx';

export default function AssessmentCycles() {
  const reactiveDeletePopupOpen = useReactiveVar(deletePopupOpen);
  const reactivePopupData = useReactiveVar(popupData);

  const [destroyAssessmentCycle] = useMutation(DESTROY_ASSESSMENT_CYCLE, {
    update(
      cache,
      {
        data: {
          destroyAssessmentCycle: {
            assessmentCycle: { id },
          },
        },
      }
    ) {
      const {
        corporation,
        corporation: { assessmentCycles },
      } = cache.readQuery({ query: CORPORATION });
      const resultedAssessmentCycles = assessmentCycles.filter(ac => ac.id !== id);
      cache.writeQuery({
        query: CORPORATION,
        data: { corporation: { ...corporation, assessmentCycles: [...resultedAssessmentCycles] } },
      });
    },
    onCompleted({
      destroyAssessmentCycle: {
        assessmentCycle: { name },
      },
    }) {
      fxSuccess(`${name} deleted successfully.`);
    },
  });

  const onConfirm = () => {
    destroyAssessmentCycle({ variables: { targetAssessmentCycleId: reactivePopupData.toBeDeletedId } });
    popupData({ toBeDeletedName: '', toBeDeletedId: '' });
    deletePopupOpen(false);
  };

  const onClose = () => {
    popupData({ toBeDeletedName: '', toBeDeletedId: '' });
    deletePopupOpen(false);
  };

  const inProgressWarning = reactivePopupData.hasInProgressAssessments
    ? `You are deleting an assessment cycle linked to assessments that are still in progress.
    Proceeding with this action will cause these candidates to be assigned the default cycle and all scores will reset. `
    : '';

  return (
    <>
      <div {...ui([uiFormRow``, uiA`m-top-large p-x w-100%`])}>
        <Link to="/new" {...ui([uiButton`--mint-blue`, uiA`m-left-auto`])}>
          <span {...ui([uiButton`__content`])}>
            <span>+ New Assessment Cycle</span>
          </span>
        </Link>
      </div>
      <div {...ui([uiTable``, uiA`f-1-1-auto m-bottom w-min-1275`])}>
        <div {...ui([uiTable`__header`, uiA`m-x p-y-none`])}>
          <div {...ui([uiTable`__cell`, uiA`f-0-0-20% p-x w-min-150 w-max-425`])}>Name</div>
          <div {...ui([uiTable`__cell`, uiA`f-column f-0-0-300 f-j-center border-left-light`])}>
            <span {...ui([uiA`f f-center w-100% h-55%`])}>Initial</span>
            <span {...ui([uiA`f w-100% relative h-45% font-size-12 h-min-20`])}>
              <span {...ui([uiA`f f-0-0-100 f-center color-bg-gray-white`])}>Start</span>
              <span {...ui([uiA`f f-0-0-100 f-center color-bg-gray-white m-x-2`])}>End</span>
              <span {...ui([uiA`f f-0-0-100 f-center color-bg-gray-white`])}>Notification</span>
            </span>
          </div>

          <span {...ui([uiTable`__cell`, uiA`f-column f-0-0-300 f-j-center border-left-panel border-right-panel`])}>
            <span {...ui([uiA`f f-center w-100% h-55%`])}>Interim</span>
            <span {...ui([uiA`f w-100% relative font-size-12 h-min-20 h-45%`])}>
              <span {...ui([uiA`f f-0-0-100 f-center color-bg-gray-white`])}>Start</span>
              <span {...ui([uiA`f f-0-0-100 f-center color-bg-gray-white m-x-2`])}>End</span>
              <span {...ui([uiA`f f-0-0-100 f-center color-bg-gray-white`])}>Notification</span>
            </span>
          </span>

          <span {...ui([uiTable`__cell`, uiA`f-column f-0-0-300 f-j-center border-right-light`])}>
            <span {...ui([uiA`f f-center w-100% h-60%`])}>Final</span>
            <span {...ui([uiA`f w-100% relative font-size-12 h-min-20 h-45%`])}>
              <span {...ui([uiA`f f-0-0-100 f-center color-bg-gray-white`])}>Start</span>
              <span {...ui([uiA`f f-0-0-100 f-center color-bg-gray-white m-x-2`])}>End</span>
              <span {...ui([uiA`f f-0-0-100 f-center color-bg-gray-white`])}>Notification</span>
            </span>
          </span>
        </div>
        <AssessmentCycleList />
      </div>

      {reactiveDeletePopupOpen ? (
        <DeletePopup
          onClose={onClose}
          onConfirm={onConfirm}
          headerSubject={reactivePopupData.toBeDeletedName}
          warningMsg={inProgressWarning}
        />
      ) : (
        ''
      )}
    </>
  );
}
