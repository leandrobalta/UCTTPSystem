export interface TimeTableModel {
    Monday: Monday[];
    Tuesday: Tuesday[];
    Wednesday: Wednesday[];
    Thursday: Thursday[];
    Friday: Friday[];
    Saturday: Saturday[];
}

export interface Monday {
    time: string;
    disciplines: string[];
}

export interface Tuesday {
    time: string;
    disciplines: string[];
}

export interface Wednesday {
    time: string;
    disciplines: string[];
}

export interface Thursday {
    time: string;
    disciplines: string[];
}

export interface Friday {
    time: string;
    disciplines: string[];
}

export interface Saturday {
    time: string;
    disciplines: string[];
}
