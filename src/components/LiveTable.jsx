import React, { useRef, useCallback } from 'react';
import cs from 'classnames';
import { useLiveChartContext } from '../utils/hooks/useLiveChartContext';
import useKeyboard from '../utils/hooks/useKeyboard';
import useClickOutside from "../utils/hooks/useClickOutside";

const LiveTable = () => {
    const { data, dispatch } = useLiveChartContext();
    const InputRef = useRef(null);
    const nbTotalEvents = data?.events?.length
    const eventsFiltered = data.events.slice(nbTotalEvents - 20 - data.navIdx, nbTotalEvents - data.navIdx);

    const fnEditionSave = useCallback(() => {
        data.editing && dispatch({ type: "editing_save" });
    }, [data.editing]);

    const fnEditionReset = useCallback(() => {
        data.editing && dispatch({ type: "editing_reset" });
    }, [data.editing]);

    useKeyboard([[ 13, fnEditionSave], [27, fnEditionReset]]);

    useClickOutside(InputRef, fnEditionReset);

    return (
        <div className={'grid grid-cols-21 grid-rows-3 w-full bg-white rounded'}>
            <div className="col-start-1 col-end-1 row-start-1 row-end-1 p-3 text-gray-600 border-r border-gray-300">Index</div>
            <div
                className="col-start-1 col-end-1 row-start-2 row-end-2 p-3 border-t border-gray-300 text-gray-600 border-r border-gray-300">Value
                1
            </div>
            <div
                className="col-start-1 col-end-1 row-start-3 row-end-3 p-3 border-t border-gray-300 text-gray-600 border-r border-gray-300">Value
                2
            </div>
            {eventsFiltered.map((event, idx) => (
                <>
                    <div className={cs(`col-start-${idx + 3} col-end-${idx + 3} row-start-1 row-end-1 text-gray-600 flex justify-center items-center`, {
                        "bg-purple-50": idx % 2 === 0
                    })}>{event.index}</div>
                    <div className={cs(`col-start-${idx + 3} col-end-${idx + 3} row-start-2 row-end-2 text-gray-600 flex justify-center items-center`,
                        data.editing?.id !== event.index
                            ? "border-t border-gray-300 "
                            : 'border border-gray-700',
                        {
                            "bg-purple-50": idx % 2 === 0
                        })}
                         onClick={(e) => {
                             !data.editing && dispatch({
                                 type: "edit",
                                 payload: {
                                     id: event.index,
                                     row: 'value1'
                                 }
                             });
                         }}>
                        {data.editing?.id === event.index &&
                            <input
                                ref={InputRef}
                                autoFocus
                                className="w-full h-full appearance-none"
                                type={"number"}
                                step={1}
                                value={data.editing.value}
                                onChange={(e) => {
                                    dispatch({
                                        type: "editing",
                                        payload: {
                                            id: event.index,
                                            value: e.target.value
                                        }
                                    })
                                }}
                            /> || <span className={"overflow-hidden text-ellipsis cursor-pointer"}>{event.value1}</span>}
                    </div>
                    <div className={cs(`col-start-${idx + 3} col-end-${idx + 3} row-start-3 row-end-3 text-gray-600 border-t border-gray-300 flex justify-center items-center`, {
                        "bg-purple-50": idx % 2 === 0
                    })}>{event.value2}</div>
                </>
            ))}
        </div>
    );
};

export default LiveTable;