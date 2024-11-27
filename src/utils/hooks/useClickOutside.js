import { useCallback, useEffect } from 'react';

export default function useClickOutside(ref, fnCallback) {
    const checkEventNode = useCallback(
        event => {
            if (!ref?.current?.contains(event.target)) fnCallback();
        },
        [fnCallback, ref]
    );

    useEffect(() => {
        window.addEventListener('mousedown', checkEventNode);
        return () =>
            window.removeEventListener('mousedown', checkEventNode);
    }, [checkEventNode]);
}