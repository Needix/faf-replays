class StringUtils {

    static ellipsis = (str: string, length: number) => {
        return str.length > length ? str.substr(0, length - 3) + '...' : str;
    }
}

export default StringUtils;

