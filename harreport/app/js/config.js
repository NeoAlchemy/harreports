require.config({
    paths: {
        angular: ['http://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min', 'lib/angular/angular']
    },
    baseUrl: 'js',
    shim: {
        'angular' : {'exports' : 'angular'}
    },
    priority: [
        "angular"
    ]
});

requirejs(["main"]);

