import { useEffect, useCallback } from 'react';

const useKeyboard = (actionList = [], type = 'keyup') => {
    const handleKeyboard = useCallback(
        ({ keyCode }) => {
            const action = actionList.find(([code]) => code === keyCode);
            if (Array.isArray(action) && typeof action[1] === 'function')
                action[1]();
        },
        [actionList]
    );

    useEffect(() => {
        window.addEventListener(type, handleKeyboard);
        return () => {
            window.removeEventListener(type, handleKeyboard);
        };
    }, [handleKeyboard, type]);
};

export default useKeyboard;
