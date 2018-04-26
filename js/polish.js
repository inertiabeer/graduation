function polish(arr1, arr2) {
    let control = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    if (arr1.length == arr2.length) {
        return;
    }
    if (arr1.length < control.length) {
        equal(arr1, control);
    }
    if (arr2.length < control.length) {
        equal(arr2, control);
    }

}
function equal(aim, control) {
    for (var i = 0; i < control.length; i++) {
        if (!aim[i]) {
            aim.splice(i, 0, {
                time_range: control[i],
                count_id: 0
            });
        }

        if (aim[i].time_range == control[i]) {
            continue;
        }
        else if (aim[i].time_range > control[i]) {
            aim.splice(i, 0, {
                time_range: control[i],
                count_id: 0
            });
        }
    }
}
module.exports = polish;
//test
// var arr1=[], arr2=[{
//     count_id:1,
//     time_range:7
// }];
// polish(arr1,arr2);
// console.log(arr1,arr2);