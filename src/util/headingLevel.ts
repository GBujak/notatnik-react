
// Daj tylko pierwsze 6 znaków, bo i tak tylko tyle będzie sprawdzane, a w
// JavaScript string to typ przekazywany po kopii.

export function headingLevel(beginning: string): number {
    let heading_level: number = 0;
    for (let i = 0; i <= 4; i++) {
        if (beginning[i] === "#") heading_level = i + 1;
        else if (beginning[i] === " ") return heading_level;
        else return 0;
    }
    return (beginning[5] === " ") ? heading_level : 0;
}
