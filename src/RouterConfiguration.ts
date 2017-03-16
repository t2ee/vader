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
    log: boolean;

    @ConfigField
    logLevel: LogLevel;
}

export default RouterConfiguration;