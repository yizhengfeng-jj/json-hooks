import {useEffect, EffectCallback, useRef} from 'react';

export default (fn: EffectCallback) => {
    const callRef = useRef<EffectCallback>();

    callRef.current = fn;

    useEffect(() => {
        return callRef.current();
    }, []);
};