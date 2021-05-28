import { message } from 'antd';
import { useState } from 'react';

export const useInput = ( value ) => {
    const [ input, setInput ] = useState( value );
    const set = ( e ) => {
        const someting = e && e.target && e.target.value;
        setInput( someting );
    };
    return [ input, set ];
};
