import React from 'react';
import './avatar.scss';

export interface IAvatarProps {
  userUrl: string,
  userName: string,
  size: number,
}

export const Avatar: React.FC<IAvatarProps> = ({userUrl, userName}) => {
  return (
    <div className='menuAvatar'>
      <img
        className='imageAvatar'
        src={userUrl}
        alt={userName}
        // style={{width: `${size * 40}px`}}
      />
    </div>
  );
}
