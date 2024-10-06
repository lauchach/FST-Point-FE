import React from 'react';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="dialog">
            <p>{message}</p>
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default ConfirmDialog;
