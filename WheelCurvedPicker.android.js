'use strict';

import React, {Component} from 'react';
import {
  View,
  ColorPropType,
  requireNativeComponent,
} from 'react-native';
import PropTypes from 'prop-types';


class WheelCurvedPicker extends Component{
  static propTypes = {
    ...View.propTypes,

    data: PropTypes.array,

    selectedIndex: PropTypes.number,

    selectTextColor: ColorPropType,

    itemStyle: PropTypes.object, //textColor  textSize

    textSize: PropTypes.number,
    textColor: ColorPropType,

    // 设置滚轮选择器指示器样式
    indicatorStyle: PropTypes.object, //indicatorColor  indicatorSize

    indicatorSize: PropTypes.number,
    indicatorColor: ColorPropType,

    // 设置滚轮选择器是否显示指示器
    indicator: PropTypes.bool,

    // 设置滚轮选择器是否显示幕布
    curtain: PropTypes.bool,
    // 设置滚轮选择器幕布颜色
    curtainColor: ColorPropType,

    // 设置滚轮选择器是否有空气感
    atmospheric: PropTypes.bool,

    // 滚轮选择器是否开启卷曲效果
    curved: PropTypes.bool,

    // 设置滚轮选择器可见数据项数量
    visibleItemCount: PropTypes.number,

    itemSpace: PropTypes.number,

    onValueChange: PropTypes.func,

    selectedValue: PropTypes.any,

  }

  static defaultProps = {
    itemStyle : {color:"white", fontSize:26},
    indicatorStyle: {color:"red", fontSize:0},
    itemSpace: 20,
  }

  constructor (props) {
    super(props)
    this.state = {
      ...this._stateFromProps(props)
    };
    this._onValueChange = this._onValueChange.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this._stateFromProps(nextProps));
  }

  _stateFromProps (props) {
    var selectedIndex = 0;
    var items = [];
    React.Children.forEach(props.children, function (child, index) {
      if (child.props.value === props.selectedValue) {
        selectedIndex = index;
      }
      items.push({value: index, theValue: child.props.value, label: child.props.label});
    });

    var textSize = props.itemStyle.fontSize
    var textColor = props.itemStyle.color
    var selectTextColor = props.selectTextColor
    var itemSpace = props.itemSpace
    var indicator = props.indicator
    var indicatorColor = props.indicatorStyle.color
    var indicatorSize = props.indicatorStyle.fontSize
    var curtain = props.curtain
    var curtainColor = props.curtainColor
    var atmospheric = props.atmospheric
    var curved = props.curved
    var visibleItemCount = props.visibleItemCount

    return {selectedIndex, items, textSize, textColor, selectTextColor, itemSpace,indicator, indicatorColor, indicatorSize, curtain, curtainColor, atmospheric, curved, visibleItemCount} ;
  }

  _onValueChange (e: Event) {
    if (this.props.onValueChange) {
      var selectedItem = this.state.items[e.nativeEvent.data];
      !selectedItem && (selectedItem = {theValue:0});
      this.props.onValueChange(selectedItem.theValue);
    }
  }

  render() {
    return <WheelCurvedPickerNative
    {...this.props}
    onValueChange={this._onValueChange}
    data={this.state.items}
    selectedIndex={parseInt(this.state.selectedIndex)}
    textColor={this.state.textColor}
    textSize={this.state.textSize}
    selectTextColor={this.state.selectTextColor}
    itemSpace={this.state.itemSpace}
    indicator={this.state.indicator}
    indicatorColor={this.state.indicatorColor}
    indicatorSize={this.state.indicatorSize}
    curtain={this.state.curtain}
    atmospheric={this.state.atmospheric}
    curved={this.state.curved}
    visibleItemCount={this.state.visibleItemCount}
  />;
  }
}

class Item extends Component {
  static propTypes = {
    value: PropTypes.any, // string or integer basically
    label: PropTypes.string,
  }
  render () {
    // These items don't get rendered directly.
    return null;
  }
}
WheelCurvedPicker.Item = Item

var WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker', WheelCurvedPicker);

module.exports = WheelCurvedPicker;
