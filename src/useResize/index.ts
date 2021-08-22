import {useCallback, useEffect, useState} from 'react';
import {addListener, removeListener} from 'resize-detector';

export default (element?: HTMLElement) => {
    // props
    const newElement = element || window;
    const {offsetWidth, offsetHeight} = (newElement as any);

    // state
    const [domInfo, setDomInfo] = useState({width: offsetWidth, height: offsetHeight});

    // fn
    const resize = useCallback(() => {
        const {offsetWidth, offsetHeight} = (newElement as any);

        setDomInfo({width: offsetWidth, height: offsetHeight});
    }, [newElement]);


    useEffect(() => {
        if (element) {
            addListener(element, resize);

            return () => {
                removeListener(element, resize);
            };
        }
        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };

    }, [element, resize]);

    return domInfo;
};
