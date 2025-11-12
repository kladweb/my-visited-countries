import React from "react";

interface ILoadingStatusProps {
  loadStatus: string
}

export const LoadingStatus: React.FC<ILoadingStatusProps> = ({loadStatus}) => {
  return (
    <>
      <div className='loading'>
        <span className='loading-status'>{loadStatus}</span>
      </div>
    </>
  )
}
