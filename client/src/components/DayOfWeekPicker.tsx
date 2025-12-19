const DayOfWeekPicker = () => {
  return (
    <div className="mb-4">
      <div className="flex justify-between">
        <label htmlFor="day-week-picker">Day Of The Week: </label>
        <select id="day-week-picker">
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>
      </div>
    </div>
  );
};

export default DayOfWeekPicker;
