import {useBoolean} from './src';

import './app.less';

export default () => {
    const {visible, show, hide} = useBoolean(false);

    return (
        <div className="test">
            {visible && (<div>想显示的内容</div>)}
            <div>
                <button onClick={() => show()}>显示</button>
                <button onClick={() => hide()}>隐藏</button>
            </div>
        </div>
    );
};