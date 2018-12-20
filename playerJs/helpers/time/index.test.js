import * as timeHelper from './index';
import expect from 'expect';

describe('Time Helper', function() {
    it('Get time ratio', function() {
        expect(timeHelper.getTimeRatio(500, 1000)).toBe(0.5);
        expect(timeHelper.getTimeRatio(500, 0)).toBe(-1);
        expect(timeHelper.getTimeRatio('aaa', 'bbb')).toBe(-1);
    });

    it('Format time in seconds', function() {
        expect(timeHelper.time_to_formattedTime(20, 'mm:ss')).toBe('00:20');
        expect(timeHelper.time_to_formattedTime(20)).toBe('00:00:20');
    });

    it('Get seconds from formatted time', function() {
        expect(timeHelper.formattedTime_to_time('00:20', 'mm:ss')).toBe(20);
        expect(timeHelper.formattedTime_to_time('00:00:20', 'HH:mm:ss')).toBe(20);
        expect(timeHelper.formattedTime_to_time('00:00:20')).toBe(20);
        expect(timeHelper.formattedTime_to_time()).toBe(-1);
    });
});