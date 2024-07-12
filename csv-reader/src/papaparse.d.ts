declare module 'papaparse' {
    interface ParseResult<T> {
        data: T[];
        errors: any[];
        meta: {
            delimiter: string;
            linebreak: string;
            aborted: boolean;
            truncated: boolean;
            cursor: number;
            fields: string[];
        };
    }

    interface ParseConfig<T> {
        delimiter?: string;
        newline?: string;
        quoteChar?: string;
        escapeChar?: string;
        header?: boolean;
        dynamicTyping?: boolean | ((field: string) => boolean);
        preview?: number;
        encoding?: string;
        worker?: boolean;
        comments?: string | boolean;
        step?: (results: ParseResult<T>, parser: any) => void;
        complete?: (results: ParseResult<T>) => void;
        error?: (error: any, file: any) => void;
        download?: boolean;
        skipEmptyLines?: boolean | 'greedy';
        chunk?: (results: ParseResult<T>, parser: any) => void;
        fastMode?: boolean;
        beforeFirstChunk?: (chunk: string) => string | void;
        withCredentials?: boolean;
        transform?: (value: string, field: string) => any;
    }

    function parse<T>(file: File | string, config?: ParseConfig<T>): void;

    export { parse, ParseResult, ParseConfig };
}
