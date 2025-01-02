'use strict';
{
    const $ = django.jQuery;

    $.fn.djangoAdminSelect2 = function() {
        $.each(this, function(i, element) {
            $(element).select2({
                ajax: {
                    data: (params) => {
                        return {
                            term: params.term,
                            page: params.page,
                            app_label: element.dataset.appLabel,
                            model_name: element.dataset.modelName,
                            field_name: element.dataset.fieldName
                        };
                    }
                }
            });
        });
        return this;
    };

    $(function () {
        // Initialize all autocomplete widgets except the one in the template
        // form used when a new formset is added.
        $("body .admin-autocomplete")
            .not("[name*=__prefix__]")
            .djangoAdminSelect2();
    });
    htmx.on("htmx:afterSettle", () => {
        $("body .admin-autocomplete").djangoAdminSelect2();
    });
    $(document).on(
        "htmx:afterSettle",
        (function () {
            $(".admin-autocomplete").djangoAdminSelect2();
            // return function (event, $newFormset) {
            //     return $newFormset
            //         .find(".admin-autocomplete")
            //         .djangoAdminSelect2();
            // };
        })(this)
    );

    document.addEventListener('formset:added', (event) => {
        $(event.target).find('.admin-autocomplete').djangoAdminSelect2();
    });
}
