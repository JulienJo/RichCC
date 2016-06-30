!function(){"use strict";var e={richccTmplDatepicker:'        <div class="uib-datepicker richcc-datepicker" ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">            <div class="richcc-comp-title">Calendar</div>            <div class="richcc-cal-holder">                <richcc-daypicker ng-switch-when="day" tabindex="0"></richcc-daypicker>                <richcc-monthpicker-heatmap ng-switch-when="month" ng-if="yearMapHeat == true" tabindex="0"></richcc-monthpicker-heatmap>                <richcc-monthpicker-eventmap ng-switch-when="month" ng-if="yearMapHeat == false" tabindex="0"></richcc-monthpicker-eventmap>                <richcc-yearpicker ng-switch-when="year" tabindex="0"></richcc-yearpicker>            </div>        </div>    ',richccTmplDay:'        <table class="uib-daypicker richcc-daypicker" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}" ng-class="{\'richcc-light\': light}">            <thead>                <tr class="header-action-holder">                    <th colspan="1" ng-if="light != true"></th>                    <th colspan="{{light == true ? 8 : 5}}">                        <div class="header-actions" ng-class="{\'calNavHidden\' : hideCalNav == true}">                            <div class="richcc-icon-container nav-left" cc-key="move(-1)" role="button" tabindex="0" ng-disabled="preventCalNav == true" ng-hide="hideCalNav == true">                                <i class="richcc-icon icon-ScrollChevronLeftLegacy"></i>                            </div>                            <div class="richcc-icon-container labelHolder" id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" cc-key="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="0">                                <label class="title">{{title}}</label>                            </div>                            <div class="richcc-icon-container nav-right" cc-key="move(1)" role="button" tabindex="0" ng-disabled="preventCalNav == true" ng-hide="hideCalNav == true">                                <i class="richcc-icon icon-ScrollChevronRightLegacy"></i>                            </div>                        </div>                    </th>                    <th colspan="1" ng-if="light != true"></th>                </tr>                <tr class="header-dayname-row">                    <th ng-if="showWeeks && false" class="text-center"></th>                    <th colspan="1" ng-repeat="label in ::labels track by $index" class="text-center dayTitle"><span aria-label="{{::label.full}}">{{::label.abbr | limitTo:1}}</span></th>                    <th colspan="1" ng-if="light == true"></th>                </tr>            </thead>            <tbody>                <tr class="uib-weeks richcc-row" ng-repeat="row in rows track by $index" ng-init="rowindex = $index">                    <td ng-if="showWeeks && false" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>                    <td ng-repeat="dt in row track by $index" class="uib-day text-center richcc-td" role="gridcell" id="{{::dt.uid}}" ng-class="::dt.customClass" colspan="1" ng-disabled="::dt.disabled" ng-init="columnindex = $index" ng-click="richccDaySelected(dt, eventDetails[dt.key])" uib-popover-template="dayPopUpTmpl" popover-trigger="{{popUpTrigger(eventDetails[dt.key])}}" popover-append-to-body="true" popover-placement="{{getPopUpPositionForDayMap(rowindex, columnindex)}}" popover-class="richcc-popup-container">                        <div class="richcc-icon-container dayHolder" uib-is-class="                             \'cc-info\' for selectedDt,                             \'cc-active\' for activeDt                             on dt" ng-class="::{\'cc-current\': dt.current, \'cc-muted\': dt.secondary}" tabindex="0" ng-if="light != true">                            <div class="richcc-day">                                <span>{{::dt.label}}</span>                            </div>                        </div>                        <div class="richcc-time-label" ng-show="showDataLabel == true && light != true">                            <span ng-show="dataLabels[dt.key]">{{::dataLabels[dt.key]}}</span>                            <span ng-hide="dataLabels[dt.key]">{{::defaultDataLabel}}</span>                            <span class="customIconClass" ng-class="dt.customIconClass"></span>                        </div>                        <div class="markHolder" style="position:relative;" ng-show="eventDetails[dt.key].length > 0">                            <div class="mark step-{{event.step}}" ng-class="{\'top\': event.order == 1, \'bottom\': event.order == 2}" ng-style="{\'color\': event.color, \'width\': light != true ?  \'calc(\' + 100 * event.paintBoxLength + \'% - 8px)\' : \'calc(\' + 100 * event.paintBoxLength + \'% - 20px)\'}" ng-repeat="event in eventDetails[dt.key] track by $index" ng-if="event.startPaint == true" style="color:#fff;">                                <div class="mark-text-initial" ng-if="light == true" ng-style="{\'color\': event.bgcolor}">{{event.initial | limitTo: 1}}</div>                                <div class="mark-stripe" ng-style="{\'border-color\': light == false && event.highlightBorder == true ? event.highlightBorderColor : \'transparent\'}" ng-class="{\'highlightBorder\': light == false ? event.highlightBorder : \'\'}">                                    <div class="mark-stripe-color" ng-style="{\'background-color\': event.bgcolor}">                                        <span class="text">{{event.name}}</span>                                    </div>                                </div>                            </div>                            <div class="mark morePresent" ng-show="eventDetails[dt.key].length > 2 && showMarkerForMoreEvents != false">                                <div class="richcc-icon-container">                                    <i class="richcc-icon icon-more"></i>                                </div>                            </div>                        </div>                    </td>                    <td colspan="1" ng-if="light == true" class="richcc-td richcc-light-lastdaymark">                        <span>{{::row[6].label}}</span>                    </td>                </tr>            </tbody>        </table>    ',richccTmplMonthEventViewer:'        <table class="uib-daypicker richcc-monthviewer" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}" ng-class="{\'richcc-light\': light}" ng-init="parent = $parent">            <thead style="height:0 !important; margin:0;padding:0;line-height:0;">                <tr class="header-action-holder" style="height:0 !important; margin:0;padding:0;line-height:0;">                    <th colspan="1" class="w48" style="height:0 !important; margin:0;padding:0;line-height:0;"></th>                    <th colspan="38" style="height:0 !important; margin:0;padding:0;line-height:0;">&#xA0;</th>                </tr>            </thead>            <tbody>                <tr class="uib-weeks richcc-row">                    <td colspan="1" class="w48 eventMonthMarker" cc-key="monthSelectCallback()">{{parent.monthViewData[monthIndex].dt.label | limitTo:3}}</td>                    <td ng-repeat="row in parent.monthViewData[monthIndex].rows track by $index" role="gridcell" ng-attr-colspan="{{weekindex == 5 ? 3 : 7}}" class="uib-day text-center richcc-td richcc-td-space{{weekindex}}" ng-init="weekindex = $index">                        <div class="richcc-month-eventbox" ng-repeat="column in row track by $index" ng-if="(weekindex != 5) || (weekindex == 5 && $index < 3)">                            <div class="richcc-eventbox-content {{::column.customClass}}" ng-class="{\'notInPresentMonth\' : column.monthIndex != monthIndex, \'showingDates\': parent.eventPopupSettings.showDateInYearView == true}" ng-init="popitem = column;mEvents = parent.monthWiseEventDetails[monthIndex][popitem.key]" uib-popover-template="monthPopUpTmpl" ng-click="richccDaySelected(column, parent.monthWiseEventDetails[monthIndex][popitem.key])" popover-trigger="{{popUpTriggerYearView(mEvents)}}" popover-append-to-body="true" popover-placement="{{getPopUpPositionForMonthEventMap(monthIndex, weekindex)}}" popover-class="richcc-popup-container">                                                                <div class="markHolder" style="position:relative;" ng-if="parent.monthWiseEventDetails[monthIndex][column.key].length > 0">                                    <div class="month-date" ng-show="column.monthIndex == monthIndex && parent.eventPopupSettings.showDateInYearView == true">{{popitem.date | date:\'dd\'}}</div>                                    <div class="mark step-{{event.step}}" ng-show="parent.monthWiseEventDetails[monthIndex][column.key].length > 0" ng-class="{\'top\': event.order == 1, \'bottom\': event.order == 2}" ng-style="{\'color\': event.color, \'width\': \'calc(\' + 100 * event.paintBoxLengthForMonth + \'% - 18px)\'}" ng-repeat="event in parent.monthWiseEventDetails[monthIndex][column.key] track by $index" ng-if="event.startPaintForMonth == true" style="color:#fff;">                                        <div class="mark-text-initial" ng-style="{\'color\': event.bgcolor}">{{event.initial | limitTo: 1}}</div>                                        <!--<div class="mark-stripe light" ng-style="{\'background-color\': event.bgcolor}"></div>-->                                        <div class="mark-stripe light">                                            <div class="mark-stripe-color" ng-style="{\'background-color\': event.bgcolor}"></div>                                        </div>                                    </div>                                </div>                                                            </div>                        </div>                    </td>                </tr>            </tbody>        </table>    ',richccTmplMonthEventWrap:'        <table class="uib-monthpicker richcc-daypicker" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">            <thead>                <tr class="header-action-holder">                    <th colspan="1"></th>                    <th colspan="4">                        <div class="header-actions">                            <div class="richcc-icon-container nav-left" cc-key="move(-1)" role="button" tabindex="0" ng-disabled="preventCalNav == true">                                <i class="richcc-icon icon-ScrollChevronLeftLegacy"></i>                            </div>                            <div class="richcc-icon-container labelHolder" id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" cc-key="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="0">                                <label class="title">{{title}}</label>                            </div>                            <div class="richcc-icon-container nav-right" cc-key="move(1)" role="button" tabindex="0" ng-disabled="preventCalNav == true">                                <i class="richcc-icon icon-ScrollChevronRightLegacy"></i>                            </div>                        </div>                    </th>                    <th colspan="1"></th>                </tr>            </thead>            <tbody>                <tr class="uib-months" style="height: 24px;">                    <td colspan="6">                        <rich-months-day-marker></rich-months-day-marker>                    </td>                </tr>                <tr class="uib-months" ng-repeat="row in rows track by $index">                    <td ng-repeat="dt in row track by $index" class="uib-month text-center richcc-month-event-box-holder" role="gridcell" id="{{::dt.uid}}" ng-class="::dt.customClass" colspan="6">                        <rich-months-event-viewer month-date="dt" month-index="dt.monthIndex" month-select-callback="select(dt.date)"></rich-months-event-viewer>                    </td>                </tr>            </tbody>        </table>    ',richccTmplMonthHeatViewer:'        <table class="uib-daypicker richcc-monthviewer" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}" ng-class="{\'richcc-light\': light}" ng-init="parent = $parent">            <thead>                <tr class="header-action-holder">                    <th colspan="7" cc-key="monthSelectCallback()">{{parent.monthViewData[monthIndex].dt.label | limitTo:3}}</th>                </tr>            </thead>            <tbody>                <tr class="uib-weeks richcc-row" ng-repeat="row in [0,1,2,3,4,5,6] track by $index">                    <td ng-repeat="column in parent.monthViewData[monthIndex].rows track by $index" class="uib-day text-center richcc-td" role="gridcell" id="{{::mdt.key}}" colspan="1" ng-style="{\'opacity\': column[row].monthIndex != monthIndex ? 0 : 1}" ng-init="mdt = column[row]; popitem = column[row]" ng-attr-len="{{parent.monthWiseEventDetails[monthIndex][mdt.key].length}}" ng-click="richccDaySelected(column, parent.monthWiseEventDetails[monthIndex][popitem.key])" uib-popover-template="monthPopUpTmpl" popover-trigger="{{parent.monthWiseEventDetails[monthIndex][popitem.key].length > 0 &&  eventPopupSettings.hidden != true ? \'outsideClick\' : \'none\'}}" popover-append-to-body="true" popover-placement="{{getPopUpPositionForMonthHeatMap(monthIndex)}}" popover-class="richcc-popup-container">                        <div class="richcc-mv-box" ng-class="{\'fullyOpaque\': parent.monthWiseEventDetails[monthIndex][mdt.key].length > 2}" ng-attr-transparent="{{parent.monthWiseEventDetails[monthIndex][mdt.key].length}}"></div>                    </td>                </tr>            </tbody>        </table>    ',richccTmplMonthHeatWrap:'        <table class="uib-monthpicker richcc-daypicker" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">            <thead>                <tr class="header-action-holder">                    <th colspan="1" class="w48"></th>                    <th colspan="1"></th>                    <th colspan="4">                        <div class="header-actions">                            <div class="richcc-icon-container nav-left" cc-key="move(-1)" role="button" tabindex="0" ng-disabled="preventCalNav == true">                                <i class="richcc-icon icon-ScrollChevronLeftLegacy"></i>                            </div>                            <div class="richcc-icon-container labelHolder" id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" cc-key="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="0">                                <label class="title">{{title}}</label>                            </div>                            <div class="richcc-icon-container nav-right" cc-key="move(1)" role="button" tabindex="0" ng-disabled="preventCalNav == true">                                <i class="richcc-icon icon-ScrollChevronRightLegacy"></i>                            </div>                        </div>                    </th>                    <th colspan="1"></th>                </tr>            </thead>            <tbody>                <tr class="uib-months" ng-repeat="row in rows track by $index">                    <td class="uib-month text-center w48" role="gridcell" colspan="1">                        <rich-months-day-marker></rich-months-day-marker>                    </td>                    <td ng-repeat="dt in row track by $index" class="uib-month text-center" role="gridcell" id="{{::dt.uid}}" ng-class="::dt.customClass" colspan="1">                        <rich-months-heat-viewer month-date="dt" month-index="dt.monthIndex" month-select-callback="select(dt.date)"></rich-months-heat-viewer>                    </td>                </tr>            </tbody>        </table>    ',richccTmplMonthViewerDayMarker:'        <table class="uib-daypicker richcc-monthviewer" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}" ng-class="{\'richcc-light\': light}" ng-init="parent = $parent">            <thead ng-if="yearMapHeat == true">                <tr class="header-action-holder">                    <th colspan="1">&#xA0;</th>                </tr>            </thead>            <thead style="height:0 !important; margin:0;padding:0;line-height:0;" ng-if="yearMapHeat == false">                <tr class="header-action-holder" style="height:0 !important; margin:0;padding:0;line-height:0;">                    <th colspan="1" class="w48" style="height:0 !important; margin:0;padding:0;line-height:0;"></th>                    <th colspan="38" style="height:0 !important; margin:0;padding:0;line-height:0;">&#xA0;</th>                </tr>            </thead>            <tbody>                <tr class="uib-weeks richcc-row" ng-repeat="row in [0,1,2,3,4,5,6] track by $index" ng-if="yearMapHeat == true">                    <td class="uib-day text-center richcc-td" role="gridcell">                        <span class="marker" ng-show="$index == 1 || $index == 3 || $index == 5">{{monthWiseEventMarkers[0][row].abbr | limitTo:1}}</span>                    </td>                </tr>                <tr class="uib-weeks richcc-row" ng-if="yearMapHeat == false">                    <td colspan="1" class="w48">&#xA0;</td>                    <td ng-repeat="row in parent.monthViewData[0].rows track by $index" role="gridcell" ng-attr-colspan="{{weekindex == 5 ? 3 : 7}}" class="uib-day text-center richcc-td richcc-td-space{{weekindex}}" ng-init="weekindex = $index">                        <div class="richcc-month-eventbox eventDayMarker" ng-repeat="column in row track by $index" ng-if="(weekindex != 5) || (weekindex == 5 && $index < 3)">                            <span>{{monthWiseEventMarkers[0][$index].abbr | limitTo:1}}</span>                        </div>                    </td>                </tr>            </tbody>        </table>    ',richccTmplPopup:'        <div>            <ul class="uib-datepicker-popup dropdown-menu richcc-datepicker-popup" dropdown-nested="" ng-if="isOpen" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)" ng-click="$event.stopPropagation()">                <li ng-transclude=""></li>                <li ng-if="showButtonBar" class="uib-button-bar">                    <span class="btn-group pull-left">                        <button type="button" class="btn btn-sm btn-info uib-datepicker-current" ng-click="select(\'today\')" ng-disabled="isDisabled(\'today\')">{{ getText(\'current\') }}</button>                        <button type="button" class="btn btn-sm btn-danger uib-clear" ng-click="select(null)">{{ getText(\'clear\') }}</button>                    </span>                    <button type="button" class="btn btn-sm btn-success pull-right uib-close" ng-click="close()">{{ getText(\'close\') }}</button>                </li>            </ul>        </div>    ',richccTmplDayPopup:'        <div class="richcc-day-popup">            <div class="event-container" ng-class="{\'noActions\': !(eventPopupSettings.showLeft || eventPopupSettings.showRight)}">                <div class="event-container-label">{{dt.date | date:\'dd MMM, yyyy\'}} <span ng-show="eventDetails[dt.key].length > 0 ">({{eventDetails[dt.key].length}} Events)</span></div>                <div class="event-details-container">                    <div class="event-detail" ng-repeat="event in eventDetails[dt.key] track by $index" ng-click="popUpEventClickHandler(dt, event)">                        <div class="event-marker"></div>                        <div class="event-title-holder" ng-style="{\'border-left-color\': event.bgcolor}">                            <span class="event-title">{{event.name}}</span> : <span class="event-subject">{{event.subject}}</span>                            <div class="event-timing-holder">                                <span class="event-time">{{event.startDt | date:\'MM/dd/yy\'}} 9.00</span><span style="padding: 0 15px;">-</span><span class="event-time">{{event.endDt | date:\'MM/dd/yy\'}} 9.00</span>                            </div>                        </div>                    </div>                </div>            </div>            <div class="event-action-container" ng-class="{\'singleButtonOnly\' : (eventPopupSettings.showLeft != false && eventPopupSettings.showRight == false) || (eventPopupSettings.showLeft == false && eventPopupSettings.showRight != false)}" ng-show="eventPopupSettings.showLeft || eventPopupSettings.showRight">                <button class="event-action" ng-if="eventPopupSettings.showLeft != false" ng-click="popUpLeftHandler(dt, eventDetails[dt.key])">{{eventPopupSettings.leftLabel || \'Add Events\'}}</button>                <button class="event-action" ng-if="eventPopupSettings.showRight != false" ng-click="popUpRightHandler(dt, eventDetails[dt.key])">{{eventPopupSettings.rightLabel || \'Edit Events\'}}</button>                <div class="event-separator"></div>            </div>        </div>    ',richccTmplRichccMonthPopup:'        <div class="richcc-day-popup">            <div class="event-container" ng-class="{\'noActions\': !(parent.eventPopupSettings.showLeft || parent.eventPopupSettings.showRight)}">                <div class="event-container-label">{{popitem.date | date:\'dd MMM, yyyy\'}} <span ng-show="parent.monthWiseEventDetails[monthIndex][popitem.key].length > 0 ">({{parent.monthWiseEventDetails[monthIndex][popitem.key].length}} Events)</span></div>                <div class="event-details-container">                    <div class="event-detail" ng-repeat="event in parent.monthWiseEventDetails[monthIndex][popitem.key] track by $index" ng-click="popUpEventClickHandler(popitem, event)">                        <div class="event-marker"></div>                        <div class="event-title-holder" ng-style="{\'border-left-color\': event.bgcolor}">                            <span class="event-title">{{event.name}}</span> : <span class="event-subject">{{event.subject}}</span>                            <div class="event-timing-holder">                                <span class="event-time">{{event.startDt | date:\'MM/dd/yy\'}} 9.00</span><span style="padding: 0 15px;">-</span><span class="event-time">{{event.endDt | date:\'MM/dd/yy\'}} 9.00</span>                            </div>                        </div>                    </div>                </div>            </div>            <div class="event-action-container" ng-class="{\'singleButtonOnly\' : (parent.eventPopupSettings.showLeft != false && parent.eventPopupSettings.showRight == false) || (parent.eventPopupSettings.showLeft == false && parent.eventPopupSettings.showRight != false)}" ng-show="parent.eventPopupSettings.showLeft || parent.eventPopupSettings.showRight">                <button class="event-action" ng-if="parent.eventPopupSettings.showLeft != false" ng-click="popUpLeftHandler(popitem, parent.monthWiseEventDetails[monthIndex][popitem.key])">{{parent.eventPopupSettings.leftLabel || \'Add Events\'}}</button>                <button class="event-action" ng-if="parent.eventPopupSettings.showRight != false" ng-click="popUpRightHandler(popitem, parent.monthWiseEventDetails[monthIndex][popitem.key])">{{parent.eventPopupSettings.rightLabel || \'Edit Events\'}}</button>                <div class="event-separator"></div>            </div>        </div>    ',richccTmplYear:'        <table class="uib-yearpicker richcc-daypicker" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">            <thead>                <tr class="header-action-holder">                    <th colspan="1"></th>                    <th colspan="3">                        <div class="header-actions">                            <div class="richcc-icon-container nav-left" cc-key="move(-1)" role="button" tabindex="0" ng-disabled="preventCalNav == true">                                <i class="richcc-icon icon-ScrollChevronLeftLegacy"></i>                            </div>                            <div class="richcc-icon-container labelHolder" id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" cc-key="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="0">                                <label class="title">{{title}}</label>                            </div>                            <div class="richcc-icon-container nav-right" cc-key="move(1)" role="button" tabindex="0" ng-disabled="preventCalNav == true">                                <i class="richcc-icon icon-ScrollChevronRightLegacy"></i>                            </div>                        </div>                    </th>                    <th colspan="1"></th>                </tr>            </thead>            <thead>            </thead>            <tbody>                <tr class="uib-years" ng-repeat="row in rows track by $index">                    <td ng-repeat="dt in row track by $index" class="uib-year text-center" role="gridcell" id="{{::dt.uid}}" ng-class="::dt.customClass">                        <button type="button" class="btn btn-default" uib-is-class="                                \'btn-info\' for selectedDt,                                \'active\' for activeDt                                on dt" ng-click="select(dt.date)" ng-disabled="::dt.disabled" tabindex="-1">                            <span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span>                        </button>                    </td>                </tr>            </tbody>        </table>    '};angular.module("richcc.bootstrap.datepicker").run(["$templateCache",function(t){t.put("template/richcc/datepicker.html",e.richccTmplDatepicker),t.put("template/richcc/day.html",e.richccTmplDay),t.put("template/richcc/monthEventViewer.html",e.richccTmplMonthEventViewer),t.put("template/richcc/monthEventWrap.html",e.richccTmplMonthEventWrap),t.put("template/richcc/monthHeatViewer.html",e.richccTmplMonthHeatViewer),t.put("template/richcc/monthHeatWrap.html",e.richccTmplMonthHeatWrap),t.put("template/richcc/monthViewerDayMarker.html",e.richccTmplMonthViewerDayMarker),t.put("template/richcc/popup.html",e.richccTmplPopup),t.put("template/richcc/richccDayPopup.html",e.richccTmplDayPopup),t.put("template/richcc/richccMonthPopup.html",e.richccTmplRichccMonthPopup),t.put("template/richcc/year.html",e.richccTmplYear)}])}();