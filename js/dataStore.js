function DataStore(){

}

DataStore.prototype.getData = function(type){
   var barFamily = ['line', 'column', 'bar'];
   var resultSet = {};
   if(barFamily.indexOf(type) !== -1){
      resultSet = this.barData();
   }
    return resultSet;
};

DataStore.prototype.barData = function() {
    var series = [
        {
            category: 'Apple',
            m1: 50
        },
        {
            category: 'Orange',
            m1: 150
        },
        {
            category: 'Avocado',
            m1: 500
        },
        {
            category: 'Strawberry',
            m1: 66
        },
        {
            category: 'Blueberry',
            m1: 132
        },
        {
            category: 'Kiwi',
            m1: 247
        },
        {
            category: 'Grapes',
            m1: 350
        }
    ];
    return series;
};