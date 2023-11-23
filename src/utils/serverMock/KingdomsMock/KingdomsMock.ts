import { Kingdom } from "../../../dataStrucrures/KingdomInterfase";

export function mockedGetKingdoms() {
    const kingdoms: Kingdom[] = [
        {
            Id: 0,
            Name: 'Нет ответа от бэка',
            Area: 0,
            Capital: 'Нет ответа от бэка',
            Image: '',
            Description: 'Нет ответа от бэка',
            State: 'Нет ответа от бэка',
        },
    ];
    return kingdoms;
}

export function mockedGetKingdom() {
    const kingdom: Kingdom[] = [
        {
            Id: 0,
            Name: 'Нет ответа от бэка',
            Area: 0,
            Capital: 'Нет ответа от бэка',
            Image: '',
            Description: 'Нет ответа от бэка',
            State: 'Нет ответа от бэка',
        },
    ];
    return kingdom;
}
