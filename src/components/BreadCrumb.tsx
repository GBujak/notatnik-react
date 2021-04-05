import React from 'react';
import breadCrumbClasses from './BreadCrumb.module.css';
import buttonClasses from './Button.module.css';

interface Params {
    currentPath: Array<String>;
}

export const BreadCrumb: React.FC<Params> = ({ currentPath }) => {

    return <div className={breadCrumbClasses['bread-crumb-container']}>
        {currentPath.map((x, index) => {
            return <button
                className={
                    `${breadCrumbClasses['bread-crumb']}
                     ${buttonClasses['button']}`
                }
                key={index}
            >
                {x}
            </button>;
        })}
    </div>;
};