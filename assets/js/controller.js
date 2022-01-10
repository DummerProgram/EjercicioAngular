angular.module("myApp", ["ToDoService"]).controller("myController",["$scope", "ToDoService", function (s, t) {
    s.toDo = t.getAll()
    s.newAct = {}

    s.addAct = function () {
      t.add(s.newAct)
      s.newAct = {}
    }

    s.removeAct = function (item) { s.toDo = t.removeItem(item) }

    s.clear = function () { s.toDo = t.clean() }
  }
])
