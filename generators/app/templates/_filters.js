/**
 * Created by Shivali on 6/30/15.
 */
angular.module('<%=appName %>')
    .filter('searchObject', function () {
    return function (items, query) {
        if (!items)
            return false;

        var result = [];
        if (!query) {
            var obj = Object.keys(items);
            for (var i = 0, len = obj.length; i < len; i++) {
                result.push(items[obj[i]]);
            }
            return result;
        }


        function compareStr(stra, strb) {
            stra = ("" + stra).toLowerCase();
            strb = ("" + strb).toLowerCase();
            return stra.indexOf(strb) !== -1;
        }


        angular.forEach(items, function (friend) {
            var keys = Object.keys(friend);
            for (var i = 0, len = keys.length; i < len; i++) {
                if (compareStr(friend[keys[i]], query)) {
                    result.push(friend);
                    break;
                }
            }
        });

        return result;


    }
})

    .filter('orderObjectBy', function () {
    return function (items, field, reverse, groups) {
        var filtered = [];
        angular.forEach(items, function (item) {
            filtered.push(item);
        });

        var parseFieldValue = function (a, field) {

            if (a[field]) {
                if (typeof(a[field]) === "string")
                    return a[field].toUpperCase()
                else
                    return a[field]
            } else if (field && field.indexOf(".") > -1) {
                var fieldsArr = field.split(".");
                var fieldValue = a;
                for (var fieldName in fieldsArr) {

                    if (fieldValue)
                        fieldValue = fieldValue[fieldsArr[fieldName]];
                }
                return fieldValue;
            }
            else {
                return a[field];
            }

        }
        filtered.sort(function (a, b) {

            var upA = parseFieldValue(a, field);
            var upB = parseFieldValue(b, field);

//                var upB = b[field] ? (typeof(b[field]) === "string" ? b[field].toUpperCase() : b[field]) : b[field];


            if (upA > upB) return 1;
            if (upA < upB) return -1;
            return 0;
        });

        if (reverse) filtered.reverse();


        return filtered;
    };
});
