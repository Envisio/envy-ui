import React from 'react';
import * as envyUI from 'envy-ui';

const { ui, uiA, uiButton, uiMerge } = envyUI;

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

      <button
        type="button"
        onClick={toggleVariant}
        {...ui([uiButton`--ghost`, uiA`self-start`])}
      >
        Toggle danger
      </button>

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
    <section {...ui([uiA`f f-column f-gap p`])}>
      <h1 {...ui([uiA`font-size-24 m-bottom-small`])}>envy-ui TS smoke test</h1>
      <PlaygroundPreview isDanger={isDanger} toggleVariant={toggleVariant} />
    </section>
  );
};
