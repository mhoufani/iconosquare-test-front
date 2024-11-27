import React from "react";
import cs from "classnames";
import { PlayIcon, PauseIcon, ArrowPathIcon, BackwardIcon, ForwardIcon } from '@heroicons/react/20/solid';

import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";

const Toolbar = () => {
    const { data, dispatch } = useLiveChartContext();
    return (
        <div className="flex">
            <button
                className={"flex items-center border border-gray-300 rounded m-3 p-2"}
                onClick={() => {
                    dispatch({
                            type: 'playing',
                            payload: !data.isPlaying
                        },
                    )
                }}
            >
                {
                    data.isPlaying
                        ? <PauseIcon className="flex-1 size-5 text-violet-400"/>
                        : <PlayIcon className="flex-1 size-5 text-violet-400"/>
                }
            </button>
            <button
                className={"flex items-center border border-gray-300 rounded m-3 p-2"}
                onClick={() => {
                    dispatch({
                            type: 'clean_event'
                        },
                    )
                }}
            >

                <ArrowPathIcon className="flex-1 size-5 text-violet-400"/>
            </button>
            <button
                className={"flex items-center border border-gray-300 rounded m-3 p-2"}
                disabled={!data.navBackwardEnabled}
                onClick={() => {
                    dispatch({
                            type: 'nav_backward',
                        },
                    )
                }}
            >
                <BackwardIcon className={cs("flex-1 size-5", data.navBackwardEnabled ? "text-violet-400" : "text-violet-200" )}/>
            </button>
            <button
                className={"flex items-center border border-gray-300 rounded m-3 p-2"}
                disabled={!data.navForwardEnabled}
                onClick={() => {
                    dispatch({
                        type: 'nav_forward',
                        },
                    );
                }}
            >
                <ForwardIcon className={cs("flex-1 size-5", data.navForwardEnabled ? "text-violet-400" : "text-violet-200" )} />
            </button>
        </div>
    );
}

export default Toolbar;