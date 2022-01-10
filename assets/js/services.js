angular.module("myApp", ["LocalStorageModule", "ngResource"])
.service("ToDoService", ["localStorageService", function(l){

    this.key = "angular-toDoList"

    if (l.get(this.key)) {
      this.act = l.get(this.key)
    } else {
      this.act = []
    }

    this.add = function (newAct) {
      this.act.push(newAct)
      this.upDateLocalStorage()
    }

    this.upDateLocalStorage = function () {l.set(this.key, this.act)}

    this.getAll = function () {return this.act}

    this.removeItem = function (item) {
      this.act = this.act.filter( activity => activity != item )
      this.upDateLocalStorage()
      return this.getAll()
    }

    this.clean = function () {
      this.act = []
      this.upDateLocalStorage()
      return this.getAll()
    }


  }
])
.controller("myController1",["$scope", "ToDoService", function (s, t) {
    s.toDo = t.getAll()
    s.registro = {}

    s.addAct = function () {
      t.add(s.registro)
      s.registro = {}
    }

    s.removeAct = function (item) { s.toDo = t.removeItem(item) }

    s.clear = function () { s.toDo = t.clean() }
  }
])
.controller("myController2", ["$scope","$resource", function(s,r){
    Post = r("https://jsonplaceholder.typicode.com/posts/:id", {id:"@id"})
    s.posts = Post.query()
    s.newRes = {}
    s.deletePost = function (post){
      Post.delete({id: post.id} , function (data) {console.log(data)})
      s.posts = s.posts.filter( element => element.id != post.id )
    }
    s.savePost = () => Post.save( { data: s.newPost }, function (data) {
        console.log(data);
      }
    )
  }
])
