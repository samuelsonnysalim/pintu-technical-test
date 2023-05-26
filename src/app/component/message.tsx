import { ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
  className: string;
  type: 'error' | 'success' | 'warning' | 'info';
  title: string;
  children: ReactNode;
}

const types = {
  error: {
    background: 'bg-red-200',
    textColor: 'text-red-900',
  },
  success: {
    background: 'bg-lime-200',
    textColor: 'text-lime-900',
  },
  warning: {
    background: 'bg-orange-200',
    textColor: 'text-orange-900',
  },
  info: {
    background: 'bg-cyan-200',
    textColor: 'text-cyan-900',
  },
};

export default function Message(props: Partial<Props>) {
  const { background, textColor } = types[props.type || 'info'] || types.info;
  return (
    <div
      className={classNames(
        'py-2 px-4 text-sm rounded-lg',
        background,
        textColor,
        props.className,
      )}
    >
      {props.title && <div className="font-semibold">{props.title}</div>}
      <div>{props.children}</div>
    </div>
  );
}
