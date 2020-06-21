import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

export const LoadingIndicator = props =>{
    const { promiseInProgress } = usePromiseTracker();
    return (
        <>
            {
                promiseInProgress && (<div className="bg_loading">
                                            <div className="col-xs-4 col-sm-2 mx-auto">
                                                <div className="card">
                                                    <div className="card-body text-center p-0">
                                                        <Loader type="ThreeDots" color="#FF8800" height="100" width="100" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)
            }
        </>
    )
}