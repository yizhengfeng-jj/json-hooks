import {renderHook, act} from '@testing-library/react-hooks';
import useBoolean from './index';

test('test useBoolean', () => {
    const {result} = renderHook(() => useBoolean());
    const {visible, show, hide} = result.current;

    // 测试默认值是否为false
    expect(visible).toBe(false);

    // 设置为true
    act(() => show());
    expect(result.current.visible).toBe(true);

    // 设置为false
    act(() => hide());
    expect(result.current.visible).toBe(false);
});