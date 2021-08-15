import {renderHook, RenderHookResult} from '@testing-library/react-hooks';
import {size} from 'lodash';


import useTimeout, {UseTimeoutReturn} from './index';

const initTimer = 5000;
describe('定时器setTimeout组件测试', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    beforeEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('测试useTimeout已经被定义', () => {
        expect(useTimeout).toBeDefined();
    });

    it('抛出的函数应该为2个', () => {
        const fn = jest.fn();
        const {result} = renderHook(() => useTimeout(fn, initTimer));

        expect(size(result.current)).toBe(2);
    });

    it('初次加载不会执行，固定时间后才会被调用', () => {
        const fn = jest.fn();
        const {result} = renderHook(() => useTimeout(fn, initTimer));

        expect(fn).not.toHaveBeenCalled();

        jest.advanceTimersByTime(initTimer);

        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('组件卸载时候不会被调用', () => {
        const fn = jest.fn();
        const {result, unmount} = renderHook(() => useTimeout(fn, initTimer));
        expect(fn).not.toHaveBeenCalled();

        unmount();

        jest.advanceTimersByTime(initTimer);

        expect(fn).not.toHaveBeenCalled();

    });

    it('clear会取消定时器', () => {
        const fn = jest.fn();
        const {result, unmount} = renderHook(() => useTimeout(fn, initTimer));
        const {clear} = result.current;

        clear();
        jest.advanceTimersByTime(initTimer);
        expect(fn).not.toHaveBeenCalled();
    });

    function getHook(
        ms: number = initTimer,
        fn: () => void = jest.fn()
    ): [() => void, RenderHookResult<{delay: number; cb: () => void}, UseTimeoutReturn>]  {
        return [
            fn,
            renderHook(({delay = initTimer, cb}) => useTimeout(cb, delay), {initialProps: {delay: ms, cb: fn}})
        ];
    }

    it('定时器会根据时间重置', () => {
        const [spy, hook] = getHook(50);
        expect(spy).not.toHaveBeenCalled();

        hook.rerender({delay: 8000, cb: spy});

        jest.advanceTimersByTime(8000);
        expect(spy).toHaveBeenCalledTimes(1);
    });
})