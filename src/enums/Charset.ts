enum Charset {
    UTF8,
}

namespace Charset {
    export function toString(charset: Charset): string {
        switch (charset) {
            case Charset.UTF8:
                return 'utf8';
        }
    }
}

export default Charset;
