var sudokuCellDirective = function() {
  return {
    restrict: 'E',
    templateUrl: 'myCell.html',
    scope:
    {
        posibilities: "=",
        gen: "=",
        line: "=",
        col: "=",
        eliminate: "&"
    },
    controller:function($scope)
    {
        $scope.selectedP = -1;
        $scope.SelectedValueChanged = function()
        { 
            for(var i=0; i<$scope.pClass.length; i++)
            {
                $scope.pClass[i] = "";
            }
            
            $scope.pClass[$scope.selectedP-1] = "posibility-disabled";
            $scope.eliminate({selection:$scope.selectedP});
        };
        $scope.pClass = ["","","","","","","","",""];
    }

  };
}