package com.example.todoapp.collection;

import com.example.todoapp.entities.Todos;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/todos")
public class todosCollection {
    private Map<Long,Todos> todosList = new HashMap<>();

    @GetMapping
    public List<Todos> getTodos(){
        return new ArrayList<>(todosList.values());
    }
    @GetMapping("/{id}")
    public Todos getSingleTodo(@PathVariable long id){
        return todosList.get(id);
    }

    @PostMapping
    public List<Todos> postTodo(@RequestBody Todos myTodos){
        todosList.put(myTodos.getId(), myTodos);
        return new ArrayList<>(todosList.values());
    }

    @DeleteMapping("/{myid}")
    public Todos deleteTodo(@PathVariable long myid){
        return todosList.remove(myid);
    }

    @PutMapping("/myid")
    public Todos updateTodo(@PathVariable long myid, @RequestBody Todos mytodo){
        return todosList.put(myid, mytodo);
    }

}
