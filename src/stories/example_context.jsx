import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { map, uniqBy, sortBy, startCase, without, some, find, maxBy, minBy } from 'lodash';
import { arrayOf, func, shape, string } from 'prop-types';
import { ToggleLayer, anchor } from 'react-laag';
import {
  ui,
  uiA,
  uiButton,
  uiView,
  uiButtonSwitch,
  uiCheckbox,
  uiBadge,
  uiInputGroupLegacy,
  uiInputText,
  uiCard,
  uiFormRow,
  CheckboxWrapper,
} from 'envy-ui';
import { useMutation, useReactiveVar, useQuery } from '@apollo/client';
import moment from 'moment';
import React, { useContext, useEffect, useId, useRef, useState } from 'react';
import Select, { components } from 'react-select';
import { zoomLevel as zoomLevelVar } from '../client';
import addAdoptionTrackingGql from '../../graphqls/adoption_tracking/add_adoption_tracking.gql';
import Gantt from './gantt';
import { context } from '../../shared_components_v3/contextProvider';
import { health as healthConfig, upperLevelColor } from '../config.json';
import ListFilter from '../../report_builder/components/listFilter';
import EnvisioTooltip from '../../shared_components_v3/envisio_tooltip';
import GOALS from '../../../graphqls/goals.gql';
import STRATEGIES from '../../../graphqls/strategies.gql';
import ACTIVITY_STRATEGIES from '../../../graphqls/activityStrategies.gql';
import Loader from '../../common/components/loader';
import DatePicker from './DatePicker';

function DropdownIndicator(props) {
  return (
    <components.DropdownIndicator {...props}>
      <FontAwesomeIcon icon={['fal', 'cog']} className={ui([uiA`font-size-16 color-brand-gray`]).className} />
    </components.DropdownIndicator>
  );
}
function Option(props) {
  const inputId = useId();
  const { value, label, selectProps } = props;
  const { value: values, onChangeColumn } = selectProps;

  return (
    <components.Option {...props}>
      <label htmlFor={inputId} {...ui([uiA`f f-a-center h-20 m-none`])}>
        <input
          id={inputId}
          value={value}
          type="checkbox"
          onChange={onChangeColumn}
          checked={values.includes(value)}
          aria-label={`Toggle ${label} column`}
          {...ui([uiCheckbox`--check`])}
        />
        <span {...ui([uiA`p-left`])}>{label}</span>
      </label>
    </components.Option>
  );
}

Option.propTypes = {
  label: string.isRequired,
  selectProps: shape({
    onChangeColumn: func.isRequired,
    values: arrayOf(string),
  }).isRequired,
  value: string.isRequired,
};

function TagDropdownIndicator(props) {
  const { selectProps: { value, options } = {} } = props;
  let filterLabel = '';

  switch (value.length) {
    case 0:
    case options.length:
      filterLabel = 'All Tags';
      break;
    case 1:
      filterLabel = find(options, ['value', value[0]]).label;
      break;
    default:
      filterLabel = `Tags (${value.length})`;
  }

  return (
    <components.DropdownIndicator {...props} className={ui([uiA`p-0`]).className}>
      <span {...ui([uiButton`--round --light-blue:--default:${value.length}`])}>
        <span {...ui([uiButton`__content`])}>{filterLabel}</span>
      </span>
    </components.DropdownIndicator>
  );
}

TagDropdownIndicator.propTypes = {
  selectProps: shape({
    value: arrayOf(string).isRequired,
  }).isRequired,
};

function TagOption(props) {
  const inputId = useId();
  const { value, label, selectProps, data: { color } = {} } = props;
  const { value: values, onChangeTag } = selectProps;

  return (
    <components.Option {...props}>
      <label htmlFor={inputId} {...ui([uiA`f h-25 m-none p-y-small`])}>
        <input
          id={inputId}
          value={value}
          type="checkbox"
          onChange={onChangeTag}
          checked={values.includes(value)}
          aria-label={`Toggle ${label} tag`}
          {...ui([uiCheckbox`--check`, uiA`m-top-2`])}
        />
        <EnvisioTooltip title={label}>
          <span {...ui([uiBadge`--small --tag`, uiA`p-left m-left w-max-190`])} style={{ color }}>
            <span {...ui([uiA`f-1-1-auto p-left color-default ellipsis`])}>{label}</span>
          </span>
        </EnvisioTooltip>
      </label>
    </components.Option>
  );
}

TagOption.propTypes = {
  data: shape({ color: string }).isRequired,
  label: string.isRequired,
  selectProps: shape({ onChangeTag: func.isRequired, values: arrayOf(string) }).isRequired,
  value: string.isRequired,
};

export default function Index() {
  const exportStyles = `
  h1 {
    font-family: sans-serif;
    padding-left: 20px;
  }
  .gantt_grid_head_cell.env-a-text-align-left.env-a-p-left {
    text-align: left;
    padding-left: 10px;
  }
  .gantt_grid_head_cell.env-a-color-default {
    color:#404040;
  }
  .gantt_grid_head_isFav>span::after{
    content: "★";
    top:0;
    left:8px;
    position: absolute;
    font-size: 20px;
    width:25px;
    height:25px;
    color: #b7b7b7;
    font-weight: bold;
  }
  .gantt_cell>.gantt_tree_content>.env-button {
    align-items: center;
    display: flex;
    height:100%;
    justify-content: center;
    text-align: center;
  }
  .gantt_cell>.gantt_tree_content>span.env-button--content {
    visibility: visible;
    display: flex;
    height:25px;
    overflow: hidden;
    width:25px;
    position: relative;
    padding:5px;
    margin-top:6px;
  }
  .gantt_cell>.gantt_tree_content>span.env-button--content.env-a-color-orange::after {
    content: "★";
    top:-5px;
    position: absolute;
    font-size: 20px;
    width:25px;
    height:25px;
    color: #ffa500;
    font-weight: bold;
  }
  .gantt_cell>.gantt_tree_content>span.env-button--content.env-a-color-nobel::after {
    content: "☆";
    top:-5px;
    position: absolute;
    font-size: 20px;
    width:25px;
    height:25px;
    color: #b7b7b7;
    font-weight: bold;
  }
  .gantt_cell>.gantt_tree_content>div.env-button>.env-button__content {
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 50%;
    display: flex;
    height: 25px;
    justify-content: center;
    overflow: hidden;
    width: 25px;
  }
  .gantt_cell>.gantt_tree_content>div.env-button>.env-button__content img{
    width: 100%;
  }
  .env-a-color-default{
    color: #404040;
  }`;

  const { employees, majorDisruption, onTrack, planName, someDisruption, startYear, structures, tags } = useContext(context);
  const uniqId = useId();
  const searchRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [links, setLinks] = useState([]);
  const [expand, setExpand] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [checkedStatus, setCheckedStatus] = useState(new Set());
  const [searchValue, setSearchValue] = useState('');
  const [fav, setFav] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]);
  const [statusIsOpen, setStatusIsOpen] = useState(false);
  const [hideWeekends, setHideWeekends] = useState(false);
  const [noUpdates, setNoUpdates] = useState(false);
  const [dateRange, setDateRange] = useState([
    moment(startYear, 'YYYY').startOf('year').format('YYYY-MM-DD'),
    moment().format('YYYY-MM-DD'),
  ]);
  const [showOngoing, setShowOngoing] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(['isFav', 'text', 'owner', 'health', 'start_date', 'end_date', 'launch']);
  const [isColumnsMenuOpen, setIsColumnsMenuOpen] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const [addAdoptionTracking] = useMutation(addAdoptionTrackingGql);
  const zoomLevel = useReactiveVar(zoomLevelVar);
  const { loading: loadingGoals, data: { goals } = {} } = useQuery(GOALS);
  const { loading: loadingStrategies, data: { strategies } = {} } = useQuery(STRATEGIES);
  const { loading: loadingActivities, data: { activityStrategies: activities } = {} } = useQuery(ACTIVITY_STRATEGIES, {
    onCompleted: ({ activityStrategies }) => {
      let { endDate: maxDate = moment().toDate() } =
        maxBy(
          activityStrategies.filter(({ endDate }) => endDate && moment(endDate).isValid()),
          ({ endDate }) => moment(endDate).toDate(),
        ) || {};

      if (moment(maxDate).toDate() < moment().toDate()) {
        maxDate = moment().toDate();
      }

      const { startDate: minDate = moment(startYear, 'YYYY').startOf('year').toDate() } =
        minBy(
          activityStrategies.filter(({ startDate }) => startDate && moment(startDate).isValid()),
          ({ startDate }) => moment(startDate).toDate(),
        ) || {};

      setDateRange([moment(minDate).format('YYYY-MM-DD'), moment(maxDate).format('YYYY-MM-DD')]);
    },
  });

  const units = sortBy(uniqBy(map(employees, 'units').flat(), 'id'), 'name');
  const structuresLength = structures.length;
  const healthLabels = { 'Major Disruption': majorDisruption, 'On Track': onTrack, 'Some Disruption': someDisruption };

  const getColor = ({ health }) =>
    ({
      Completed: '#1565C0',
      Discontinued: '#36312d',
      'Major Disruption': '#e30022',
      'On Track': '#57a92b',
      'Some Disruption': '#ffd700',
      'Status Pending': '#8c8b8c',
      Upcoming: '#8b65a1',
    })[Object.keys(health)[0]] || upperLevelColor;

  useEffect(() => {
    if (goals && strategies && activities) {
      const taskLinks = [];
      const taskMap = new Map();
      const sortedElements = elements =>
        elements.sort(({ number: prev }, { number: next }) => prev.localeCompare(next, undefined, { numeric: true }));
      // sort by number
      const sortedGoals = sortedElements([...goals]);
      const sortedStrategies = sortedElements([...strategies]);
      const sortedActivities = sortedElements([...activities]);
      // get max and min dates from activities, if no available activities, use startYear and current date
      let { endDate: maxDate = moment().toDate() } =
        maxBy(
          sortedActivities.filter(({ endDate }) => endDate && moment(endDate).isValid()),
          ({ endDate }) => moment(endDate).toDate(),
        ) || {};

      if (moment(maxDate).toDate() < moment().toDate()) {
        maxDate = moment().toDate();
      }

      maxDate = moment(maxDate).toDate(); // date should be a Date object

      let { startDate: minDate = moment(startYear, 'YYYY').startOf('year').toDate() } =
        minBy(
          sortedActivities.filter(({ startDate }) => startDate && moment(startDate).isValid()),
          ({ startDate }) => moment(startDate).toDate(),
        ) || {};

      if (moment(minDate).toDate() > moment(startYear, 'YYYY').startOf('year').toDate()) {
        minDate = moment(startYear, 'YYYY').startOf('year').toDate();
      }

      minDate = moment(minDate).toDate(); // date should be a Date object

      const initTask = (
        {
          activity: { noUpdate: activityNoUpdate, description: activityDescription } = {},
          id,
          weight: priority,
          number,
          isFav,
          label,
          health,
          owner,
          startDate,
          endDate,
          childCount: count,
          updatedChildCount: updatedCount,
          noUpdate,
          progress,
          taggings,
          description,
        },
        type,
      ) => {
        const { name: ownerName, avatar, id: ownerId, units: ownerUnits = [], initials } = find(employees, ['id', owner.id]) || {};

        return {
          avatar,
          count,
          description: activityDescription || description || '',
          end_date: type === 'activity' ? (endDate && moment(endDate).isValid() ? moment(endDate).toDate() : maxDate) : null, // only activities have end dates
          health: Object.keys(health).length ? health : { 'Status Pending': 1 }, // default to Status Pending if no health
          hide: false, // reserved for filtering
          id,
          initials,
          isFav,
          label,
          noUpdate: noUpdate ?? activityNoUpdate,
          number,
          ongoing: type === 'activity' ? !endDate || !moment(endDate).isValid() || !startDate || !moment(startDate).isValid() : false,
          open: expandedIds.includes(id),
          owner: ownerName,
          ownerId,
          priority,
          progress: (progress || 0) / 100,
          start_date: type === 'activity' ? (startDate && moment(startDate).isValid() ? moment(startDate).toDate() : minDate) : null, // only activities have start dates
          tagIds: map(taggings, 'tag.id') || [],
          text: `${label} ${number}`,
          type: type.replace('goal', 'goals').replace('y', 'ies'),
          unitIds: map(ownerUnits, 'id'),
          updatedCount,
        };
      };
      const getDates = elements => {
        const newEndDate =
          maxBy(
            elements.map(({ endDate }) => (endDate && moment(endDate).isValid() ? endDate : maxDate)),
            endDate => moment(endDate).toDate(),
          ) || maxDate;
        const newStartDate =
          minBy(
            elements.map(({ startDate }) => (startDate && moment(startDate).isValid() ? startDate : minDate)),
            startDate => moment(startDate).toDate(),
          ) || minDate;
        const ongoing =
          some(
            elements,
            ({ endDate, startDate }) => !endDate || !moment(endDate).isValid() || !startDate || !moment(startDate).isValid(),
          ) || !elements.length;

        return {
          endDate: moment(newEndDate).toDate(),
          ongoing,
          startDate: moment(newStartDate).toDate(),
        };
      };
      const updateElement = (elementId, { startDate: newStartDate, endDate: newEndDate, ongoing }) => {
        // value could be string or date
        const element = taskMap.get(elementId);
        const { start_date: startDate, end_date: endDate } = element;
        const start = (newStartDate && moment(newStartDate).isValid() ? moment(newStartDate) : moment(minDate)).toDate();
        const end = (newEndDate && moment(newEndDate).isValid() ? moment(newEndDate) : moment(maxDate)).toDate();

        if ((startDate && moment(start).isBefore(moment(startDate))) || !startDate) {
          element.start_date = moment(start).toDate();
        }

        if ((endDate && moment(end).isAfter(moment(endDate))) || !endDate) {
          element.end_date = moment(end).toDate();
        }

        if (!element.ongoing && ongoing) {
          element.ongoing = true;
        }
      };

      sortedGoals.forEach(goal => {
        const { id: goalId, number: goalNumber } = goal;
        const strategies1 = sortedStrategies.filter(
          ({ number: strategyNumber }) => strategyNumber.startsWith(`${goalNumber}.`) && strategyNumber.split('.').length === 2,
        );

        taskMap.set(goalId, { ...initTask(goal, 'goal'), color: upperLevelColor });
        strategies1.forEach(strategy1 => {
          const { id: strategy1Id, number: strategy1Number } = strategy1;

          taskMap.set(strategy1Id, { ...initTask(strategy1, 'strategy'), color: upperLevelColor, parent: goalId });
          taskLinks.push({ id: `${goalId}-${strategy1Id}`, source: goalId, target: strategy1Id, type: '1' });

          if (structuresLength > 3) {
            const strategies2 = sortedStrategies.filter(
              ({ number: strategyNumber2 }) => strategyNumber2.startsWith(`${strategy1Number}.`) && strategyNumber2.split('.').length === 3,
            );

            strategies2.forEach(strategy2 => {
              const { id: strategy2Id, number: strategy2Number } = strategy2;

              taskMap.set(strategy2Id, { ...initTask(strategy2, 'strategy'), color: upperLevelColor, parent: strategy1Id });
              taskLinks.push({ id: `${strategy1Id}-${strategy2Id}`, source: strategy1Id, target: strategy2Id, type: '1' });

              if (structuresLength > 4) {
                const strategies3 = sortedStrategies.filter(
                  ({ number: strategyNumber3 }) =>
                    strategyNumber3.startsWith(`${strategy2Number}.`) && strategyNumber3.split('.').length === 4,
                );

                strategies3.forEach(strategy3 => {
                  const { id: strategy3Id, number: strategy3Number } = strategy3;

                  taskMap.set(strategy3Id, { ...initTask(strategy3, 'strategy'), color: upperLevelColor, parent: strategy2Id });
                  taskLinks.push({ id: `${strategy2Id}-${strategy3Id}`, source: strategy2Id, target: strategy3Id, type: '1' });

                  const strategy3Activities = sortedActivities.filter(({ number: activityNumber }) =>
                    activityNumber.startsWith(`${strategy3Number}.`),
                  );
                  const strategy3Dates = getDates(strategy3Activities);

                  updateElement(strategy3Id, strategy3Dates);
                  updateElement(strategy2Id, strategy3Dates);
                  updateElement(strategy1Id, strategy3Dates);
                  updateElement(goalId, strategy3Dates);
                  strategy3Activities.forEach(activity => {
                    const { id: activityId } = activity;

                    taskMap.set(activityId, { ...initTask(activity, 'activity'), color: getColor(activity), parent: strategy3Id });
                    taskLinks.push({ id: `${strategy3Id}-${activityId}`, source: strategy3Id, target: activityId, type: '1' });
                  });
                });
              } else {
                const strategy2Activities = sortedActivities.filter(({ number: activityNumber }) =>
                  activityNumber.startsWith(`${strategy2Number}.`),
                );
                const strategy2Dates = getDates(strategy2Activities);

                updateElement(strategy2Id, strategy2Dates);
                updateElement(strategy1Id, strategy2Dates);
                updateElement(goalId, strategy2Dates);
                strategy2Activities.forEach(activity => {
                  const { id: activityId } = activity;

                  taskMap.set(activityId, { ...initTask(activity, 'activity'), color: getColor(activity), parent: strategy2Id });
                  taskLinks.push({ id: `${strategy2Id}-${activityId}`, source: strategy2Id, target: activityId, type: '1' });
                });
              }
            });
          } else {
            const strategy1Activities = sortedActivities.filter(({ number: activityNumber }) =>
              activityNumber.startsWith(`${strategy1Number}.`),
            );
            const strategy1Dates = getDates(strategy1Activities);

            updateElement(strategy1Id, strategy1Dates);
            updateElement(goalId, strategy1Dates);
            strategy1Activities.forEach(activity => {
              const { id: activityId } = activity;

              taskMap.set(activityId, { ...initTask(activity, 'activity'), color: getColor(activity), parent: strategy1Id });
              taskLinks.push({ id: `${strategy1Id}-${activityId}`, source: strategy1Id, target: activityId, type: '1' });
            });
          }
        });

        if (!strategies1.length) {
          updateElement(goalId, { endDate: maxDate, ongoing: true, startDate: minDate });
        }
      });
      setTasks([...taskMap.values()]);
      setLinks(taskLinks);
    }
  }, [goals, strategies, activities]);

  useEffect(() => {
    if (isSearchActive) {
      searchRef.current?.focus();
    }
  }, [isSearchActive]);

  const handleZoomChange = ({ currentTarget: { value } }) => zoomLevelVar(value);
  const onAddAdoptionTracking = () =>
    addAdoptionTracking({ variables: { eventArgs: { from_view: 'gantt', to_view: 'map' }, eventType: 'plan_click_switch_view' } });
  const onSearchChange = ({ currentTarget: { value = '' } = {} }) => setSearchValue(value);
  const onSearchClear = () => setSearchValue('');
  const onSearchBlur = () => {
    if (searchValue.trim() === '') {
      setIsSearchActive(false);
    }
  };
  const onSearchClick = () => setIsSearchActive(true);
  const toggleState = (setter, currentValue) => () => setter(!currentValue);
  const onClickIsFav = toggleState(setFav, fav);
  const onClickUpdates = toggleState(setNoUpdates, noUpdates);
  const onClickIsOpen = toggleState(setStatusIsOpen, statusIsOpen);
  const onClickHideCompleted = () =>
    setCheckedStatus(new Set(['Upcoming', 'Discontinued', 'Major Disruption', 'On Track', 'Some Disruption', 'Status Pending']));
  const onOutsideClick = () => setStatusIsOpen(false);
  const onChangeStatus = ({ currentTarget: { checked, value } }) => {
    if (checked) {
      setCheckedStatus(prev => new Set([...prev, value]));
    } else {
      setCheckedStatus(prev => {
        const newSet = new Set([...prev]);

        newSet.delete(value);

        return newSet;
      });
    }
  };
  const onClearStatus = () => setCheckedStatus(new Set());
  const onChangeSelectedEmployee = value => setSelectedEmployee(value);
  const onChangeSelectedDepartment = value => setSelectedDepartment(value);
  const toggleColumn = (value, checked) => {
    setSelectedColumns(prev => (checked ? [...prev, value] : prev.filter(item => item !== value)));
  };
  const onChangeColumns = (_, { action, option: { value } }) => {
    if (action === 'select-option') {
      toggleColumn(value, !selectedColumns.includes(value));
    }
  };
  const onChangeColumn = ({ target: { checked, value } }) => toggleColumn(value, checked);
  const onExportPNG = () => {
    gantt.exportToPNG({
      format: 'Letter',
      header: `<style>${exportStyles}</style><h1>Plan Gantt</h1>`,
      landscape: true,
      name: `${startCase(planName)}.png`,
      raw: true,
      skin: 'terrace',
    });

    addAdoptionTracking({ variables: { eventArgs: { type: 'png' }, eventType: 'gantt_export' } });
  };
  const onExportPDF = () => {
    gantt.exportToPDF({
      format: 'Letter',
      header: `<style>${exportStyles}</style><h1>Plan Gantt</h1>`,
      landscape: true,
      name: `${startCase(planName)}.pdf`,
      raw: true,
      skin: 'terrace',
    });

    addAdoptionTracking({ variables: { eventArgs: { type: 'pdf' }, eventType: 'gantt_export' } });
  };
  const onIgnoreTime = toggleState(setHideWeekends, hideWeekends);
  const onChangeTags = (_, { action, option: { value } }) => {
    if (action === 'select-option') {
      setSelectedTags(selectedTags.includes(value) ? without(selectedTags, value) : [...selectedTags, value]);
    }
  };
  const onChangeTag = ({ target: { value } }) =>
    setSelectedTags(selectedTags.includes(value) ? without(selectedTags, value) : [...selectedTags, value]);
  const onColumnsMenuOpen = () => setIsColumnsMenuOpen(true);
  const onColumnsMenuClose = () => setIsColumnsMenuOpen(false);
  const onChangeDateRange = range => {
    const newDateRange = range.map(date => date?.format('YYYY-MM-DD'));

    setDateRange(newDateRange);
    addAdoptionTracking({
      variables: {
        eventArgs: { from: dateRange.join('-'), to: newDateRange.join('-') },
        eventType: 'gantt_change_date_range',
      },
    });
  };
  const onChangeExpandCollapse = toggleState(setExpand, expand);
  const onChangeShowOngoing = toggleState(setShowOngoing, showOngoing);

  if (loadingGoals || loadingStrategies || loadingActivities) {
    return <Loader />;
  }

  let { endDate: maxDate = moment().toDate() } =
    maxBy(
      activities.filter(({ endDate }) => endDate && moment(endDate).isValid()),
      ({ endDate }) => moment(endDate).toDate(),
    ) || {};

  if (moment(maxDate).toDate() < moment().toDate()) {
    maxDate = moment().toDate();
  }

  const { startDate: minDate = moment(startYear, 'YYYY').startOf('year').toDate() } =
    minBy(
      activities.filter(({ startDate }) => startDate && moment(startDate).isValid()),
      ({ startDate }) => moment(startDate).toDate(),
    ) || {};

  return (
    <div {...ui([uiA`f w-100% h-100% f-1-0-auto`])}>
      <div {...ui([uiView``, uiA`f-1-1-auto`])}>
        <header {...ui([uiView`__header`, uiA`p-right f-gap`])}>
          <h2 {...ui([uiView`__header-title`, uiA`m-right-auto`])}>Plan Gantt View</h2>
        </header>
        <div {...ui([uiView`__main-wrapper1`, uiA`overflow-hidden`])}>
          <div {...ui([uiView`__main-wrapper2`])}>
            <div {...ui([uiView`__main`])}>
              <div {...ui([uiA`f p-x m-top-large m-bottom`])}>
                <div {...ui([uiA`f f-gap f-j-space-between f-wrap w-100%`])}>
                  {isSearchActive ? (
                    <span {...ui([uiInputGroupLegacy`--before --after`, uiA`f-1-0-225`])}>
                      <FontAwesomeIcon icon={['fal', 'search']} className={ui([uiInputGroupLegacy`__before`, uiA`p-left-5`]).className} />
                      <input
                        type="search"
                        value={searchValue}
                        onChange={onSearchChange}
                        ref={searchRef}
                        onBlur={onSearchBlur}
                        placeholder="Search"
                        aria-label="Search plan elements"
                        {...ui([uiInputText`--round`, uiInputGroupLegacy`__input`, uiA`ellipsis`])}
                      />
                      {!!searchValue && (
                        <button
                          type="button"
                          onClick={onSearchClear}
                          aria-label="Clear search"
                          {...ui([uiInputGroupLegacy`__after`, uiButton`--clean --circle --small --content-gray`])}
                        >
                          <span {...ui([uiButton`__content`])}>
                            <FontAwesomeIcon icon={['fal', 'times']} />
                          </span>
                        </button>
                      )}
                    </span>
                  ) : (
                    <button aria-label="Search" type="button" {...ui([uiButton`--default --circle`])} onClick={onSearchClick}>
                      <span {...ui([uiButton`__content`])}>
                        <FontAwesomeIcon icon={['fal', 'search']} />
                      </span>
                    </button>
                  )}
                  <button
                    type="button"
                    {...ui([uiButton`--default --circle --light-blue:${fav}`])}
                    onClick={onClickIsFav}
                    aria-label="Toggle favorites filter"
                  >
                    <span {...ui([uiButton`__content`, uiA`color-orange:color-nobel:${fav}`])}>
                      <FontAwesomeIcon icon={['fas', 'star']} />
                    </span>
                  </button>
                  <button type="button" {...ui([uiButton`--round --light-blue:--default:${noUpdates}`])} onClick={onClickUpdates}>
                    <span {...ui([uiButton`__content`])}>Pending Updates</span>
                  </button>
                  <ToggleLayer
                    placement={{
                      anchor: anchor.BOTTOM_LEFT,
                      autoAdjust: true,
                      possibleAnchors: [anchor.BOTTOM_LEFT, anchor.TOP_CENTER, anchor.BOTTOM_CENTER],
                      snapToAnchor: true,
                      triggerOffset: 5,
                    }}
                    fixed
                    autoAdjust
                    isOpen={statusIsOpen}
                    onOutsideClick={onOutsideClick}
                    renderLayer={({ isOpen, layerProps }) =>
                      isOpen && (
                        <div ref={layerProps.ref} style={{ ...layerProps.style, zIndex: 5 }}>
                          <div {...ui([uiCard``])}>
                            <ul
                              {...ui([uiA`f f-column m-none border-bottom-panel`])}
                              style={{ listStyleType: 'none', paddingInlineStart: 0 }}
                            >
                              {Object.keys(healthConfig).map(value => (
                                <li key={['type', 'list', value].join('-')}>
                                  <label htmlFor={`filter-status-${uniqId}-${value}`} {...ui([uiA`f f-a-center h-30 m-none p-right-15`])}>
                                    <CheckboxWrapper themeCheck addClass={uiA`m-x`}>
                                      <input
                                        id={`filter-status-${uniqId}-${value}`}
                                        value={value}
                                        type="checkbox"
                                        onChange={onChangeStatus}
                                        checked={checkedStatus.has(value)}
                                        aria-label={`Filter by ${healthLabels[value] || value} status`}
                                      />
                                    </CheckboxWrapper>
                                    <span>{healthLabels[value] || value}</span>
                                  </label>
                                </li>
                              ))}
                            </ul>
                            <div {...ui([uiA`f p-right h-50 color-bg-alabaster`])}>
                              <button
                                type="button"
                                onClick={checkedStatus.size === 6 && !checkedStatus.has('Completed') ? onClearStatus : onClickHideCompleted}
                                aria-label={
                                  checkedStatus.size === 6 && !checkedStatus.has('Completed')
                                    ? 'Clear status filters'
                                    : 'Hide completed items'
                                }
                                {...ui([uiButton`--clean --content-link --inline`, uiA`m-left-small m-right-auto`])}
                              >
                                <span {...ui([uiButton`__content`])} tabIndex="-1">
                                  {checkedStatus.size === 6 && !checkedStatus.has('Completed') ? 'Clear' : 'Hide Completed'}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  >
                    {({ triggerRef }) => {
                      let label = '';

                      switch (checkedStatus.size) {
                        case 0:
                        case 7:
                          label = `All Status`;
                          break;
                        case 1:
                          label = healthLabels[[...checkedStatus.values()][0]] || [...checkedStatus.values()][0];
                          break;
                        default:
                          if (checkedStatus.size === 6 && !checkedStatus.has('Completed')) {
                            label = 'Hide Completed';
                          } else {
                            label = `Status (${checkedStatus.size})`;
                          }
                      }

                      return (
                        <button
                          type="button"
                          ref={triggerRef}
                          onClick={onClickIsOpen}
                          aria-label="Open status filter menu"
                          {...ui([uiButton`--default --round --light-blue:${checkedStatus.size}`])}
                        >
                          <span {...ui([uiButton`__content`, uiA`nowrap`])}>{label}</span>
                        </button>
                      );
                    }}
                  </ToggleLayer>
                  <ListFilter
                    value={selectedDepartment}
                    options={[
                      { label: 'All Departments', skipAvatar: true, value: '' },
                      ...units.map(({ id: unitId, name: unitName }) => ({ label: unitName, value: unitId })),
                    ]}
                    onApply={onChangeSelectedDepartment}
                    withSearch
                    maxHeight="200px"
                  />
                  <ListFilter
                    value={selectedEmployee}
                    options={[
                      { label: 'All Owners', skipAvatar: true, value: '' },
                      ...sortBy(employees, 'name').map(({ id: employeeId, name: employeeName, avatar, initials }) => ({
                        avatar,
                        initials,
                        label: employeeName,
                        value: employeeId,
                      })),
                    ]}
                    onApply={onChangeSelectedEmployee}
                    withAvatar
                    withSearch
                  />
                  <Select
                    hideSelectedOptions={false}
                    closeMenuOnSelect={false}
                    components={{ DropdownIndicator: TagDropdownIndicator, IndicatorSeparator: null, Option: TagOption }}
                    isMulti
                    onChangeTag={onChangeTag}
                    onChange={onChangeTags}
                    options={tags.map(({ id, name, color }) => ({ color, label: name, value: id }))}
                    isClearable={false}
                    aria-label="Filter by tags"
                    styles={{
                      control: styles => ({ ...styles, borderWidth: 0, boxShadow: 'none', cursor: 'pointer', minHeight: '35px' }),
                      input: styles => ({ ...styles, height: 0, margin: 0, overflow: 'hidden', padding: 0, width: 0 }),
                      menu: styles => ({ ...styles, width: '250px' }),
                      option: styles => ({ ...styles, padding: '0 10px 5px' }),
                      placeholder: styles => ({ ...styles, display: 'none' }),
                      valueContainer: styles => ({ ...styles, height: 0, padding: 0, width: 0 }),
                    }}
                    theme={theme => ({ ...theme, borderWidth: 0, outline: 'none' })}
                    value={selectedTags}
                  />
                  <button type="button" {...ui([uiButton`--round --light-blue:--default:${showOngoing}`])} onClick={onChangeShowOngoing}>
                    <span {...ui([uiButton`__content`])}>Show Ongoing</span>
                  </button>
                  <span style={{ flexGrow: 1 }} />
                  <DatePicker
                    value={dateRange}
                    onChange={onChangeDateRange}
                    minDate={moment(minDate).toDate()}
                    maxDate={moment(maxDate).toDate()}
                  />
                  <EnvisioTooltip title="Export to PNG">
                    <button type="button" onClick={onExportPNG} aria-label="Export to PNG" {...ui([uiButton`--clean --content-link`])}>
                      <span {...ui([uiButton`__content`])}>
                        <FontAwesomeIcon icon={['fal', 'file-image']} className={ui([uiA`font-size-20`]).className} />
                      </span>
                    </button>
                  </EnvisioTooltip>
                  <EnvisioTooltip title="Export to PDF">
                    <button type="button" onClick={onExportPDF} aria-label="Export to PDF" {...ui([uiButton`--clean --content-link`])}>
                      <span {...ui([uiButton`__content`])}>
                        <FontAwesomeIcon icon={['fal', 'file-pdf']} className={ui([uiA`font-size-20`]).className} />
                      </span>
                    </button>
                  </EnvisioTooltip>
                </div>
              </div>
              <div {...ui([uiA`f m-left h-min-35 f-a-center`])}>
                <span {...ui([uiA`w-100%`])}>
                  <div {...ui([uiA`w-100% f f-j-space-between f-a-center`])}>
                    <span>Result: {taskCount} records</span>
                    <EnvisioTooltip title={expand ? 'Collapse' : 'Expand'}>
                      <button
                        type="button"
                        onClick={onChangeExpandCollapse}
                        aria-label={expand ? 'Collapse all elements' : 'Expand all elements'}
                        {...ui([uiButton`--clean`, uiA`m-left-small`])}
                      >
                        <span {...ui([uiButton`__content`])}>
                          <FontAwesomeIcon icon={['fal', expand ? 'minus-square' : 'plus-square']} />
                        </span>
                      </button>
                    </EnvisioTooltip>
                    <span style={{ flexGrow: 1 }} />
                    <a
                      href="/corporate/planning"
                      onClick={onAddAdoptionTracking}
                      {...ui([uiButton`--clean --content-link --small --round --hover-default`, uiA`m-right m-bottom-small`])}
                    >
                      <span {...ui([uiButton`__content`])}>View in Map</span>
                    </a>
                  </div>
                </span>
              </div>
              <div {...ui([uiView``, uiA``])}>
                <span {...ui([uiA`border-top-panel m-x`])} />
                <div {...ui([uiA`f f-column h-100%`])}>
                  {['day', 'week'].includes(zoomLevel) && (
                    <label
                      style={{ width: 'fit-content' }}
                      {...ui([uiFormRow`__label`, uiA`f f-a-center p-x p-bottom-5 p-top m-bottom-0 f-0-0-auto`])}
                      htmlFor={`hide-weekends-${uniqId}`}
                    >
                      <input
                        type="checkbox"
                        id={`hide-weekends-${uniqId}`}
                        onChange={onIgnoreTime}
                        aria-label="Hide weekends"
                        {...ui([uiCheckbox`--check`])}
                      />
                      <span {...ui([uiA`nowrap m-left-small`])}>Hide Weekends</span>
                    </label>
                  )}
                  <div {...ui([uiA`f`])}>
                    <div {...ui([uiA`f f-a-center m-right-auto m-y-small`])}>
                      <div {...ui([uiButtonSwitch`--light-blue --round`, uiA`m-left-small`])}>
                        {['day', 'week', 'month', 'quarter', 'year'].map(value => (
                          <button
                            key={value}
                            type="button"
                            {...ui([uiButtonSwitch`__button --active:${zoomLevel === value}`])}
                            value={value}
                            onClick={handleZoomChange}
                            style={{ textTransform: 'capitalize' }}
                            aria-label={`Set scale to ${value}`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div {...ui([uiA`f m-right-large f-a-center`])}>
                      <Select
                        closeMenuOnSelect={false}
                        menuIsOpen={isColumnsMenuOpen}
                        onMenuOpen={onColumnsMenuOpen}
                        onMenuClose={onColumnsMenuClose}
                        onChangeColumn={onChangeColumn}
                        components={{ DropdownIndicator, IndicatorSeparator: null, Option }}
                        isMulti
                        onChange={onChangeColumns}
                        options={[
                          { label: 'Favourite', value: 'isFav' },
                          { label: 'Status', value: 'health' },
                          { label: 'Owner', value: 'owner' },
                          { label: 'Start Date', value: 'start_date' },
                          { label: 'End Date', value: 'end_date' },
                          { label: 'Priority', value: 'priority' },
                        ]}
                        isClearable={false}
                        aria-label="Select columns to display"
                        styles={{
                          control: styles => ({ ...styles, borderWidth: 0, boxShadow: 'none', cursor: 'pointer', minHeight: '35px' }),
                          input: styles => ({ ...styles, height: 0, margin: 0, overflow: 'hidden', padding: 0, width: 0 }),
                          menu: styles => ({ ...styles, right: '1px', width: '110px' }),
                          placeholder: styles => ({ ...styles, display: 'none' }),
                          valueContainer: styles => ({ ...styles, height: 0, padding: 0, width: 0 }),
                        }}
                        value={selectedColumns}
                      />
                    </div>
                  </div>
                  <Gantt
                    columns={selectedColumns}
                    employeeId={selectedEmployee}
                    expand={expand}
                    fav={fav}
                    hideWeekends={hideWeekends && ['day', 'week'].includes(zoomLevel)}
                    links={links}
                    noUpdates={noUpdates}
                    ongoing={showOngoing}
                    range={dateRange}
                    searchValue={searchValue}
                    statuses={checkedStatus}
                    tagIds={selectedTags}
                    tasks={tasks}
                    unitId={selectedDepartment}
                    setTaskCount={setTaskCount}
                    onExpandChange={setExpandedIds}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
