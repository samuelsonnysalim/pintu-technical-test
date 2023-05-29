import { useEffect, useRef } from 'react';
import { format } from 'currency-formatter';
import classNames from 'classnames';

interface Props {
  value: number | string;
  enableValueChangeIndicator: boolean;
}

export default function Currency(props: Partial<Props>) {
  const value =
    typeof props.value === 'string' ? parseInt(props.value) : props.value || 0;
  const prevValue = useRef<number>(value);

  useEffect(() => {
    if (props.enableValueChangeIndicator) {
      prevValue.current = value;
    }
  }, [value, props.enableValueChangeIndicator]);

  return (
    <div
      className={
        props.enableValueChangeIndicator
          ? classNames({
              'text-red-600': value < prevValue.current,
              'text-green-600': value > prevValue.current,
            })
          : undefined
      }
    >
      {format(value, {
        code: 'IDR',
        format: {
          pos: '%s %v', // %s is the symbol and %v is the value
          neg: '(%s %v)',
          zero: '%s %v',
        },
      })}
    </div>
  );
}

const defaultProps: Partial<Props> = {
  enableValueChangeIndicator: true,
};

Currency.defaultProps = defaultProps;
