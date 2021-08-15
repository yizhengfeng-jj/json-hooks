import {useRef} from 'react';
import {isEqualWith} from 'lodash';

// isEqual 主要是提供一个，自定义比对能力
const useOriginData = <T>(data: T, isEqual?: Function): T => {
    const originData = useRef<T>();

    if (!isEqualWith(originData.current, data, isEqual)) {
        originData.current = data;
    }

    return originData.current;
};

export default useOriginData;