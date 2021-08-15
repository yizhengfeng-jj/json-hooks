import {renderHook, act} from '@testing-library/react-hooks';
import useOriginData from './index';

test('测试前后数据，不一致情况', () => {
    let initValue = {name: 'json'};
    const {result, rerender} = renderHook(() => useOriginData(initValue));

    const beforeData = result.current;

    initValue = {name: 'json2'};

    rerender();
    const afterData = result.current;

    expect(afterData).toBe(initValue);

});

test('测试前后数据，一致情况', () => {
    let initValue = {name: 'json'};
    const {result, rerender} = renderHook(() => useOriginData(initValue));

    const beforeData = result.current;

    initValue = {name: 'json'};

    rerender();
    const afterData = result.current;

    expect(afterData).toBe(beforeData);

});