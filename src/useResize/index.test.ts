import {renderHook} from '@testing-library/react-hooks';

import useResize from './index';

test('测试resize', () => {
    const {result} = renderHook(() => useResize());
    const {width, height} = result.current;

    expect(typeof width).toBe('number');
    expect(typeof height).toBe('number');
}); 