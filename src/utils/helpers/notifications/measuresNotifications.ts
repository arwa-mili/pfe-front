import { DiseasesAndSchedulesClient } from '../../../interfaces/diseases/userDiseasesAndSchedules.interface';
import notifee, {
  AndroidColor,
  AndroidImportance,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType
} from '@notifee/react-native';

export const clearAllNotifications = async () => {
  await notifee.cancelAllNotifications();
};
/*
  await notifee.cancelAllNotifications({
    channelId: channelId
});
*/

export const scheduleNotifications = async (
  schedules: DiseasesAndSchedulesClient[]
) => {
  for (const disease of schedules) {
    for (const measure of disease.schedule.measures) {
      const { time, iso_weekday, name } = measure;
      //console.log(time, iso_weekday, name);
      const today = new Date();
      const currentWeekday = today.getDay();
      //console.log(currentWeekday);
      let daysUntilNextWeekday = iso_weekday - currentWeekday;
      //console.log(daysUntilNextWeekday);
      if (daysUntilNextWeekday < 0) {
        daysUntilNextWeekday += 7;
      }
      const nextOccurrenceDate = new Date(
        today.getTime() + daysUntilNextWeekday * 24 * 60 * 60 * 1000
      );
      const [hours, minutes, seconds] = time.split(':');
      nextOccurrenceDate.setHours(
        parseInt(hours, 10),
        parseInt(minutes, 10),
        parseInt(seconds, 10)
      );

      // If the next occurrence date is in the past, add a week to it
      if (nextOccurrenceDate < today) {
        nextOccurrenceDate.setDate(nextOccurrenceDate.getDate() + 7);
      }

      const formattedDate = nextOccurrenceDate.toLocaleDateString('en-US', {
        weekday: 'long', // full name of the day of the week (e.g., "Monday")
        day: 'numeric', // day of the month (e.g., "1", "2", ..., "31")
        month: 'long', // full name of the month (e.g., "January", "February", ...)
        year: 'numeric' // 4-digit year (e.g., "2023")
      });

      const formattedTime = nextOccurrenceDate.toLocaleTimeString('en-US', {
        hour: 'numeric', // 2-digit hour (e.g., "01", "02", ..., "12")
        minute: '2-digit', // 2-digit minute (e.g., "00", "01", ..., "59")
        hour12: true // whether to use 12-hour clock format (true) or 24-hour clock format (false)
      });

      // Combine the formatted date and time
      const formattedDateTime = `${formattedDate}, ${formattedTime}`;

      // Create a time-based trigger
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: nextOccurrenceDate.getTime(),
        repeatFrequency: RepeatFrequency.WEEKLY
      };

      const channelId = await notifee.createChannel({
        id: `${name}_channel`,
        name: `${name} Channel`,
        importance: AndroidImportance.HIGH,
        lights: true,
        lightColor: AndroidColor.RED
      });

      // Display a notification
      await notifee.createTriggerNotification(
        {
          title: disease.diseaseName,
          body: `you have to measure your ${measure.name}`,
          android: {
            channelId,
            importance: AndroidImportance.HIGH
          }
        },
        trigger
      );
    }
  }
};
