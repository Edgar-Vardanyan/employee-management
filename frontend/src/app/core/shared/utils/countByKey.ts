export function countByKey(data: any[], key: string, value: any): number {
    return data.filter((item) => item[key] === value).length;
}