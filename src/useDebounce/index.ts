
import {useRef} from 'react';

export interface optionProps {
    leading: boolean; // 是否在防抖前，先执行一次函数
    wait: number; // 防抖时间
};

export type setTimeoutType = ReturnType<typeof setTimeout>;

// 将fn 用re存起来，这样可以实时执行最新函数
// 将option用ref存起来，达到同样效果
export default (fn: Function, option: optionProps) => {
    const timeRef = useRef<setTimeoutType>();
    const callRef = useRef<Function>(fn);
    const optionRef = useRef<optionProps>(option);

    const run = (...args) => {
        const _seft = this;

        if (timeRef.current) {
            clearTimeout(timeRef.current);
        }

        if (optionRef?.current?.leading) {
            callRef.current.call(_seft, ...args);
        }

        timeRef.current = setTimeout(() => {
            callRef.current.call(_seft, ...args);
        }, optionRef?.current?.wait || 200);
    };

    const cancel = () => {
        clearTimeout(timeRef.current);
    };

    return {run, cancel};
};