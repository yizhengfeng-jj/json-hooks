import {useState, useEffect, useCallback} from 'react';

export interface useBooleanReturn {
    visible: boolean;
    show: () => void;
    hide: () => void;
};

export default (initStatus: boolean = false): useBooleanReturn => {
    const [visible, setVisible] = useState(initStatus);

    useEffect(() => {
        setVisible(initStatus);
    }, [initStatus]);

    const show = useCallback(() => {
        setVisible(true);
    }, []);

    const hide = useCallback(() => {
        setVisible(false);
    }, []);

    return {
        visible,
        show,
        hide
    };
};