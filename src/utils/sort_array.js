import React from 'react';

export default function sortByKey(array, key, orderby = 'asc') {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if(orderby === 'asc') return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        else return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}
