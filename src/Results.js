import React from 'react';

const Results = ({ results }) => {
    return (
        <div className="p-4">
            {results.map((result, index) => (
                <div key={index} className="border-b-2 border-gray-300 py-2">
                    {result}
                </div>
            ))}
        </div>
    );
};

export default Results;
