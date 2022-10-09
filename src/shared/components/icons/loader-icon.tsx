import * as React from 'react';

const LoaderIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 21 21" fill="none" {...props}>
      <path
        d="M13.87 19.383a9.5 9.5 0 116.102-8.15"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
};

const MemoLoaderIcon = React.memo(LoaderIcon);
export default MemoLoaderIcon;
