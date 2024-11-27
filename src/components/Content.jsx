import React from 'react';
import LiveTable from './LiveTable';
import LiveChart from './LiveChart';
import Toolbar from './Toolbar';

const Content = () => {
    return (
        <div className="border rounded-md mx-auto max-w-7xl px-8 drop-shadow-lg my-2 py-4">
            <LiveChart />
            <Toolbar/>
            <LiveTable />
        </div>
    )
}

export default Content;