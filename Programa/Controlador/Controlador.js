var MensajeError='';
var NombreActivo= '';
var MailActivo= '';
var TipoDeAprendizajeActivo = '';
var CargoActivo = '';
var CarreraActivo = '';
var CampusActivo = '';
var ListasActivo = [];
var app = angular.module('Controller', ['ngRoute']);

app.controller('EliminarProfesor', function ($scope, $http, $window) {
    $scope.submit = function () {
        var data = $.param({
            mail: $scope.mail
        });
        $http.post("/api/eliminarProfesor", data)
            .success(function (respuesta) {
                //la respuesta es un string con respuesta,mail,cargo,nombre
                if (respuesta.split(",")[0] == 'OK') {
                    MensajeError = 'Se ha eliminado exitosamente al profesor de mail '+respuesta.split(",")[1];

                } else {
                    MensajeError = 'El mail no se encuentra en la base de datos';
                }
                $window.location = "#/PerfilAdministrador";

            })


    }
});
app.controller('EliminarAlumno', function ($scope, $http, $window) {
    $http.get("/api/mostrarAlumnos")
        .then(function (respuesta){
            if (respuesta.data.split("$")[0] == 'OK'){
                $scope.listas=JSON.parse(respuesta.data.split("$")[1]);
                ListasActivo=$scope.listas;
            } else{
                MensajeError = 'Hubo un error';
            }
        });
    $scope.del = function(i){
        $scope.listas.splice(i,1);
        var data = $.param({
            mail: ListasActivo[i].Mail
        });
        listasActivo=$scope.listas;
        $http.post("/api/eliminarAlumno", data)
            .success(function (respuesta) {
                //la respuesta es un string con respuesta,mail,cargo,nombre
                if (respuesta.split(",")[0] == 'OK') {
                    MensajeError = 'Se ha eliminado exitosamente al alumno de mail '+respuesta.split(",")[1];
                } else {
                    MensajeError = 'El mail no se encuentra en la base de datos';
                }
            })
    };
    $scope.submit = function () {
        var data = $.param({
            mail: $scope.mail
        });
        $http.post("/api/eliminarAlumno", data)
            .success(function (respuesta) {
                //la respuesta es un string con respuesta,mail,cargo,nombre
                if (respuesta.split(",")[0] == 'OK') {
                    MensajeError = 'Se ha eliminado exitosamente al alumno de mail '+respuesta.split(",")[1];

                } else {
                    MensajeError = 'El mail no se encuentra en la base de datos';

                }
                $window.location = "#/PerfilAdministrador";

            })


    }
});

app.controller('NuevoProfesor', function ($scope, $http, $window) {
    $scope.submit = function () {
        var data = $.param({
            nombre: $scope.nombre,
            mail: $scope.mail,
            contrasenia: $scope.contrasenia,
        });
        $http.post("/api/nuevoProfesor", data)
            .success(function (respuesta) {
                //la respuesta es un string con respuesta,mail,cargo,nombre
                if (respuesta.split(",")[0] == 'OK') {
                    MensajeError = 'Se ha registrado exitosamente al profesor '+respuesta.split(",")[3].substr(0,1).toUpperCase()+ respuesta.split(",")[3].substr(1);

                } else {
                    MensajeError = 'El mail ya está inscrito';

                }
                $window.location = "#/PerfilAdministrador";

            })


    }
});

app.controller('NuevoRegistro', function ($scope, $http, $window) {
    $scope.submit = function () {
        var data = $.param({
            nombre: $scope.nombre,
            mail: $scope.mail,
            rol: $scope.rol,
            contrasenia: $scope.contrasenia,
            carrera: $scope.carrera,
            campus: $scope.campus
        });
        $http.post("/api/registrarse", data)
            .success(function (respuesta) {
                //la respuesta es un string con respuesta,mail,cargo,nombre,rol,confirmacionMail,ConfirmacionAdm,TipoAprendizaje,campus,carrera
                if (respuesta.split(",")[0] == 'OK') {
                    $scope.MensajeError = 'Listo';
                    //$window.location.href = 'http://www.google.com';
                    MailActivo = respuesta.split(",")[1];
                    CargoActivo = respuesta.split(",")[2];
                    NombreActivo = respuesta.split(",")[3].substr(0,1).toUpperCase()+ respuesta.split(",")[3].substr(1);
                    CarreraActivo = respuesta.split(",")[9];
                    CampusActivo = respuesta.split(",")[8];
                    $window.location = "#/Test";

                } else {
                    $scope.MensajeError = 'El mail ya está inscrito';
                    $window.location = "#/Registrarse"

                }

            })


    }
});

app.controller('NuevoIniciarSesion', function ($scope, $http, $window) {
    $scope.submit = function () {
        var data = $.param({
            mail: $scope.mail,
            contrasenia: $scope.contrasenia
        });
        $http.post("/api/iniciarSesion", data)
            .success(function (respuesta) {
                if(respuesta.split(",")[0] =="OK") {
                    if (respuesta.split(",")[2] == "Profesor") {
                        MailActivo = respuesta.split(",")[1];
                        CargoActivo = respuesta.split(",")[2];
                        NombreActivo = respuesta.split(",")[3].substr(0, 1).toUpperCase() + respuesta.split(",")[3].substr(1);
                        $window.location = "#/PerfilProfesor";
                    } else if (respuesta.split(",")[2] == "Alumno") {
                        //respusta es un string de tipo: respuesta,mail,cargo,nombre,rol,confirmacionMail,ConfirmacionAdm,TipoAprendizaje,campus,carrera
                        $scope.MensajeError = 'Listo';
                        //$window.location.href = 'http://www.google.com';
                        MailActivo = respuesta.split(",")[1];
                        CargoActivo = respuesta.split(",")[2];
                        NombreActivo = respuesta.split(",")[3].substr(0, 1).toUpperCase() + respuesta.split(",")[3].substr(1);
                        CarreraActivo = respuesta.split(",")[9];
                        CampusActivo = respuesta.split(",")[8];
                        //NombreActivo = respuesta.split(" ")[2];
                        $window.location = "#/Perfil";
                    } else if (respuesta.split(",")[2] == "Administrador") {
                        MailActivo = respuesta.split(",")[1];
                        CargoActivo = respuesta.split(",")[2];
                        NombreActivo = respuesta.split(",")[3].substr(0, 1).toUpperCase() + respuesta.split(",")[3].substr(1);
                        $window.location = "#/PerfilAdministrador";
                    }
                } else {
                    $window.location = "#/IniciarSesion";
                }

            })


    }
});

app.controller('Inicio', function ($scope) {
    MensajeError='';
    NombreActivo= '';
    MailActivo= '';
    TipoDeAprendizajeActivo = '';
    CargoActivo = '';
    CarreraActivo = '';
    CampusActivo = '';
    $scope.MensajeError= MensajeError;
    $scope.NombreActivo= NombreActivo;
    $scope.MailActivo= MailActivo;
    $scope.TipoDeAprendizajeActivo = TipoDeAprendizajeActivo;
    $scope.CargoActivo = CargoActivo;
    $scope.CarreraActivo = CarreraActivo;
    $scope.CampusActivo = CampusActivo;
    $scope.message = 'Hola Desde Inicio';
});

app.controller('IniciarSesion', function ($scope) {
    $scope.message = 'Hola Desde Iniciar Sesion';
});

app.controller('Registrarse', function ($scope) {
    $scope.message = 'Hola Desde Registrarse';
});

app.controller('Test', function ($scope,$window) {
    if(CargoActivo!="Alumno"){
        $window.location = "#/Inicio";
    }
    $scope.message = 'Hola Desde Registrarse';
});

app.controller('Edicion', function ($scope,$window) {
    if(CargoActivo=="Alumno"){
        $window.location = "#/Inicio";
    }
    $scope.message = 'Hola Desde Edición';
});

app.controller('Perfil', function ($scope,$window) {
    if(CargoActivo!="Alumno"){
        $window.location = "#/Inicio";
    }
    $scope.message = 'Hola Desde Perfil';
});

app.controller('PerfilProfesor', function ($scope,$window) {
    if(CargoActivo!="Profesor"){
        $window.location = "#/Inicio";
    }
    $scope.message = 'Hola Desde Perfil Profesor';
    $scope.MensajeError= MensajeError;
    $scope.NombreActivo= NombreActivo;
    $scope.MailActivo= MailActivo;
    $scope.TipoDeAprendizajeActivo = TipoDeAprendizajeActivo;
    $scope.CargoActivo = CargoActivo;
    $scope.CarreraActivo = CarreraActivo;
    $scope.CampusActivo = CampusActivo;
});

app.controller('FIS120', function ($scope,$window) {
    if(CargoActivo!="Alumno"){
        $window.location = "#/Inicio";
    }
    $scope.message = 'Hola Desde FIS120';
});

app.controller('FIS1201', function ($scope) {
    $scope.message = 'Hola Desde FIS1201';
});


app.controller('Mail', function ($scope,$window) {
    if(CargoActivo!="Alumno"){
        $window.location = "#/Inicio";
    }
    $scope.message = 'Hola Desde Mail';
});

app.controller('PerfilAdministrador', function ($scope,$window) {
    if(CargoActivo!="Administrador"){
        $window.location = "#/Inicio";
    }
    $scope.MensajeError= MensajeError;
    $scope.NombreActivo= NombreActivo;
    $scope.MailActivo= MailActivo;
    $scope.TipoDeAprendizajeActivo = TipoDeAprendizajeActivo;
    $scope.CargoActivo = CargoActivo;
    $scope.CarreraActivo = CarreraActivo;
    $scope.CampusActivo = CampusActivo;
    $scope.message = 'Hola Desde Admin';
});

app.controller('Datos', function ($scope) {
    $scope.Inicio = 'ScrapBooks';
    $scope.IniciarSesion = ' Iniciar Sesión ';
    $scope.Registrarse = ' Registrarse ';
    $scope.Mail = 'Mail Sansano';
    $scope.Rol = 'Rol (Sin Guión)';
    $scope.Contraseña = 'Contraseña';
    $scope.MensajeError= MensajeError;
    $scope.NombreActivo= NombreActivo;
    $scope.MailActivo= MailActivo;
    $scope.TipoDeAprendizajeActivo = TipoDeAprendizajeActivo;
    $scope.CargoActivo = CargoActivo;
    $scope.CarreraActivo = CarreraActivo;
    $scope.CampusActivo = CampusActivo;

});

app.controller('InlineEditorController', function ($scope) {

        // $scope is a special object that makes
        // its properties available to the view as
        // variables. Here we set some default values:

        $scope.showtooltip = false;
        //$scope.value = document.getElementById('asd').textContent;

        // Some helper functions that will be
        // available in the angular declarations

        $scope.hideTooltip = function () {

            // When a model is changed, the view will be automatically
            // updated by by AngularJS. In this case it will hide the tooltip.

            $scope.showtooltip = false;
        };

        $scope.toggleTooltip = function (e) {
            e.stopPropagation();
            $scope.showtooltip = !$scope.showtooltip;
        }
    }
);

app.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: '../Vista/Paginas/Inicio.html',
            controller: 'Inicio'
        })

        .when('/IniciarSesion', {
            templateUrl: '../Vista/Paginas/IniciarSesion.html',
            controller: 'IniciarSesion'
        })

        .when('/Registrarse', {
            templateUrl: '../Vista/Paginas/Registrarse.html',
            controller: 'Registrarse'
        })

        .when('/Test', {
            templateUrl: '../Vista/Paginas/Test.html',
            controller: 'Test'
        })
        .when('/Perfil', {
            templateUrl: '../Vista/Paginas/Perfil.html',
            controller: 'Perfil'
        })
        .when('/Edicion', {
            templateUrl: '../Vista/Paginas/Edicion.html',
            controller: 'Edicion'
        })
        .when('/FIS120', {
            templateUrl: '../Vista/Paginas/FIS120.html',
            controller: 'FIS120'
        })

        .when('/FIS1201', {
            templateUrl: '../Vista/Paginas/FIS1201.html',
            controller: 'FIS1201'
        })

        .when('/PerfilProfesor', {
            templateUrl: '../Vista/Paginas/PerfilProfesor.html',
            controller: 'PerfilProfesor'
        })

        .when('/Mail', {
            templateUrl: '../Vista/Paginas/Mail.html',
            controller: 'Mail'
        })

        .when('/PerfilAdministrador', {
            templateUrl: '../Vista/Paginas/PerfilAdmin.html',
            controller: 'PerfilAdministrador'
        })
        .when('/AgregarProfesor', {
            templateUrl: '../Vista/Paginas/AgregarProfesor.html',
            controller: 'PerfilAdministrador'
        })
        .when('/EliminarAlumno', {
            templateUrl: '../Vista/Paginas/EliminarAlumno.html',
            controller: 'PerfilAdministrador'
        })
        .when('/EliminarProfesor', {
            templateUrl: '../Vista/Paginas/EliminarProfesor.html',
            controller: 'PerfilAdministrador'
        })
        .otherwise({redirectTo: '/'});
});

