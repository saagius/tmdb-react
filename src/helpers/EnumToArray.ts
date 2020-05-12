export default function enumToArray(e: any): string[] {
    return Object.keys(e)
        .map(key => e[key]);
}