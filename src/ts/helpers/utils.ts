export class Utils {
    static stringToDOM(text: string): any {
        return new DOMParser().parseFromString(text, 'text/html').querySelector('body').firstElementChild;
    }

    static formToObject(form: any): any {
        return  Array.from(new FormData(form).entries()).reduce((memo, pair) => ({
            ...memo,
            [pair[0]]: pair[1],
        }), {});
    }
}