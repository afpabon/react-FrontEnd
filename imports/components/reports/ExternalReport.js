import React from 'react'
import PropTypes from 'prop-types'
import { languageHelper,  TAPi18n, variables, timezonesHelper} from '../../ARTIMO_FUNCIONES'

class ExternalReporFilters extends Component {
  constructor (props) {

  }
  getReportUrl () {
    var name = props.name;
    var base = Array.isArray(SERVICES.REPORTS[name]) ?
      SERVICES.REPORTS[name][0] :
      SERVICES.REPORTS[name];
    var url = REPORTS.baseUrl + encodeURIComponent(base);
    if (! props.manualSuffix) {
      url = url + '/report';
    }
    else {
      url = url + props.manualSuffix;
    }

    var params = '';
    if (! props.ignoreParams) {
      var params = jsonUtilities.encodeQueryData({
        userid : props.username || REPORTS.userName,
        password : props.password || REPORTS.password,
        token : authenticationManager.getToken()
      });
      return url + '?' + params;
    }
    else {
      return url;
    }
  }
  getFullReportUrl () {
    let template = Template.instance();
    if (template.data.GetSessionVariable) {
      let sessionValue = Session.get(template.data.GetSessionVariable);
      if (sessionValue) {
        let name = template.data.Name;
        let base = Array.isArray(SERVICES.REPORTS[name]) ?
          SERVICES.REPORTS[name][0] :
          SERVICES.REPORTS[name];
        let url = REPORTS.baseUrl + encodeURIComponent(base);
        if (! template.data.ManualSuffix) {
          url = url + '/report';
        }
        else {
          url = url + template.data.ManualSuffix;
        }
        var params = $.extend({
          userid : template.data.Username || REPORTS.userName,
          password : template.data.Password || REPORTS.password,
          token : authenticationManager.getToken()
        }, sessionValue);
        var params = jsonUtilities.encodeQueryData(params);
        return url + '?' + params;
      }
    }
    else {
      return '';
    } 
  }
  getFormMethod () {
    let template = Template.instance();
    return template.data.FormMethod || 'post';
  }
  externalReportLoadingConfiguration () {
    let content = {
      BackgroundColor : '#f0f0f0',
      AnimationIcon : 'CIRCLE',
      BlockedDiv : 'external_report'
    };
    if(this.config && this.config.updatingMessage && Session.get('loadingMsg') == 'updating'){
      content.Message = this.config.updatingMessage;
    }
    else{
      content.Message = TAPi18n.__('Loading');
    }
    return content;
  }

  // Generic parameters
  getAcceptedPage () {
    return REPORTS.acceptedPage;
  }
  getHtmlProportionalWidth () {
    return REPORTS.htmlProportionalWidth;
  }
  getRenderMode () {
    return REPORTS.renderMode;
  }
  getShowParameters () {
    return REPORTS.showParameters;
  }
  getTimeZone () {
    return Session.get('userTimezone');
  }
  getLocale () {
    return TAPi18n.getLanguage();
  }

  // Header helpers
  getExternalReportCaption () {
    return TAPi18n.__(this.HeaderCaption);
  }
  getArrowPosition () {
    return Template.instance().collapseArrowIcon.get();
  }

  // Filter rendering
  // Gets all main filter rows, separated by the "NewRow" field
  getMainFiltersRows () {
    let config = Template.instance().data;
    let rows = [];
    let currentRow = null;
    let mainFilters = _.filter(config.FilterFields, function (field) {
      return ! field.IsAdditional && field.Type.toLowerCase() != 'hidden';
    });
    for (i = 0; i < mainFilters.length; i++) {
      let field = mainFilters[i];
      if (i == 0 || field.NewRow == true) {
        if (currentRow) {
          rows.push(currentRow);
        }
        currentRow = new Array();
      }
      currentRow.push(field);
    }
    if (i > 0) {
      rows.push(currentRow);
    }
    return rows;
  }
  getHiddenFields () {
    let config = Template.instance().data;
    let hiddenFilters = _.filter(config.FilterFields, function (field) {
      return ! field.IsAdditional && field.Type.toLowerCase() == 'hidden';
    });
    return hiddenFilters;
  }
  getRequiredClass () {
    return this.Required ? 'text-primary' : 'text-muted';
  }
  getFilterFieldCaption () {
    let config = Template.instance().data;
    if (config.LocalizationPrefix) {
      return TAPi18n.__(config.LocalizationPrefix + '_' + this.Caption.replace('.', '_'));
    }
    else {
      return TAPi18n.__(this.Caption.replace('.', '_'));
    }
  }
  getStartLabel () {
    let config = Template.instance().data;
    if (config.LocalizationPrefix) {
      return TAPi18n.__(config.LocalizationPrefix + '_' + this.StartCaption.replace('.', '_'));
    }
    else {
      return TAPi18n.__(this.StartCaption.replace('.', '_'));
    }
  }
  getEndLabel () {
    let config = Template.instance().data;
    if (config.LocalizationPrefix) {
      return TAPi18n.__(config.LocalizationPrefix + '_' + this.EndCaption.replace('.', '_'));
    }
    else {
      return TAPi18n.__(this.EndCaption.replace('.', '_'));
    }
  }
  showNoItems () {
    let changed = Session.get(this.Name + '_Loaded');
    let source = this.DataSource();
    return this.ShowNoItems && source && source.length > 0;
  }
  getNoItemsCaption () {
    return this.NoItemsCaption;
  }
  getAllDisabled () {
    let changed = Session.get(this.Name + '_Loaded');
    let source = this.DataSource();
    if (! source || source.length == 0) {
      return 'disabled';
    }
    else {
      return '';
    }
  }
  getAllChecked () {
    let changed = Session.get(this.Name + '_Loaded');
    let source = this.DataSource();
    if (! source || source.length == 0) {
      return 'checked';
    }
    else {
      return '';
    }
  }

  // Filter type helpers
  isFilterCheckbox () {
    return this.Type.toLowerCase() == 'checkbox';    
  }
  isFilterInput () {
    return this.Type.toLowerCase() == 'input';    
  }
  isFilterMultipleSelection () {
    return this.Type.toLowerCase() == 'multipleselection';
  }
  isFilterDate () {
    return this.Type.toLowerCase() == 'date';
  }
  isFilterDateRange () {
    return this.Type.toLowerCase() == 'daterange';
  }
  isFilterMonth () {
    return this.Type.toLowerCase() == 'month';
  }
  isFilterSelection () {
    return this.Type.toLowerCase() == 'selection';
  }
  isFilterOutputTarget () {
    return this.Type.toLowerCase() == 'outputtarget';
  }
  isFilterDropdown () {
    return this.Type.toLowerCase() == 'dropdown';
  }
  isLocalizedCaption () {
    return this.Type.toLowerCase() == 'localizedcaption';
  }
  getInputType () {
    return this.InputType || 'text';
  }
  getName () {
    if (this.GetName) {
      return this.GetName();
    }
    else {
      return this.Name;
    }
  }

  // Helpers for dropdown filters
  getDropdownConfig () {
    let config = Template.instance().data;
    var self = this;
    let result = {
      Name : self.Name,
      PlainText : false,
      MultipleValues : self.Multiple || false,
      Type : self.Type || 'Normal',
      Placeholder : TAPi18n.__(config.LocalizationPrefix ?
        config.LocalizationPrefix + '_' + self.Caption.replace('.', '_') :
        self.Caption.replace('.', '_')),
      SearchField : self.SearchField,
      AdditionalFilters : self.AdditionalFilters,
      OnlyExistingData : true,
      LimitResults : 20,
      KeyField : self.KeyField || null,
      SearchRoute : self.SearchRoute,
      SessionVariable : self.SessionVariable,
      GetFormattedOption : self.GetFormattedOption,
      GetFormattedData : self.GetFormattedData,
      GetDetailText : self.GetDetailText,
      ObjectSize : 'sm',
      Mapping : self.Mapping
    };

    return result;
  }

  // Helpers for multiple selection filters
  selectionData () {
    return this.DataSource();
  }
  multipleSelectionData () {
    let changed = Session.get(this.Name + '_Loaded');
    if (changed && Template.instance().lastNode) {
      let result = this.DataSource();
      let groupCheckbox = Template.instance().$('.multiple-container-all[data-column="' + this.Name + '"]');
      if (result && result.length > 0) {
        groupCheckbox.removeClass('hidden');
      }
      else {
        groupCheckbox.addClass('hidden');
      }
      return result;
    }
    else {
      return null;
    }
  }
  getSelectionColumnSize () {
    return Template.parentData(1).ColumnSize || this.ColumnSize || 12;
  }
  getSelectionKey () {
    var column = Template.parentData(1);
    if (column.SelectionKey) {
      return column.SelectionKey(this);
    }
    else {
      return this;
    }
  }
  getSelectionCaption () {
    var column = Template.parentData(1);
    if (column.SelectionCaption) {
      return column.SelectionCaption(this);
    }
    else {
      return this;
    }
  }
  getColumnName () {
    if (Template.parentData(1).GetName) {
      return Template.parentData(1).GetName();
    }
    else {
      return Template.parentData(1).Name || this.Name;
    }
  }
  getLocalizedCaption () {
    return TAPi18n.__(this.Caption);
  }

  // Helpers for data limiter
  getDataLimiterField () {
    return this.ReportLimitField;
  }
  getStartDataLimiterField () {
    if (this.ReportLimitField) {
      return 'SD';
    }
    else {
      return '';
    }
  }
  getEndDataLimiterField () {
    if (this.ReportLimitField) {
      return 'ED';
    }
    else {
      return '';
    }
  }
  getTriggerLimiter () {
    return this.TriggerLimiter ? 'trigger-limiter' : '';
  }  
  render() {
  if (props.FilterFields && props.FilterFields.length > 0) {
    return (
      <div class="panel panel-default search-panel">
        <form action={this.getReportUrl()} method="{{getFormMethod}}" target="external_report" class="external-report-filters">
          <div class="panel-heading datepicker-parent" role="tab" id="heading_filters">
            <h4 class="panel-title">
              <div class="row">
                <div class="col-md-6">
                  <a role="button" data-toggle="collapse" href="#body_filters" aria-expanded="true" aria-controls="body_filters">
                    {{getExternalReportCaption}}
                  </a>
                </div>
                <div class="col-md-6 text-right">
                  <a role="button" data-toggle="collapse" href="#body_filters" aria-expanded="true" aria-controls="body_filters">
                    <i class="{{getArrowPosition}}"></i>
                  </a>
                </div>
              </div>
            </h4>
          </div>
          <div id="body_filters" class="panel-collapse search-collapse collapse in" role="tabpanel" aria-labelledby="heading_filters">
            <div class="panel-body">
              <input type="hidden" value="{{getAcceptedPage}}" name="accepted-page">
              <input type="hidden" value="{{getHtmlProportionalWidth}}" name="htmlProportionalWidth">
              <input type="hidden" value="{{getRenderMode}}" name="renderMode">
              <input type="hidden" value="{{getShowParameters}}" name="showParameters">
              <input type="hidden" value="{{getTimeZone}}" name="timeZone">
              <input type="hidden" value="{{getLocale}}" name="locale">
              <input type="hidden" name="timeMeasureUnit">
              <input type="hidden" name="timeFormula">
              <input type="hidden" name="tempMeasureUnit">
              <input type="hidden" name="tempFormula">

              {{#each getMainFiltersRows}}
                <div class="col-md-12 infotable-form-group">
                  {{#each this}}
                    <div class="col-md-{{this.Columns}} col-min-padding">
                      {{#if isLocalizedCaption}}
                      {{else}}
                        <div class="col-md-12 col-min-padding">
                          <label for="filter_{{this.Name}}" class="control-label {{getRequiredClass}}">{{getFilterFieldCaption}}</label>
                        </div>
                      {{/if}}
                      <div class="col-md-12 col-min-padding">
                        {{#if isFilterCheckbox}}
                          <div id="filter_{{this.Name}}" data-limiter-field="{{getDataLimiterField}}">
                            <input type="checkbox" id="filter_{{this.Name}}" class="external-report-field switch-checkbox">
                            <input type="hidden" class="checkbox-value" name="{{getName}}" value="0">
                          </div>
                        {{else}}
                        {{#if isFilterInput}}
                          <div id="filter_{{this.Name}}" data-limiter-field="{{getDataLimiterField}}">
                            <input type="{{getInputType}}" name="{{this.Name}}" id="filter_{{this.Name}}" class="external-report-field form-control filter-input">
                          </div>
                        {{else}}
                        {{#if isFilterSelection}}
                          <div id="filter_{{this.Name}}" data-limiter-field="{{getDataLimiterField}}" class="dropdown-container {{getTriggerLimiter}}">
                            <select class="select2 filter-selection input-sm external-report-field" name="{{getName}}">
                              {{#each selectionData}}
                                <option value="{{this.Id}}">{{this.Caption}}</option>
                              {{/each}}
                            </select>
                          </div>
                        {{else}} {{#if isFilterMultipleSelection}}
                          <div class="panel panel-default filter-multiple-selection" id="filter_{{this.Name}}" style="margin-bottom:0" data-limiter-field="{{getDataLimiterField}}">
                            <div class="panel-body">
                              <div class="col-md-12 col-min-padding hidden multiple-container-all" data-column="{{this.Name}}">
                                <input type="checkbox" class="multiple-select-all external-report-field" data-column="{{this.Name}}" {{getAllDisabled}} {{getAllChecked}}>&nbsp;<b>{{_ 'All'}}</b>
                              </div>
                              {{#each multipleSelectionData}}
                                <div class="col-md-{{getSelectionColumnSize}} col-min-padding">
                                  <input type="checkbox" class="multiple-selection-checkbox external-report-field" data-key="{{getSelectionKey}}" data-column="{{getColumnName}}">&nbsp;{{getSelectionCaption}}
                                  <input type="hidden" class="multiple-selection-hidden" value="{{getSelectionKey}}" name="{{getColumnName}}" disabled>
                                </div>
                              {{/each}}
                              {{#if showNoItems}}
                                <div class="col-md-{{getSelectionColumnSize}} col-min-padding">
                                  <input type="checkbox" class="multiple-selection-checkbox external-report-field" data-key="none" data-column="{{getColumnName}}">&nbsp;{{getNoItemsCaption}}
                                </div>
                              {{/if}}
                            </div>
                          </div>
                        {{else}} {{#if isFilterDate}}
                          <div class="input-group datetimepicker filter-field" id="filter_{{this.Name}}" data-limiter-field="{{getDataLimiterField}}">
                            <span class="input-group-addon input-sm"><i class="fa fa-calendar"></i></span>
                            <input class="form-control input-sm external-report-field" type="text" id="filter_{{this.Name}}" placeholder="{{getFilterFieldCaption}}" name="{{getName}}"/>
                          </div>
                        {{else}} {{#if isFilterMonth}}
                          <div class="input-group datetimepicker-month filter-field" id="filter_{{this.Name}}" data-limiter-field="{{getDataLimiterField}}">
                            <span class="input-group-addon input-sm"><i class="fa fa-calendar"></i></span>
                            <input class="form-control input-sm external-report-field" type="text" id="filter_{{this.Name}}" name="{{getName}}" placeholder="{{getFilterFieldCaption}}"/>
                          </div>
                        {{else}} {{#if isFilterDateRange}}
                          <div class="col-md-6 col-min-padding">
                            <label for="filter_{{this.Name}}_Start" class="control-label" style="float: left">{{getStartLabel}}&nbsp;&nbsp;</label>
                            <div class="input-group datetimepicker filter-field" id="filter_{{this.StartName}}" data-limiter-field="{{getStartDataLimiterField}}">
                              <span class="input-group-addon input-sm"><i class="fa fa-calendar"></i></span>
                              <input class="form-control input-sm external-report-field" type="text" id="filter_{{this.StartName}}" name="{{this.StartName}}" placeholder="{{getFilterFieldMinCaption}}"/>
                            </div>
                          </div>
                          <div class="col-md-6 col-min-padding">
                            <label for="filter_{{this.Name}}_Start" class="control-label" style="float: left">{{getEndLabel}}&nbsp;&nbsp;</label>
                            <div class="input-group datetimepicker filter-field" id="filter_{{this.EndName}}" data-limiter-field="{{getEndDataLimiterField}}">
                              <span class="input-group-addon input-sm"><i class="fa fa-calendar"></i></span>
                              <input class="form-control input-sm external-report-field" type="text" id="filter_{{this.EndName}}" name="{{this.EndName}}" placeholder="{{getFilterFieldMaxCaption}}"/>
                            </div>
                          </div>
                        {{else}} {{#if isFilterOutputTarget}}
                          <div id="filter_{{this.Name}}" data-limiter-field="{{getDataLimiterField}}" class="dropdown-container">
                            <select class="select2 output-target input-sm external-report-field" name="{{getName}}">
                              <option value="table/html;page-mode=stream">{{_ 'Output_Html'}}</option>
                              <option value="pageable/pdf">{{_ 'Output_Pdf'}}</option>
                              <option value="table/excel;page-mode=flow">{{_ 'Output_Excel'}}</option>
                              <option value="table/csv;page-mode=stream">{{_ 'Output_Csv'}}</option>
                            </select>
                          </div>
                        {{else}} {{#if isFilterDropdown}}
                          <div class="dropdown-container" data-limiter-field="{{getDataLimiterField}}">
                            {{> configurableDropdown getDropdownConfig}}
                          </div>
                        {{else}} {{#if isLocalizedCaption}}
                          <input type="hidden" id="filter_{{this.Name}}" name="{{getName}}" value="{{getLocalizedCaption}}" />
                        {{/if}} {{/if}} {{/if}} {{/if}} {{/if}} {{/if}} {{/if}} {{/if}} {{/if}} {{/if}}
                      </div>
                    </div>
                  {{/each}}
                </div>
              {{/each}}
              {{#each getHiddenFields}}
                <input type="hidden" id="filter_{{this.Name}}" name="{{getName}}" />
              {{/each}}
            </div>
            <div class="panel-footer">
              <div class="col-md-12">
                <div class="form-group">
                  <button type="submit" class="pull-right btn search-button btn-success btn-sm glyphicon glyphicon-search">
                    {{_ 'Search'}}
                  </button>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const ExternalReport = ({ name, headerCaption, userName, password, filterFields }) => (
  <ExternalReporFilters filterFields=filterFields />

  <!-- IFrame -->
  {{> loadingDiv externalReportLoadingConfiguration}}
  <iframe id="external_report" name="external_report" class="element-full-height element-full-width external-report-frame" src="{{getFullReportUrl}}">
  </iframe>  
)

ExternalReport.propTypes = {
  name: PropTypes.string.isRequired,
  headerCaption: PropTypes.string.isRequired,
  userName: PropTypes.string,
  password: PropTypes.string,
  filterFields: PropTypes.array,
  manualSuffix: PropTypes.string,
}

export default ExternalReport