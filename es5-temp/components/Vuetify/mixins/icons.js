// Maps internal Vuetify icon names to actual Material Design icon names.
const ICONS_MATERIAL = {
    'complete': 'check',
    'cancel': 'cancel',
    'close': 'close',
    'delete': 'cancel',
    'clear': 'clear',
    'success': 'check_circle',
    'info': 'info',
    'warning': 'priority_high',
    'error': 'warning',
    'prev': 'chevron_left',
    'next': 'chevron_right',
    'checkboxOn': 'check_box',
    'checkboxOff': 'check_box_outline_blank',
    'checkboxIndeterminate': 'indeterminate_check_box',
    'delimiter': 'fiber_manual_record',
    'sort': 'arrow_upward',
    'expand': 'keyboard_arrow_down',
    'menu': 'menu',
    'subgroup': 'arrow_drop_down',
    'dropdown': 'arrow_drop_down',
    'radioOn': 'radio_button_checked',
    'radioOff': 'radio_button_unchecked',
    'edit': 'edit',
    'ratingEmpty': 'star_border',
    'ratingFull': 'star',
    'ratingHalf': 'star_half'
};
// Maps internal Vuetify icon names to actual icons from materialdesignicons.com
const ICONS_MDI = {
    'complete': 'mdi-check',
    'cancel': 'mdi-close-circle',
    'close': 'mdi-close',
    'delete': 'mdi-close-circle',
    'clear': 'mdi-close',
    'success': 'mdi-check-circle',
    'info': 'mdi-information',
    'warning': 'mdi-exclamation',
    'error': 'mdi-alert',
    'prev': 'mdi-chevron-left',
    'next': 'mdi-chevron-right',
    'checkboxOn': 'mdi-checkbox-marked',
    'checkboxOff': 'mdi-checkbox-blank-outline',
    'checkboxIndeterminate': 'mdi-minus-box',
    'delimiter': 'mdi-circle',
    'sort': 'mdi-arrow-up',
    'expand': 'mdi-chevron-down',
    'menu': 'mdi-menu',
    'subgroup': 'mdi-menu-down',
    'dropdown': 'mdi-menu-down',
    'radioOn': 'mdi-radiobox-marked',
    'radioOff': 'mdi-radiobox-blank',
    'edit': 'mdi-pencil',
    'ratingEmpty': 'mdi-star-outline',
    'ratingFull': 'mdi-star',
    'ratingHalf': 'mdi-star-half'
};
// Maps internal Vuetify icon names to actual Font-Awesome 4 icon names.
const ICONS_FONTAWESOME4 = {
    'complete': 'fa fa-check',
    'cancel': 'fa fa-times-circle',
    'close': 'fa fa-times',
    'delete': 'fa fa-times-circle',
    'clear': 'fa fa-times-circle',
    'success': 'fa fa-check-circle',
    'info': 'fa fa-info-circle',
    'warning': 'fa fa-exclamation',
    'error': 'fa fa-exclamation-triangle',
    'prev': 'fa fa-chevron-left',
    'next': 'fa fa-chevron-right',
    'checkboxOn': 'fa fa-check-square',
    'checkboxOff': 'fa fa-square-o',
    'checkboxIndeterminate': 'fa fa-minus-square',
    'delimiter': 'fa fa-circle',
    'sort': 'fa fa-sort-up',
    'expand': 'fa fa-chevron-down',
    'menu': 'fa fa-bars',
    'subgroup': 'fa fa-caret-down',
    'dropdown': 'fa fa-caret-down',
    'radioOn': 'fa fa-dot-circle',
    'radioOff': 'fa fa-circle-o',
    'edit': 'fa fa-pencil',
    'ratingEmpty': 'fa fa-star-o',
    'ratingFull': 'fa fa-star',
    'ratingHalf': 'fa fa-star-half-o'
};
// Maps internal Vuetify icon names to actual Font-Awesome 5+ icon names.
const ICONS_FONTAWESOME = {
    'complete': 'fas fa-check',
    'cancel': 'fas fa-times-circle',
    'close': 'fas fa-times',
    'delete': 'fas fa-times-circle',
    'clear': 'fas fa-times-circle',
    'success': 'fas fa-check-circle',
    'info': 'fas fa-info-circle',
    'warning': 'fas fa-exclamation',
    'error': 'fas fa-exclamation-triangle',
    'prev': 'fas fa-chevron-left',
    'next': 'fas fa-chevron-right',
    'checkboxOn': 'fas fa-check-square',
    'checkboxOff': 'far fa-square',
    'checkboxIndeterminate': 'fas fa-minus-square',
    'delimiter': 'fas fa-circle',
    'sort': 'fas fa-sort-up',
    'expand': 'fas fa-chevron-down',
    'menu': 'fas fa-bars',
    'subgroup': 'fas fa-caret-down',
    'dropdown': 'fas fa-caret-down',
    'radioOn': 'far fa-dot-circle',
    'radioOff': 'far fa-circle',
    'edit': 'fas fa-edit',
    'ratingEmpty': 'far fa-star',
    'ratingFull': 'fas fa-star',
    'ratingHalf': 'fas fa-star-half'
};
const iconSets = {
    md: ICONS_MATERIAL,
    mdi: ICONS_MDI,
    fa: ICONS_FONTAWESOME,
    fa4: ICONS_FONTAWESOME4
};
export default function icons(iconfont = 'md', icons = {}) {
    return Object.assign({}, iconSets[iconfont] || iconSets.md, icons);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WdWV0aWZ5L21peGlucy9pY29ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5RUFBeUU7QUFDekUsTUFBTSxjQUFjLEdBQUc7SUFDckIsVUFBVSxFQUFFLE9BQU87SUFDbkIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsT0FBTyxFQUFFLE9BQU87SUFDaEIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsT0FBTyxFQUFFLE9BQU87SUFDaEIsU0FBUyxFQUFFLGNBQWM7SUFDekIsTUFBTSxFQUFFLE1BQU07SUFDZCxTQUFTLEVBQUUsZUFBZTtJQUMxQixPQUFPLEVBQUUsU0FBUztJQUNsQixNQUFNLEVBQUUsY0FBYztJQUN0QixNQUFNLEVBQUUsZUFBZTtJQUN2QixZQUFZLEVBQUUsV0FBVztJQUN6QixhQUFhLEVBQUUseUJBQXlCO0lBQ3hDLHVCQUF1QixFQUFFLHlCQUF5QjtJQUNsRCxXQUFXLEVBQUUscUJBQXFCO0lBQ2xDLE1BQU0sRUFBRSxjQUFjO0lBQ3RCLFFBQVEsRUFBRSxxQkFBcUI7SUFDL0IsTUFBTSxFQUFFLE1BQU07SUFDZCxVQUFVLEVBQUUsaUJBQWlCO0lBQzdCLFVBQVUsRUFBRSxpQkFBaUI7SUFDN0IsU0FBUyxFQUFFLHNCQUFzQjtJQUNqQyxVQUFVLEVBQUUsd0JBQXdCO0lBQ3BDLE1BQU0sRUFBRSxNQUFNO0lBQ2QsYUFBYSxFQUFFLGFBQWE7SUFDNUIsWUFBWSxFQUFFLE1BQU07SUFDcEIsWUFBWSxFQUFFLFdBQVc7Q0FDMUIsQ0FBQTtBQUVELGdGQUFnRjtBQUNoRixNQUFNLFNBQVMsR0FBRztJQUNoQixVQUFVLEVBQUUsV0FBVztJQUN2QixRQUFRLEVBQUUsa0JBQWtCO0lBQzVCLE9BQU8sRUFBRSxXQUFXO0lBQ3BCLFFBQVEsRUFBRSxrQkFBa0I7SUFDNUIsT0FBTyxFQUFFLFdBQVc7SUFDcEIsU0FBUyxFQUFFLGtC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QUNyQixHQUFHLEVBQUUsa0JBQWtCO0NBQ3hCLENBQUE7QUFFRCxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBRSxRQUFRLEdBQUcsSUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFO0lBQ3hELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDcEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE1hcHMgaW50ZXJuYWwgVnVldGlmeSBpY29uIG5hbWVzIHRvIGFjdHVhbCBNYXRlcmlhbCBEZXNpZ24gaWNvbiBuYW1lcy5cbmNvbnN0IElDT05TX01BVEVSSUFMID0ge1xuICAnY29tcGxldGUnOiAnY2hlY2snLFxuICAnY2FuY2VsJzogJ2NhbmNlbCcsXG4gICdjbG9zZSc6ICdjbG9zZScsXG4gICdkZWxldGUnOiAnY2FuY2VsJywgLy8gZGVsZXRlIChlLmcuIHYtY2hpcCBjbG9zZSlcbiAgJ2NsZWFyJzogJ2NsZWFyJyxcbiAgJ3N1Y2Nlc3MnOiAnY2hlY2tfY2lyY2xlJyxcbiAgJ2luZm8nOiAnaW5mbycsXG4gICd3YXJuaW5nJzogJ3ByaW9yaXR5X2hpZ2gnLFxuICAnZXJyb3InOiAnd2FybmluZycsXG4gICdwcmV2JzogJ2NoZXZyb25fbGVmdCcsXG4gICduZXh0JzogJ2NoZXZyb25fcmlnaHQnLFxuICAnY2hlY2tib3hPbic6ICdjaGVja19ib3gnLFxuICAnY2hlY2tib3hPZmYnOiAnY2hlY2tfYm94X291dGxpbmVfYmxhbmsnLFxuICAnY2hlY2tib3hJbmRldGVybWluYXRlJzogJ2luZGV0ZXJtaW5hdGVfY2hlY2tfYm94JyxcbiAgJ2RlbGltaXRlcic6ICdmaWJlcl9tYW51YWxfcmVjb3JkJywgLy8gZm9yIGNhcm91c2VsXG4gICdzb3J0JzogJ2Fycm93X3Vwd2FyZCcsXG4gICdleHBhbmQnOiAna2V5Ym9hcmRfYXJyb3dfZG93bicsXG4gICdtZW51JzogJ21lbnUnLFxuICAnc3ViZ3JvdXAnOiAnYXJyb3dfZHJvcF9kb3duJyxcbiAgJ2Ryb3Bkb3duJzogJ2Fycm93X2Ryb3BfZG93bicsXG4gICdyYWRpb09uJzogJ3JhZGlvX2J1dHRvbl9jaGVja2VkJyxcbiAgJ3JhZGlvT2ZmJzogJ3JhZGlvX2J1dHRvbl91bmNoZWNrZWQnLFxuICAnZWRpdCc6ICdlZGl0JyxcbiAgJ3JhdGluZ0VtcHR5JzogJ3N0YXJfYm9yZGVyJyxcbiAgJ3JhdGluZ0Z1bGwnOiAnc3RhcicsXG4gICdyYXRpbmdIYWxmJzogJ3N0YXJfaGFsZidcbn1cblxuLy8gTWFwcyBpbnRlcm5hbCBWdWV0aWZ5IGljb24gbmFtZXMgdG8gYWN0dWFsIGljb25zIGZyb20gbWF0ZXJpYWxkZXNpZ25pY29ucy5jb21cbmNvbnN0IElDT05TX01ESSA9IHtcbiAgJ2NvbXBsZXRlJzogJ21kaS1jaGVjaycsXG4gICdjYW5jZWwnOiAnbWRpLWNsb3NlLWNpcmNsZScsXG4gICdjbG9zZSc6ICdtZGktY2xvc2UnLFxuICAnZGVsZXRlJzogJ21kaS1jbG9zZS1jaXJjbGUnLCAvLyBkZWxldGUgKGUuZy4gdi1jaGlwIGNsb3NlKVxuICAnY2xlYXInOiAnbWRpLWNsb3NlJyxcbiAgJ3N1Y2Nlc3MnOiAnbWRpLWNoZWNrLWNpcmNsZScsXG4gICdpbmZvJzogJ21kaS1pbmZvcm1hdGlvbicsXG4gICd3YXJuaW5nJzogJ21kaS1leGNsYW1hdGlvbicsXG4gICdlcnJvcic6ICdtZGktYWxlcnQnLFxuICAncHJldic6ICdtZGktY2hldnJvbi1sZWZ0JyxcbiAgJ25leHQnOiAnbWRpLWNoZXZyb24tcmlnaHQnLFxuICAnY2hlY2tib3hPbic6ICdtZGktY2hlY2tib3gtbWFya2VkJyxcbiAgJ2NoZWNrYm94T2ZmJzogJ21kaS1jaGVja2JveC1ibGFuay1vdXRsaW5lJyxcbiAgJ2NoZWNrYm94SW5kZXRlcm1pbmF0ZSc6ICdtZGktbWludXMtYm94JyxcbiAgJ2RlbGltaXRlcic6ICdtZGktY2lyY2xlJywgLy8gZm9yIGNhcm91c2VsXG4gICdzb3J0JzogJ21kaS1hcnJvdy11cCcsXG4gICdleHBhbmQnOiAnbWRpLWNoZXZyb24tZG93bicsXG4gICdtZW51JzogJ21kaS1tZW51JyxcbiAgJ3N1Ymdyb3VwJzogJ21kaS1tZW51LWRvd24nLFxuICAnZHJvcGRvd24nOiAnbWRpLW1lbnUtZG93bicsXG4gICdyYWRpb09uJzogJ21kaS1yYWRpb2JveC1tYXJrZWQnLFxuICAncmFkaW9PZmYnOiAnbWRpLXJhZGlvYm94LWJsYW5rJyxcbiAgJ2VkaXQnOiAnbWRpLXBlbmNpbCcsXG4gICdyYXRpbmdFbXB0eSc6ICdtZGktc3Rhci1vdXRsaW5lJyxcbiAgJ3JhdGluZ0Z1bGwnOiAnbWRpLXN0YXInLFxuICAncmF0aW5nSGFsZic6ICdtZGktc3Rhci1oYWxmJ1xufVxuXG4vLyBNYXBzIGludGVybmFsIFZ1ZXRpZnkgaWNvbiBuYW1lcyB0byBhY3R1YWwgRm9udC1Bd2Vzb21lIDQgaWNvbiBuYW1lcy5cbmNvbnN0IElDT05TX0ZPTlRBV0VTT01FNCA9IHtcbiAgJ2NvbXBsZXRlJzogJ2ZhIGZhLWNoZWNrJyxcbiAgJ2NhbmNlbCc6ICdmYSBmYS10aW1lcy1jaXJjbGUnLFxuICAnY2xvc2UnOiAnZmEgZmEtdGltZXMnLFxuICAnZGVsZXRlJzogJ2ZhIGZhLXRpbWVzLWNpcmNsZScsIC8vIGRlbGV0ZSAoZS5nLiB2LWNoaXAgY2xvc2UpXG4gICdjbGVhcic6ICdmYSBmYS10aW1lcy1jaXJjbGUnLCAvLyBkZWxldGUgKGUuZy4gdi1jaGlwIGNsb3NlKVxuICAnc3VjY2Vzcyc6ICdmYSBmYS1jaGVjay1jaXJjbGUnLFxuICAnaW5mbyc6ICdmYSBmYS1pbmZvLWNpcmNsZScsXG4gICd3YXJuaW5nJzogJ2ZhIGZhLWV4Y2xhbWF0aW9uJyxcbiAgJ2Vycm9yJzogJ2ZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlJyxcbiAgJ3ByZXYnOiAnZmEgZmEtY2hldnJvbi1sZWZ0JyxcbiAgJ25leHQnOiAnZmEgZmEtY2hldnJvbi1yaWdodCcsXG4gICdjaGVja2JveE9uJzogJ2ZhIGZhLWNoZWNrLXNxdWFyZScsXG4gICdjaGVja2JveE9mZic6ICdmYSBmYS1zcXVhcmUtbycsIC8vIG5vdGUgJ2ZhcidcbiAgJ2NoZWNrYm94SW5kZXRlcm1pbmF0ZSc6ICdmYSBmYS1taW51cy1zcXVhcmUnLFxuICAnZGVsaW1pdGVyJzogJ2ZhIGZhLWNpcmNsZScsIC8vIGZvciBjYXJvdXNlbFxuICAnc29ydCc6ICdmYSBmYS1zb3J0LXVwJyxcbiAgJ2V4cGFuZCc6ICdmYSBmYS1jaGV2cm9uLWRvd24nLFxuICAnbWVudSc6ICdmYSBmYS1iYXJzJyxcbiAgJ3N1Ymdyb3VwJzogJ2ZhIGZhLWNhcmV0LWRvd24nLFxuICAnZHJvcGRvd24nOiAnZmEgZmEtY2FyZXQtZG93bicsXG4gICdyYWRpb09uJzogJ2ZhIGZhLWRvdC1jaXJjbGUnLFxuICAncmFkaW9PZmYnOiAnZmEgZmEtY2lyY2xlLW8nLFxuICAnZWRpdCc6ICdmYSBmYS1wZW5jaWwnLFxuICAncmF0aW5nRW1wdHknOiAnZmEgZmEtc3Rhci1vJyxcbiAgJ3JhdGluZ0Z1bGwnOiAnZmEgZmEtc3RhcicsXG4gICdyYXRpbmdIYWxmJzogJ2ZhIGZhLXN0YXItaGFsZi1vJ1xufVxuXG4vLyBNYXBzIGludGVybmFsIFZ1ZXRpZnkgaWNvbiBuYW1lcyB0byBhY3R1YWwgRm9udC1Bd2Vzb21lIDUrIGljb24gbmFtZXMuXG5jb25zdCBJQ09OU19GT05UQVdFU09NRSA9IHtcbiAgJ2NvbXBsZXRlJzogJ2ZhcyBmYS1jaGVjaycsXG4gICdjYW5jZWwnOiAnZmFzIGZhLXRpbWVzLWNpcmNsZScsXG4gICdjbG9zZSc6ICdmYXMgZmEtdGltZXMnLFxuICAnZGVsZXRlJzogJ2ZhcyBmYS10aW1lcy1jaXJjbGUnLCAvLyBkZWxldGUgKGUuZy4gdi1jaGlwIGNsb3NlKVxuICAnY2xlYXInOiAnZmFzIGZhLXRpbWVzLWNpcmNsZScsIC8vIGRlbGV0ZSAoZS5nLiB2LWNoaXAgY2xvc2UpXG4gICdzdWNjZXNzJzogJ2ZhcyBmYS1jaGVjay1jaXJjbGUnLFxuICAnaW5mbyc6ICdmYXMgZmEtaW5mby1jaXJjbGUnLFxuICAnd2FybmluZyc6ICdmYXMgZmEtZXhjbGFtYXRpb24nLFxuICAnZXJyb3InOiAnZmFzIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlJyxcbiAgJ3ByZXYnOiAnZmFzIGZhLWNoZXZyb24tbGVmdCcsXG4gICduZXh0JzogJ2ZhcyBmYS1jaGV2cm9uLXJpZ2h0JyxcbiAgJ2NoZWNrYm94T24nOiAnZmFzIGZhLWNoZWNrLXNxdWFyZScsXG4gICdjaGVja2JveE9mZic6ICdmYXIgZmEtc3F1YXJlJywgLy8gbm90ZSAnZmFyJ1xuICAnY2hlY2tib3hJbmRldGVybWluYXRlJzogJ2ZhcyBmYS1taW51cy1zcXVhcmUnLFxuICAnZGVsaW1pdGVyJzogJ2ZhcyBmYS1jaXJjbGUnLCAvLyBmb3IgY2Fyb3VzZWxcbiAgJ3NvcnQnOiAnZmFzIGZhLXNvcnQtdXAnLFxuICAnZXhwYW5kJzogJ2ZhcyBmYS1jaGV2cm9uLWRvd24nLFxuICAnbWVudSc6ICdmYXMgZmEtYmFycycsXG4gICdzdWJncm91cCc6ICdmYXMgZmEtY2FyZXQtZG93bicsXG4gICdkcm9wZG93bic6ICdmYXMgZmEtY2FyZXQtZG93bicsXG4gICdyYWRpb09uJzogJ2ZhciBmYS1kb3QtY2lyY2xlJyxcbiAgJ3JhZGlvT2ZmJzogJ2ZhciBmYS1jaXJjbGUnLFxuICAnZWRpdCc6ICdmYXMgZmEtZWRpdCcsXG4gICdyYXRpbmdFbXB0eSc6ICdmYXIgZmEtc3RhcicsXG4gICdyYXRpbmdGdWxsJzogJ2ZhcyBmYS1zdGFyJyxcbiAgJ3JhdGluZ0hhbGYnOiAnZmFzIGZhLXN0YXItaGFsZidcbn1cblxuY29uc3QgaWNvblNldHMgPSB7XG4gIG1kOiBJQ09OU19NQVRFUklBTCxcbiAgbWRpOiBJQ09OU19NREksXG4gIGZhOiBJQ09OU19GT05UQVdFU09NRSxcbiAgZmE0OiBJQ09OU19GT05UQVdFU09NRTRcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWNvbnMgKGljb25mb250ID0gJ21kJywgaWNvbnMgPSB7fSkge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgaWNvblNldHNbaWNvbmZvbnRdIHx8IGljb25TZXRzLm1kLCBpY29ucylcbn1cbiJdfQ==