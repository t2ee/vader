declare enum Charset {
    UTF8 = 0,
}
declare namespace Charset {
    function toString(charset: Charset): string;
}
export default Charset;
