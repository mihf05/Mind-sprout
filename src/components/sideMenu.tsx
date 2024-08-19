import React, { useEffect, useRef } from 'react';
import DarkMood from './darkMood';
import User from './user';
import { closeSideMenu } from './helper_functions/closeSideMenu';
import { ripple } from './helper_functions/ripple';
import styles from './sideMenu.module.scss';

const SIDE_CTX_TEXT = ["Home", "Quick start", "Subject wise", "Chapter wise"] as const;
const ICON_TEXT = ["home", "bolt", "summarize", "table_view"] as const;


export default function SideMenu({ setter, state }: { setter: (text: string) => void; state: string }): React.ReactElement {
  return (
    <div className="sideMenuWrapper">
      <div className={`${styles.sideMenu} sideMenu sideMenuHide`}>
        <User />
        {sideCtxText.map((item, index) => (
          <SideCtx
            key={item}
            text={item}
            icon={
              <span className="material-symbols-outlined">{iconText[index]}</span>
            }
            state={state === item ? styles.active : undefined}
            setter={setter}
          />
        ))}
        <DarkMood />
      </div>
    </div>
  );
}

interface SideCtxProps {
  text: string;
  icon: React.ReactNode;
  state?: string;
  setter: (text: string) => void;
}

function SideCtx({ text, icon, state, setter }: SideCtxProps): React.ReactElement {
  const btn = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (btn.current) {
      ripple(btn.current, "var(--ripple-black)");
    }
  }, []);

  const handleClick = (): void => {
    setter(text);
    closeSideMenu();
  };

  return (
    <div
      ref={btn}
      className={`${styles.sideCtx} sideCtx ${state || ''}`}
      onClick={handleClick}
    >
      {icon}
      <p>{text}</p>
    </div>
  );
}
