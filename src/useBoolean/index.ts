import {useState, useEffect, useCallback} from 'react';

export default (initStatus: boolean = false) => {
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