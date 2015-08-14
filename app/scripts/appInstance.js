/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var appInstance = angular.module("SudokuSolver",[]);

appInstance.controller('MainCtrl', function($scope, $rootScope, $http, $timeout, backtrackingService) {
 
    $scope.gen = {backtrackingStarted:false, solution:backtrackingService.getSolutionArray()};
    
    $scope.algSpeen = 100;
    
    $scope.getAlgSpeed = function()
    {
        return $scope.algSpeen;
    }
    
    $scope.backtrackingService = backtrackingService;
    
    backtrackingService.setAlgSpeedGetter($scope.getAlgSpeed);
 
    $scope.sudokuMatrix = [
       [ 9,-1, 6, 3,-1,-1,-1, 4,-1],
       [ 4, 7,-1,-1,-1,-1,-1,-1,-1],
       [-1, 2,-1, 6, 4,-1, 5, 1,-1],
       
       [-1,-1, 5, 7, 6,-1, 1, 9,-1],
       [ 7, 1,-1,-1,-1,-1,-1, 6, 3],
       [-1, 9, 2,-1, 3, 4, 8,-1,-1],
       
       [-1, 3, 7,-1, 1, 5,-1, 8,-1],
       [-1,-1,-1,-1,-1,-1,-1, 3, 5],
       [-1, 6,-1,-1,-1, 3, 2,-1, 1]
    ];
    
    for(var lcounter = 0; lcounter<9; lcounter++)
    {
        for(var ccounter = 0; ccounter<9; ccounter++)
        {
            $scope.sudokuMatrix[lcounter][ccounter] = -1;
        }
    }
    
    $scope.sudokuDomain = [];
    
    for(var lcounter = 0; lcounter<9; lcounter++)
    {
        var lineArray = [];
        for(var ccounter = 0; ccounter<9; ccounter++)
        {
            var colArray = [];
            
            for(var pCounter = 0; pCounter<9; pCounter++)
            {
                colArray.push(pCounter+1);
            }
            
            lineArray.push(colArray);
        }
        
        $scope.sudokuDomain.push(lineArray);
    }
    
    function removeElFromArray(arr, el)
    {
        var ind = arr.indexOf(el);
        if (ind > -1 && arr.length > 1) {
            arr.splice(ind, 1);
        }
    }
    
    $scope.eliminateOne = function(selection,l,c)
    {
        console.log(selection+ " " +l +" "+c);
        
        $scope.sudokuMatrix[l][c] = selection;
        
        var a = [];
        a.push(selection);
        $scope.sudokuDomain[l][c] = a;
        
        for(var lcounter = 0; lcounter<9; lcounter++)
        {
            removeElFromArray($scope.sudokuDomain[lcounter][c], selection);
        }
        
        for(var ccounter = 0; ccounter<9; ccounter++)
        {
            removeElFromArray($scope.sudokuDomain[l][ccounter], selection);
        }
        
        var smallL = Math.floor(l/3)*3;
        var smallC = Math.floor(c/3)*3;
        
        for(var lcounter = smallL; lcounter<smallL+3; lcounter++)
        {
            for(var ccounter = smallC; ccounter<smallC+3; ccounter++)
            {
                removeElFromArray($scope.sudokuDomain[lcounter][ccounter], selection);
            }
        }
    }
    
    $scope.onEliminateClicked = function()
    {
        console.log($scope.sudokuDomain);
    
        var d = new Date();
        var startTime = d.getTime();
        
        $scope.gen.backtrackingStarted = true;
        
        //$scope.startBack();
        
        $timeout($scope.startBack.bind(this), 1000);

        d = new Date();
        console.log((d.getTime() - startTime) + " ms");
    }
    
    $scope.startBack = function()
    {
        backtrackingService.back($scope.sudokuMatrix, $scope.sudokuDomain);
    }

    
});

appInstance.directive('sudokucell', sudokuCellDirective);

appInstance.factory("backtrackingService", backtrackingService);
