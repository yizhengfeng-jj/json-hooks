import {renderHook} from '@testing-library/react-hooks';
import useEffectOnce from './index';

const mockFn = jest.fn();
const mockReturnFn = jest.fn().mockReturnValue(mockFn);

it('第一次加载，mockFn会执行一次', () => {
    const {rerender} = renderHook(() => useEffectOnce(mockFn));

    expect(mockFn).toHaveBeenCalledTimes(1);

    rerender();
    expect(mockFn).toHaveBeenCalledTimes(1);
});

it('第一次卸载，mockFn会执行一次', () => {
    const {unmount} = renderHook(() => useEffectOnce(mockReturnFn));

    expect(mockFn).not.toHaveBeenCalled();

    unmount();
    expect(mockFn).toHaveBeenCalledTimes(1);
});