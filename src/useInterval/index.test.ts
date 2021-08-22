import {renderHook} from '@testing-library/react-hooks';

import useInterval from './index';

describe('定时器setInterval测试用例', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    beforeEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('如果abort为false, flag为false, 不会被执行一次', () => {
        const fn = jest.fn();
        renderHook(() => useInterval(fn, 1000, false, false));

        expect(fn).not.toHaveBeenCalled();
    });

    it('如果abort为false, 如果flag为true, 会被执行一次', () => {
        const fn = jest.fn();
        renderHook(() => useInterval(fn, 1000, false, true));

        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('如果abort为true, 不会被执行', () => {
        const fn = jest.fn();
        renderHook(() => useInterval(fn, 1000, true, true));

        expect(fn).not.toHaveBeenCalled();
    });

    it('如果abort为false, 固定时间被执行', () => {
        const fn = jest.fn();
        renderHook(() => useInterval(fn, 1000, false, false));

        expect(fn).not.toHaveBeenCalled();
        jest.advanceTimersByTime(1000);

        expect(fn).toHaveBeenCalledTimes(1);
    });
    
    it('组件卸载时候不会被执行', () => {
        const fn = jest.fn();
        const {unmount} = renderHook(() => useInterval(fn, 1000, false, false));

        expect(fn).not.toHaveBeenCalled();
        unmount();

        jest.advanceTimersByTime(1000);

        expect(fn).not.toHaveBeenCalled();
    });
})