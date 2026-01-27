/**
 * Simple CSV Parser capable of handling quoted fields.
 * @param csvText The raw CSV string content
 * @returns Array of objects with keys from the header
 */
export function parseCSV(csvText: string): any[] {
    const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length === 0) return [];

    const headers = parseCSVLine(lines[0]);
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length === headers.length) {
            const obj: any = {};
            headers.forEach((header, index) => {
                obj[header.trim()] = values[index];
            });
            result.push(obj);
        }
    }

    return result;
}

/**
 * Parses a single CSV line, respecting quotes.
 */
function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (inQuotes) {
            if (char === '"') {
                if (i + 1 < line.length && line[i + 1] === '"') {
                    // Escaped quote (""') -> just one quote
                    current += '"';
                    i++;
                } else {
                    // End of quoted section
                    inQuotes = false;
                }
            } else {
                current += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
    }
    result.push(current); // Push the last value
    return result;
}
