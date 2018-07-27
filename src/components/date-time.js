import 'moment/locale/zh-cn';
import 'moment-timezone';
import Moment from 'react-moment';
import React from 'react';

// Sets the global moment configurations.
// TODO
// For now just use the hard coded locale and time zone, should adapt to client browser's configuration.
Moment.globalLocale = 'zh-cn';
Moment.globalFormat = 'YYYY-MM-DD Ahh:mm';
Moment.globalTimezone = 'Asia/Shanghai';
Moment.globalElement = 'span';

class DateTime extends React.Component {
  render() {
    return (
      <Moment fromNowDuring={24 * 60 * 60 * 1000}>{this.props.children}</Moment>
    )
  }
}

export default DateTime;
