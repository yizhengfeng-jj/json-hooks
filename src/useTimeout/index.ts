import {useCallback, useEffect, useRef} from 'react';

export type setTimeoutType = ReturnType<typeof setTimeout>;

export interface UseTimeoutReturn{
    set: () => void;
    clear: () => void;
};

export default (fn: Function, time: number): UseTimeoutReturn => {
    // ref
    const timeRef = useRef<setTimeoutType>();
    const fnRef = useRef(fn);

    // fn
    const clear = useCallback(() => {
        clearTimeout(timeRef.current);
    }, []);

    const set = useCallback(() => {
        clear();
        timeRef.current = setTimeout(() => {
            fnRef.current();
        }, time);
    }, [time, clear]);

    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    useEffect(() => {
        timeRef.current = setTimeout(() => {
            fnRef.current();
        }, time);

        return () => {
            clear();
        };
    }, [time, clear]);

    return {
        set,
        clear
    };
};