  import { isFunction, isBoolean, isObject, isArray, isString, isNumber } from '@/utils/is/index';
  import moment from 'moment'
      // 处理表单值
      function handleFormValues(values: any) {
        if (!isObject(values)) {
          return {};
        }
        const resMap = {};
        for (let [key, value] of Object.entries(values)) {
          if ((isArray(value) && value.length === 0) || isFunction(value)) {
            continue;
          }
          if (isObject(value)) {
            value = unref(getProps).transformDateFunc(value);
          }
          if (isArray(value) && value[0]._isAMomentObject && value[1]._isAMomentObject) {
            value = value.map((item) => unref(getProps).transformDateFunc(item));
          }
          // 去除空格
          if (isString(value)) {
            value = value.trim();
          }
          resMap[key] = value;
        }
        return handleRangeTimeValue(resMap);
      }
      /**
       * @description: 处理时间区间参数
       */
      function handleRangeTimeValue(values) {
        const fieldMapToTime = unref(getProps).fieldMapToTime;

        if (!fieldMapToTime || !Array.isArray(fieldMapToTime)) {
          return values;
        }

        for (const [field, [startTimeKey, endTimeKey, format = 'YYYY-MM-DD']] of fieldMapToTime) {
          if (!field || !startTimeKey || !endTimeKey || !values[field]) {
            continue;
          }

          const [startTime, endTime]: string[] = values[field];

          values[startTimeKey] = moment(startTime).format(format);
          values[endTimeKey] = moment(endTime).format(format);
        }

        return values;
      }