import React from 'react';
import breadCrumbClasses from './BreadCrumb.module.css';
import buttonClasses from './Button.module.css';

interface Params {
    currentPath: Array<string>;
    onBreadCrumbNavigate: (path: Array<string>) => void,
}

export const BreadCrumb: React.FC<Params> = ({ currentPath, onBreadCrumbNavigate }) => {

    const buttonClick = (index: number) => {
        onBreadCrumbNavigate(currentPath.slice(0, index));
    };

    return <div className={breadCrumbClasses['bread-crumb-container']}>
        {["/", ...currentPath].map((x, index) => {
            return <button
                className={
                    `${breadCrumbClasses['bread-crumb']}
                     ${buttonClasses['button']}`
                }
                key={index}
                onClick={() => buttonClick(index)}
            >
                {x}
            </button>;
        })}
    </div>;
};