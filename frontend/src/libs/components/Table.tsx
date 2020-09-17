import React from 'react';

export interface IText {
    head: string[]
    data: any[]
    col: number
}

export const Text: React.FC<IText> = ({data, col}: IText) => {
    return (
        <div className="table">
            <div className="table__head">
                <div className="head_item">ФИО</div>
                <div className="head_item">Логин</div>
                <div className="head_item">Группа</div>
                <div className="head_item">Статус</div>
                <div className="head_item">Телефон</div>
                <div className="head_item">Позиция</div>
            </div>
            <div className="table__body">
                <div className="body_item">ФИО</div>
                <div className="body_item">ФИО</div>
                <div className="body_item">ФИО</div>
                <div className="body_item">ФИО</div>
                <div className="body_item">ФИО</div>
                <div className="body_item">ФИО</div>
            </div>
        </div>
    )
}