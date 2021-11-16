import {renderHook} from '@testing-library/react-hooks';

import useDebounce from './index';

const fn = jest.fn();

describe('测试防抖函数', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    beforeEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('传函数，wait:200, leading:false, 第一次不执行，200m后执行', () => {
        const {result} = renderHook(() => useDebounce(fn, {wait: 200, leading: false}));
        const {run} = result.current;

        run();
        expect(fn).not.toHaveBeenCalled();
        jest.advanceTimersByTime(200);
        expect(fn).toHaveBeenCalled();
    });

    it('传函数，wait:200, leading:true, 第一次执行，200m后也执行', () => {
        const {result} = renderHook(() => useDebounce(fn, {wait: 200, leading: true}));
        const {run} = result.current;

        run();
        expect(fn).toHaveBeenCalled();
        jest.advanceTimersByTime(200);
        expect(fn).toHaveBeenCalledTimes(2);
    });
});