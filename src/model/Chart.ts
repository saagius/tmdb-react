export interface IChartData {
    x: string;
    y: number;
    color?: string;
}

export interface IChart {
    x_title: string;
    y_title: string;
    data: IChartData[];
}