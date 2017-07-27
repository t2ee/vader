import {
    LogLevel,
} from '@t2ee/sl4js';
import {
    Component,
    Value,
} from '@t2ee/core';

@Component
class RouterConfiguration {

    @Value('server.logging.level', 'application')
    public logLevel: LogLevel;

    @Value('server.logging.enabled', 'application')
    public logEnabled: boolean;
}

export default RouterConfiguration;
