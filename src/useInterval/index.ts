import {useEffect, useRef} from 'react';

export type intervalType = ReturnType<typeof setInterval>;

export default (fn: Function, time: number, abort:boolean, flag:boolean = true) => {
    const timerRef = useRef<intervalType>();
    const fnRef = useRef<Function>(fn);
    const flagRef = useRef(flag);

    // 函数改变
    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    useEffect(() => {
        if (!abort && flagRef.current) {
            fnRef.current();
        }
    }, [abort]);

    useEffect(() => {
        if (!abort) {
            timerRef.current = setInterval(() => {
                fnRef.current();
            }, time);
        }

        return () => {
            clearInterval(timerRef.current);
        };
    }, [time, abort]);
};