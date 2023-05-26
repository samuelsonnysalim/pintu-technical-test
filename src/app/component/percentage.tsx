import classNames from 'classnames';

interface Props {
  value: number | string;
}

export default function Percentage(props: Partial<Props>) {
  const value =
    typeof props.value === 'string'
      ? parseFloat(props.value)
      : props.value || 0;
  return (
    <div
      className={classNames('flex items-center', {
        'text-red-600': value < 0,
        'text-green-600': value > 0,
      })}
    >
      <div
        className={classNames(
          'w-0  h-0 border-x-[transparent] border-x-[6px] mr-[5px] text-[0px]',
          {
            'border-t-red-600 border-t-[8px]': value < 0,
            'border-b-green-600 border-b-[8px]': value > 0,
          },
        )}
      >
        {value < 0 ? 'Down' : value > 0 ? 'Up' : ''}
      </div>
      {Math.abs(value).toFixed(2)}%
    </div>
  );
}
