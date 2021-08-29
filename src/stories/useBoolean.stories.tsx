import {storiesOf} from '@storybook/react';
import {Button} from 'antd';
import useBoolean from '../useBoolean';

const Test = () => {
    const {visible, show, hide} = useBoolean(true);

    return (
        <div>
            {visible && '我是一段文字'}
            <Button onClick={show}>显示</Button>
            <Button onClick={hide}>隐藏</Button>
        </div>
    );
};

storiesOf('useBoolean', module)
    .add('规范', () => <Test />);