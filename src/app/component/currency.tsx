import { useEffect, useRef } from 'react';
import { format } from 'currency-formatter';
import classNames from 'classnames';

interface Props {
  value: number | string;
}

export default function Currency(props: Partial<Props>) {
  const value =
    typeof props.value === 'string' ? parseInt(props.value) : props.value || 0;
  const prevValue = useRef<number>(value);

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return (
    <div
      className={classNames({
        'text-red-600': value < prevValue.current,
        'text-green-600': value > prevValue.current,
      })}
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
