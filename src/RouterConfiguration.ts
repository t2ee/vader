import {
    LogLevel,
} from 'sl4js';
import {
    Configurable,
    ConfigField,
} from '@t2ee/configurable';

@Configurable('router')
class RouterConfiguration {
    @ConfigField
    public log: boolean;

    @ConfigField
    public logLevel: LogLevel;
}

export default RouterConfiguration;
