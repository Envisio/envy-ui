import React from 'react';
import { Button as AriaButton, Switch as AriaSwitch } from 'react-aria-components';
import * as envyUI from 'envy-ui';

const { ui, uiA, uiButton, uiCheckbox, uiMerge } = envyUI;

type PlaygroundProps = {
  isDanger: boolean;
  toggleVariant: () => void;
};

const PlaygroundPreview: React.FC<PlaygroundProps> = ({
  isDanger,
  toggleVariant
}) => {
  const mergedSettings = React.useMemo(
    () => ({
      variant: isDanger ? 'danger' : 'mint-blue',
      timestamp: Date.now()
    }),
    [isDanger]
  );

  const settingsDumpClass = React.useMemo(
    () => uiMerge([uiA`font-size-12 color-bg-gallery-20 p-small radius`]),
    []
  );


  return (
    <div {...ui([uiA`f f-column f-gap-small p`])}>
      <div {...ui([uiButton`--mint-blue`, uiA`f f-a-center f-gap-small`])}>
        <span {...ui([uiButton`__content`, uiA`ellipsis`])}>
          Static button modifier
        </span>
      </div>

      <div
        {...ui([
          uiButton`--mint-blue:--danger:${!isDanger}`,
          uiA`f f-a-center f-gap-small`
        ])}
      >
        <span {...ui([uiButton`__content`, uiA`ellipsis`])}>
          Dynamic modifier: {isDanger ? 'danger' : 'mint-blue'}
        </span>
      </div>

      <AriaButton
        {...ui([uiButton`--red:--mint-blue:${isDanger}`, uiA`m-left-large`])}
        onPress={toggleVariant}
      >
        <span {...ui([uiButton`__content`, uiA`ellipsis`])}>
          React Aria Button ({isDanger ? 'danger' : 'mint-blue'})
        </span>
      </AriaButton>

      <AriaSwitch
        {...ui([envyUI.uiCheckbox`--toggle`, uiA`self-start m-bottom-small`])}
        isSelected={isDanger}
        onChange={toggleVariant}
      >
        React Aria Switch
      </AriaSwitch>

      <pre className={settingsDumpClass}>
        {JSON.stringify(mergedSettings, null, 2)}
      </pre>
    </div>
  );
};

export const TsPlaygroundApp: React.FC = () => {
  const [isDanger, setIsDanger] = React.useState(false);

  const toggleVariant = React.useCallback(() => {
    setIsDanger(prev => !prev);
  }, []);

  return (
    <section {...ui([uiA`f f-column f-gap p`, "a"])}>
      <h1 {...ui([uiA`font-size-24 m-bottom-small`])}>envy-ui TS smoke test</h1>
      <PlaygroundPreview isDanger={isDanger} toggleVariant={toggleVariant} />
    </section>
  );
};
