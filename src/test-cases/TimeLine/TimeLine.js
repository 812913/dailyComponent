import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { findDOMNode } from 'react-dom';
import 'moment/locale/zh-cn';
import { extendMoment } from 'moment-range';
import './TimeLine.scss';
import { observer } from 'mobx-react';
// import TimeEvents from './TimeEvents';
import TimeLineStore from './TimeLineStore';
import Line from './Line';

const moment = extendMoment(Moment);
moment.locale('zh-cn');

@observer
class TimeLine extends Component {
  constructor() {
    super();
    const start = moment().startOf('month');
    const end = moment().endOf('month');
    const range = moment.range(start, end);
    // 时间段数
    const days = range.diff('days') + 1;
    this.state = {
      range,
      days,
      singleWidth: 0,
    };
  }

  componentDidMount() {
    this.setSingleWidth();
  }

  setSingleWidth = () => {
    const { days, singleWidth } = this.state;
    const { width } = this.container.getBoundingClientRect();
    const newSingleWidth = Math.floor(width / days);
    const totalWidth = newSingleWidth * days;
    this.container.style.width = `${totalWidth}px`;
    // console.log(width, newSingleWidth);
    if (newSingleWidth !== singleWidth) {
      this.setState({
        singleWidth: newSingleWidth,
      });
    }
  }


  saveRef = name => (ref) => {
    this[name] = ref;
  }


  getHeightLightStyle = () => {
    const HeightLightDuring = TimeLineStore.getHeightLightDuring;
    const { start, end, offsetTop } = HeightLightDuring;
    if (!start || !end) {
      return {};
    }
    const { range, singleWidth } = this.state;
    const marginLeft = moment(start).diff(moment(range.start), 'days') * singleWidth;
    const width = (moment(end).diff(moment(start), 'days') + 1) * singleWidth;
    const top = offsetTop;
    return {
      position: 'absolute',
      // height: 'calc(100% - 5px)',
      pointerEvents: 'none',
      borderLeft: '1px dashed red',
      borderRight: '1px dashed red', // rgb(76, 154, 255)
      marginLeft,
      width,
      top,
      bottom: 0,
    };
  }
  
  getHeightLightTodayStyle = () => {
    const { range, singleWidth } = this.state;
    const marginLeft = moment().diff(moment(range.start), 'days') * singleWidth;

    return {
      position: 'absolute',
      pointerEvents: 'none',
      borderLeft: '1px dashed orange',
      marginLeft,
      width: 0,
      top: 0,
      bottom: 0,
    };
  }

  /**
   * 点击页面重设日期高亮
   */
  resetHeightDuring = () => {
    TimeLineStore.setHeightLightDuring({});
  }

  render() {
    const { singleWidth, range } = this.state;
    const HeightLightDuring = TimeLineStore.getHeightLightDuring;
    return (
      <div style={{ height: '100%', display: 'flex' }}>
        {/*  */}
        <div>
          {'sss'}
        </div>
        <div role="none" className="TimeLine-container" ref={this.saveRef('container')} onClick={this.resetHeightDuring}>
          <div style={{ height: 'calc(100% - 56px)', overflowX: 'hidden', overflowY: 'auto' }}>
            {/* <div className="HeightLightDuring" style={this.getHeightLightStyle()} /> */}
            <div className="TimeLine-content">
              {'content'}
              <Line singleWidth={singleWidth} range={range} />
              {/* <TimeEvents singleWidth={singleWidth} range={range} /> */}
              <div className="HeightLightToday" style={this.getHeightLightTodayStyle()} />
              <div className="HeightLightDuring" style={this.getHeightLightStyle()} />
            </div>
          </div>
          <div className="fixed-line">
            <Line singleWidth={singleWidth} range={range} HeightLightDuring={HeightLightDuring} />
          </div>
        </div>
      </div>
    );
  }
}

TimeLine.propTypes = {

};

export default TimeLine;
