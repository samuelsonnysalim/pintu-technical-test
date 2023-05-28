import Link from 'next/link';
import { Fragment } from 'react';

interface Path {
  label: string;
  url: string;
}

interface Props {
  paths: Path[];
}

export default function Breadcrumb(props: Partial<Props>) {
  return (
    <div className="flex text-gray-500 text-xs xl:text-sm leading-5">
      {props.paths?.map((item, index) => (
        <Fragment key={index}>
          <Link href={item.url}>{item.label}</Link>
          {index < props.paths!.length - 1 && (
            <span className="mx-1">&gt;</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
